/*
  Warnings:

  - You are about to drop the column `userName` on the `Photos` table. All the data in the column will be lost.
  - The `userRole` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Photos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STANDARD', 'ADMIN');

-- AlterTable
ALTER TABLE "Photos" DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userRole",
ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'STANDARD';

-- AddForeignKey
ALTER TABLE "Photos" ADD CONSTRAINT "Photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
