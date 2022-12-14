/*
  Warnings:

  - You are about to drop the column `hourly` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobType` on the `Job` table. All the data in the column will be lost.
  - Added the required column `contract` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "contract" BOOLEAN NOT NULL,
    "compensation" TEXT NOT NULL,
    "equity" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "benefits" BOOLEAN NOT NULL,
    "mvp" BOOLEAN NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("benefits", "companyId", "compensation", "description", "equity", "id", "link", "location", "mvp", "title") SELECT "benefits", "companyId", "compensation", "description", "equity", "id", "link", "location", "mvp", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
