-- AlterTable
ALTER TABLE "demo_requests" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "school_subscription_status" (
    "status_id" UUID NOT NULL,
    "school_id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3),
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_subscription_status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "school_pricing_plans" (
    "plan_id" UUID NOT NULL,
    "school_id" UUID NOT NULL,
    "plan_type" TEXT NOT NULL,
    "price_per_month" DOUBLE PRECISION,
    "billing_cycle" TEXT,
    "features" JSONB,
    "custom_notes" TEXT,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_pricing_plans_pkey" PRIMARY KEY ("plan_id")
);

-- CreateIndex
CREATE INDEX "school_subscription_status_school_id_idx" ON "school_subscription_status"("school_id");

-- CreateIndex
CREATE INDEX "school_pricing_plans_school_id_idx" ON "school_pricing_plans"("school_id");

-- AddForeignKey
ALTER TABLE "school_subscription_status" ADD CONSTRAINT "school_subscription_status_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "school_pricing_plans" ADD CONSTRAINT "school_pricing_plans_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE RESTRICT ON UPDATE CASCADE;
