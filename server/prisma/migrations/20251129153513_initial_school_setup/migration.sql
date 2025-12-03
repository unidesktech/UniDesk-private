-- AlterTable
ALTER TABLE "school_pricing_plans" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "created_by" UUID,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "school_subscription_status" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "created_by" UUID,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "schools" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "unidesk_users" (
    "user_id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_by" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "unidesk_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "school_branding" (
    "branding_id" UUID NOT NULL,
    "school_id" UUID,
    "logo_url" TEXT,
    "banner_url" TEXT,
    "primary_color" TEXT,
    "secondary_color" TEXT,
    "accent_color" TEXT,
    "theme_mode" TEXT,
    "login_screen_config" JSONB,
    "header_footer_config" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "school_branding_pkey" PRIMARY KEY ("branding_id")
);

-- CreateTable
CREATE TABLE "school_settings" (
    "setting_id" UUID NOT NULL,
    "school_id" UUID,
    "category" TEXT,
    "key" TEXT,
    "value" JSONB,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "school_settings_pkey" PRIMARY KEY ("setting_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unidesk_users_email_key" ON "unidesk_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "school_branding_school_id_key" ON "school_branding"("school_id");

-- CreateIndex
CREATE UNIQUE INDEX "school_settings_school_id_category_key_key" ON "school_settings"("school_id", "category", "key");

-- AddForeignKey
ALTER TABLE "school_branding" ADD CONSTRAINT "school_branding_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_settings" ADD CONSTRAINT "school_settings_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE SET NULL ON UPDATE CASCADE;
