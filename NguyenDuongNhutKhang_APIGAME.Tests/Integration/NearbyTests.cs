using System.Net;
using System.Net.Http.Json;
using NguyenDuongNhutKhang_APIGAME.Services;
using NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Integration;

[Collection(ApiCollection.Name)]
public class NearbyTests(ApiFactory api)
{
    [Fact]
    public async Task Requires_login()
    {
        Assert.Equal(HttpStatusCode.Unauthorized, (await api.CreateClient().GetAsync("/api/v1/nearby/players")).StatusCode);
    }

    [Fact]
    public async Task Invalid_coordinates_and_radius_are_rejected_and_location_is_required()
    {
        var a = await api.RegisterAsync("nb0");
        var bad = await a.Client.PutAsJsonAsync("/api/v1/nearby/presence", new { lat = 95, lon = 10 });
        Assert.Equal(HttpStatusCode.BadRequest, bad.StatusCode);

        var none = await a.Client.GetAsync("/api/v1/nearby/players");
        Assert.Equal(HttpStatusCode.Conflict, none.StatusCode);

        await a.Client.PutAsJsonAsync("/api/v1/nearby/presence", new { lat = 10.0, lon = 106.0 });
        Assert.Equal(HttpStatusCode.BadRequest, (await a.Client.GetAsync("/api/v1/nearby/players?radiusKm=500")).StatusCode);
    }

    [Fact]
    public async Task Nearby_players_are_listed_by_distance_without_coordinates_and_hidden_after_clear()
    {
        var a = await api.RegisterAsync("nb1");
        var b = await api.RegisterAsync("nb2");
        var far = await api.RegisterAsync("nb3");
        // Mỗi test dùng vùng toạ độ riêng để không lẫn với test khác trong cùng collection.
        Assert.Equal(HttpStatusCode.NoContent, (await a.Client.PutAsJsonAsync("/api/v1/nearby/presence", new { lat = 1.0000, lon = 120.0 })).StatusCode);
        await b.Client.PutAsJsonAsync("/api/v1/nearby/presence", new { lat = 1.0050, lon = 120.0 });   // ~0,6 km
        await far.Client.PutAsJsonAsync("/api/v1/nearby/presence", new { lat = 1.5, lon = 120.0 });    // ~55 km

        var list = await (await a.Client.GetAsync("/api/v1/nearby/players?radiusKm=10")).JsonAsync();
        var items = list.EnumerateArray().ToList();
        var only = Assert.Single(items);
        Assert.Equal(b.Id.ToString(), only.Str("userId"), ignoreCase: true);
        Assert.Equal("< 1 km", only.Str("distance"));
        Assert.False(only.TryGetProperty("lat", out _));
        Assert.False(only.TryGetProperty("lon", out _));

        Assert.Equal(HttpStatusCode.NoContent, (await b.Client.DeleteAsync("/api/v1/nearby/presence")).StatusCode);
        var after = await (await a.Client.GetAsync("/api/v1/nearby/players?radiusKm=10")).JsonAsync();
        Assert.Empty(after.EnumerateArray());
    }

    [Theory]
    [InlineData(0.2, "< 1 km")]
    [InlineData(2.0, "1–3 km")]
    [InlineData(7.0, "5–10 km")]
    [InlineData(40.0, "> 25 km")]
    public void Distance_labels_are_coarse(double km, string label) => Assert.Equal(label, NearbyService.Label(km));

    [Fact]
    public void Haversine_is_about_111km_per_degree_latitude() =>
        Assert.InRange(NearbyService.DistanceKm(0, 0, 1, 0), 110.5, 111.9);
}
