using System.Collections.Concurrent;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Vị trí gần đúng của người chơi đang bật "Người chơi gần đây". Chỉ giữ trong bộ nhớ (một instance),
/// tự hết hạn sau <see cref="Ttl"/>; không ghi toạ độ xuống DB và không trả toạ độ cho ai.
/// </summary>
public sealed class NearbyStore
{
    public static readonly TimeSpan Ttl = TimeSpan.FromMinutes(10);
    public ConcurrentDictionary<Guid, (double Lat, double Lon, DateTime At)> Spots { get; } = new();
}

public class NearbyService(NearbyStore store, AppDbContext db, TimeProvider clock)
{
    public void Update(Guid me, double lat, double lon)
    {
        if (!double.IsFinite(lat) || !double.IsFinite(lon) || lat is < -90 or > 90 || lon is < -180 or > 180)
            throw AppException.BadRequest("Toạ độ không hợp lệ.", "INVALID_COORDINATES");
        store.Spots[me] = (lat, lon, clock.GetUtcNow().UtcDateTime);
    }

    public void Clear(Guid me) => store.Spots.TryRemove(me, out _);

    public async Task<List<NearbyPlayerDto>> PlayersAsync(Guid me, int radiusKm)
    {
        if (radiusKm is < 1 or > 100) throw AppException.BadRequest("radiusKm phải từ 1 đến 100.", "INVALID_RADIUS");
        if (!store.Spots.TryGetValue(me, out var mine))
            throw AppException.Conflict("Hãy bật chia sẻ vị trí trước khi xem người chơi gần đây.", "NO_LOCATION");

        var now = clock.GetUtcNow().UtcDateTime;
        foreach (var (id, s) in store.Spots)
            if (now - s.At > NearbyStore.Ttl) store.Spots.TryRemove(id, out _);

        var hits = store.Spots
            .Where(kv => kv.Key != me)
            .Select(kv => (Id: kv.Key, kv.Value.At, Km: DistanceKm(mine.Lat, mine.Lon, kv.Value.Lat, kv.Value.Lon)))
            .Where(x => x.Km <= radiusKm)
            .ToList();
        if (hits.Count == 0) return [];

        var ids = hits.Select(x => x.Id).ToList();
        var blocked = await db.UserBlocks
            .Where(b => (b.BlockerId == me && ids.Contains(b.BlockedId)) || (b.BlockedId == me && ids.Contains(b.BlockerId)))
            .Select(b => b.BlockerId == me ? b.BlockedId : b.BlockerId).ToListAsync();
        var profiles = await db.UserProfiles.AsNoTracking()
            .Where(p => ids.Contains(p.UserId)).ToDictionaryAsync(p => p.UserId);

        return hits
            .Where(x => !blocked.Contains(x.Id) && profiles.ContainsKey(x.Id))
            .OrderBy(x => x.Km)
            .Take(50)
            .Select(x => new NearbyPlayerDto(x.Id, profiles[x.Id].DisplayName, profiles[x.Id].AvatarColor, Label(x.Km), x.At))
            .ToList();
    }

    /// <summary>Nhãn làm tròn thô để không lộ vị trí chính xác.</summary>
    public static string Label(double km) => km switch
    {
        < 1 => "< 1 km",
        < 3 => "1–3 km",
        < 5 => "3–5 km",
        < 10 => "5–10 km",
        < 25 => "10–25 km",
        _ => "> 25 km",
    };

    public static double DistanceKm(double lat1, double lon1, double lat2, double lon2)
    {
        const double r = 6371.0;
        static double Rad(double d) => d * Math.PI / 180;
        var dLat = Rad(lat2 - lat1);
        var dLon = Rad(lon2 - lon1);
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(Rad(lat1)) * Math.Cos(Rad(lat2)) * Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        return 2 * r * Math.Asin(Math.Min(1, Math.Sqrt(a)));
    }
}
