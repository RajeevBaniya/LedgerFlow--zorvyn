ALTER TABLE "Record" ADD COLUMN IF NOT EXISTS "amount_paise" BIGINT;

UPDATE "Record"
SET "amount_paise" = (ROUND(CAST("amount" AS NUMERIC) * 100))::BIGINT
WHERE "amount_paise" IS NULL;

ALTER TABLE "Record" DROP COLUMN "amount";

ALTER TABLE "Record" RENAME COLUMN "amount_paise" TO "amount";

ALTER TABLE "Record" ALTER COLUMN "amount" SET NOT NULL;
