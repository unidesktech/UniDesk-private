-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school_branding" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school_pricing_plans" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school_settings" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "school_subscription_status" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "schools" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_onboarding_status" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_preferences" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user_roles" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;
