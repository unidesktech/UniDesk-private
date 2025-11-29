/*
  Warnings:

  - A unique constraint covering the columns `[school_code]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `school_code` to the `schools` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `schools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `schools` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "established" TIMESTAMP(3),
ADD COLUMN     "school_code" TEXT NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "schools_school_code_key" ON "schools"("school_code");
