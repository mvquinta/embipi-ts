/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "Percentile" (
    "id" SERIAL NOT NULL,
    "gender" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Percentile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Children" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "userBabyName" TEXT NOT NULL,
    "userBabyAge" TEXT NOT NULL,
    "userBabyGender" TEXT NOT NULL,
    "userBabyMonths" INTEGER NOT NULL,
    "userBabyHeight" INTEGER NOT NULL,
    "userBabyWeight" INTEGER NOT NULL,
    "userBabyHead" INTEGER NOT NULL,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milestones" (
    "id" SERIAL NOT NULL,
    "childrenId" INTEGER NOT NULL,
    "milestones" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tips" JSONB NOT NULL,

    CONSTRAINT "Milestones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Children_authorId_key" ON "Children"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Milestones_childrenId_key" ON "Milestones"("childrenId");

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestones" ADD CONSTRAINT "Milestones_childrenId_fkey" FOREIGN KEY ("childrenId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
