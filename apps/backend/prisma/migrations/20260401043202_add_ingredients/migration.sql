-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" JSONB,
ADD COLUMN     "instructions" JSONB,
ALTER COLUMN "image" DROP NOT NULL;
