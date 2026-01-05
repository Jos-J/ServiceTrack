/*
  Warnings:

  - Made the column `created_at` on table `auto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `auto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_date` on table `parts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_date` on table `parts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `log_date` on table `service_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createddate` on table `servicetype` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateddate` on table `servicetype` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_active` on table `technicians` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `registered` on table `vehicle_history` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createddate` on table `vehiclemaintenance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateddate` on table `vehiclemaintenance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "auto" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "parts" ALTER COLUMN "under_warranty" SET DEFAULT false,
ALTER COLUMN "created_date" SET NOT NULL,
ALTER COLUMN "updated_date" SET NOT NULL,
ALTER COLUMN "updated_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "service_logs" ALTER COLUMN "log_date" SET NOT NULL,
ALTER COLUMN "log_date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "servicetype" ALTER COLUMN "isactive" SET DEFAULT true,
ALTER COLUMN "createddate" SET NOT NULL,
ALTER COLUMN "updateddate" SET NOT NULL,
ALTER COLUMN "updateddate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "technicians" ALTER COLUMN "is_active" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "mechanic_rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_history" ALTER COLUMN "registered" SET NOT NULL;

-- AlterTable
ALTER TABLE "vehiclemaintenance" ALTER COLUMN "warrantystatus" SET DEFAULT false,
ALTER COLUMN "createddate" SET NOT NULL,
ALTER COLUMN "updateddate" SET NOT NULL,
ALTER COLUMN "updateddate" DROP DEFAULT,
ALTER COLUMN "isactive" SET DEFAULT true;
