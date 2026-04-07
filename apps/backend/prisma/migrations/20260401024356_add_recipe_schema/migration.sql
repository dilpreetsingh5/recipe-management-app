/*
  Warnings:

  - You are about to drop the column `calories` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Recipe` table. All the data in the column will be lost.
  - Made the column `image` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Favorite_recipeId_idx";

-- DropIndex
DROP INDEX "Recipe_cuisineType_idx";

-- DropIndex
DROP INDEX "Recipe_difficulty_idx";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "ingredients",
DROP COLUMN "instructions",
DROP COLUMN "protein",
DROP COLUMN "updatedAt",
ALTER COLUMN "image" SET NOT NULL;
