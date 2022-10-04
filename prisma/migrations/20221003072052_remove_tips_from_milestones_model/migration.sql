/*
  Warnings:

  - You are about to drop the column `tips` on the `Milestones` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Milestones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Milestones" DROP COLUMN "tips",
DROP COLUMN "updatedAt";
