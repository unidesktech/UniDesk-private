/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,school_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Article" (
    "article_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "points" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "FaqCategory" (
    "faq_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "desc" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "FaqCategory_pkey" PRIMARY KEY ("faq_id")
);

-- CreateTable
CREATE TABLE "FaqTopic" (
    "topic_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "FaqTopic_pkey" PRIMARY KEY ("topic_id")
);

-- CreateTable
CREATE TABLE "student_profiles" (
    "student_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "admission_no" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "blood_group" TEXT,
    "emergencyContactNo" TEXT,
    "class_id" TEXT,
    "section_id" TEXT,
    "comments" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "parent_profiles" (
    "parent_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "occupation" TEXT,
    "relation_to_student" TEXT,
    "annual_income" DECIMAL(12,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "parent_profiles_pkey" PRIMARY KEY ("parent_id")
);

-- CreateTable
CREATE TABLE "student_parent_map" (
    "student_parent_map_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "parent_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "student_parent_map_pkey" PRIMARY KEY ("student_parent_map_id")
);

-- CreateTable
CREATE TABLE "teacher_profiles" (
    "teacher_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "employee_code" TEXT,
    "qualification" TEXT,
    "joining_date" TIMESTAMP(3),
    "experience_in_years" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" UUID,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,

    CONSTRAINT "teacher_profiles_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "classes" (
    "class_id" UUID NOT NULL,
    "school_id" UUID NOT NULL,
    "year_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" UUID,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "sections" (
    "section_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" UUID,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("section_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FaqCategory_faq_id_key" ON "FaqCategory"("faq_id");

-- CreateIndex
CREATE UNIQUE INDEX "FaqTopic_topic_id_key" ON "FaqTopic"("topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_user_id_key" ON "student_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "parent_profiles_user_id_key" ON "parent_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_parent_map_student_id_parent_id_key" ON "student_parent_map"("student_id", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_profiles_user_id_key" ON "teacher_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_school_id_key" ON "users"("email", "school_id");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "FaqCategory"("faq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "FaqTopic"("topic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_profiles" ADD CONSTRAINT "parent_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_parent_map" ADD CONSTRAINT "student_parent_map_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student_profiles"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_parent_map" ADD CONSTRAINT "student_parent_map_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "parent_profiles"("parent_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_profiles" ADD CONSTRAINT "teacher_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;
