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
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("benefits", "companyId", "compensation", "contract", "description", "duration", "equity", "id", "link", "location", "mvp", "title") SELECT "benefits", "companyId", "compensation", "contract", "description", "duration", "equity", "id", "link", "location", "mvp", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
