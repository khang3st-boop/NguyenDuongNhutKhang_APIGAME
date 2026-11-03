using Microsoft.Data.SqlClient;
using Npgsql;

namespace NguyenDuongNhutKhang_APIGAME.Data;

public static class DatabaseErrors
{
    public static bool IsUniqueViolation(Exception error) => error.GetBaseException() is
        SqlException { Number: 2601 or 2627 } or PostgresException { SqlState: PostgresErrorCodes.UniqueViolation };
}
