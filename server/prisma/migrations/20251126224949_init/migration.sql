-- CreateTable
CREATE TABLE "schools" (
    "school_id" UUID NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "config" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("school_id")
);

-- CreateTable
CREATE TABLE "demo_requests" (
    "request_id" UUID NOT NULL,
    "school_id" UUID,
    "organization" TEXT NOT NULL,
    "organization_size" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT,
    "country" TEXT,
    "city" TEXT,
    "message" TEXT,
    "source" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "scheduled_demo_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,

    CONSTRAINT "demo_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateIndex
CREATE INDEX "demo_requests_contact_email_idx" ON "demo_requests"("contact_email");

-- CreateIndex
CREATE INDEX "demo_requests_status_idx" ON "demo_requests"("status");

-- AddForeignKey
ALTER TABLE "demo_requests" ADD CONSTRAINT "demo_requests_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE SET NULL ON UPDATE CASCADE;
