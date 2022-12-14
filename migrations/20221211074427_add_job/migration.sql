-- CreateTable
CREATE TABLE "Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "equity" TEXT NOT NULL,
    "benefits" BOOLEAN NOT NULL,
    "mvp" BOOLEAN NOT NULL,
    "location" BOOLEAN NOT NULL,
    "jobType" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
