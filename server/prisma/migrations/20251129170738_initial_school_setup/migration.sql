-- CreateTable
CREATE TABLE "school_initial_setup" (
    "setup_id" UUID NOT NULL,
    "school_id" UUID NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "steps_completed" JSONB,
    "setup_version" INTEGER NOT NULL DEFAULT 1,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "school_initial_setup_pkey" PRIMARY KEY ("setup_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "school_initial_setup_school_id_key" ON "school_initial_setup"("school_id");

-- AddForeignKey
ALTER TABLE "school_initial_setup" ADD CONSTRAINT "school_initial_setup_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "schools"("school_id") ON DELETE CASCADE ON UPDATE CASCADE;
