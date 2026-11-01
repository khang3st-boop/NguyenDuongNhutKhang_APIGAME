using System.Collections.Concurrent;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Theo dõi trong bộ nhớ: kết nối SignalR đang mở và lần gọi API gần nhất của mỗi người.
/// Dùng để tính ONLINE / <c>connected</c>. Chạy 1 instance; nhiều instance cần backplane (Redis) — xem README.
/// </summary>
public class PresenceTracker(TimeProvider clock)
{
    public static readonly TimeSpan OnlineWindow = TimeSpan.FromMinutes(2);

    private readonly ConcurrentDictionary<Guid, int> _connections = new();
    private readonly ConcurrentDictionary<Guid, DateTime> _lastSeen = new();
    private readonly ConcurrentDictionary<Guid, Queue<DateTime>> _chat = new();

    public void Connected(Guid user)
    {
        _connections.AddOrUpdate(user, 1, (_, n) => n + 1);
        Touch(user);
    }

    public void Disconnected(Guid user)
    {
        _connections.AddOrUpdate(user, 0, (_, n) => Math.Max(0, n - 1));
        Touch(user);
    }

    public void Touch(Guid user) => _lastSeen[user] = clock.GetUtcNow().UtcDateTime;

    /// <summary>Đang mở kết nối realtime.</summary>
    public bool IsConnected(Guid user) => _connections.TryGetValue(user, out var n) && n > 0;

    /// <summary>Có kết nối realtime hoặc vừa gọi API trong 2 phút.</summary>
    public bool IsOnline(Guid user) =>
        IsConnected(user) || (_lastSeen.TryGetValue(user, out var t) && clock.GetUtcNow().UtcDateTime - t < OnlineWindow);

    /// <summary>Giới hạn chat: tối đa <paramref name="max"/> tin trong <paramref name="window"/> mỗi người.</summary>
    public bool TryChat(Guid user, int max, TimeSpan window)
    {
        var now = clock.GetUtcNow().UtcDateTime;
        var q = _chat.GetOrAdd(user, _ => new Queue<DateTime>());
        lock (q)
        {
            while (q.Count > 0 && now - q.Peek() >= window) q.Dequeue();
            if (q.Count >= max) return false;
            q.Enqueue(now);
            return true;
        }
    }
}
