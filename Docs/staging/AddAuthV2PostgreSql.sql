START TRANSACTION;
DROP INDEX "EmailIndex";

CREATE TABLE "AuthChallenges" (
    "Id" uuid NOT NULL,
    "Purpose" character varying(16) NOT NULL,
    "Email" character varying(254) NOT NULL,
    "UserId" uuid,
    "CodeHash" character varying(64) NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    "ExpiresAt" timestamp with time zone NOT NULL,
    "ResendAvailableAt" timestamp with time zone NOT NULL,
    "Attempts" integer NOT NULL,
    "MaxAttempts" integer NOT NULL,
    "ConsumedAt" timestamp with time zone,
    "SupersededAt" timestamp with time zone,
    "IpHash" character varying(64) NOT NULL,
    "PendingUsername" character varying(20),
    "PendingDisplayName" character varying(30),
    "PendingPasswordHash" character varying(1024),
    "ResetTokenHash" character varying(64),
    "ResetTokenExpiresAt" timestamp with time zone,
    "ResetUsedAt" timestamp with time zone,
    CONSTRAINT "PK_AuthChallenges" PRIMARY KEY ("Id")
);

CREATE UNIQUE INDEX "UX_Users_NormalizedEmail" ON "Users" ("NormalizedEmail") WHERE "NormalizedEmail" IS NOT NULL;

CREATE INDEX "IX_AuthChallenges_Email_Purpose_CreatedAt" ON "AuthChallenges" ("Email", "Purpose", "CreatedAt");

CREATE INDEX "IX_AuthChallenges_ExpiresAt" ON "AuthChallenges" ("ExpiresAt");

CREATE INDEX "IX_AuthChallenges_IpHash_CreatedAt" ON "AuthChallenges" ("IpHash", "CreatedAt");

CREATE INDEX "IX_AuthChallenges_ResetTokenHash" ON "AuthChallenges" ("ResetTokenHash");

CREATE INDEX "IX_AuthChallenges_UserId" ON "AuthChallenges" ("UserId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20261104004713_AddAuthV2PostgreSql', '10.0.14');

COMMIT;

