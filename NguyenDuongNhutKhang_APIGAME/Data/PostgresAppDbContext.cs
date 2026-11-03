using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Data;

/// <summary>Cùng model nghiệp vụ, bộ migration/snapshot PostgreSQL riêng; không chạy migration SQL Server.</summary>
public sealed class PostgresAppDbContext(DbContextOptions<PostgresAppDbContext> options) : AppDbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // PostgreSQL dùng xmin (xid) thay SQL Server rowversion/byte[]. Token vẫn do database tăng tự động.
        builder.Entity<MatchRoom>().Ignore(m => m.RowVersion);
        builder.Entity<MatchRoom>().Property<uint>("Version").IsRowVersion();
    }
}
