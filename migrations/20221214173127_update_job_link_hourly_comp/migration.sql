/*
  Warnings:

  - You are about to drop the column `salary` on the `Job` table. All the data in the column will be lost.
  - Added the required column `compensation` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourly` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "hourly" BOOLEAN NOT NULL,
    "compensation" TEXT NOT NULL,
    "equity" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "benefits" BOOLEAN NOT NULL,
    "mvp" BOOLEAN NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("benefits", "companyId", "description", "equity", "id", "jobType", "location", "mvp", "title") SELECT "benefits", "companyId", "description", "equity", "id", "jobType", "location", "mvp", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
