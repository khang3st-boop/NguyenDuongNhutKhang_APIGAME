-- Chạy TRƯỚC khi áp migration AddAuthV2PostgreSql (chỉ đọc). Kết quả mong đợi: 0 dòng ở mọi truy vấn.
-- 1) Unique index UX_Users_NormalizedEmail sẽ lỗi nếu đã có email trùng (không phân biệt hoa/thường).
SELECT "NormalizedEmail", COUNT(*) FROM "Users" WHERE "NormalizedEmail" IS NOT NULL GROUP BY "NormalizedEmail" HAVING COUNT(*) > 1;
-- 2) Bảng mới chưa được tạo sẵn.
SELECT table_name FROM information_schema.tables WHERE table_name = 'AuthChallenges';
-- 3) Lịch sử migration hiện tại (phải dừng ở 20261103185223_InitialPostgreSql).
SELECT "MigrationId" FROM "__EFMigrationsHistory" ORDER BY "MigrationId";
