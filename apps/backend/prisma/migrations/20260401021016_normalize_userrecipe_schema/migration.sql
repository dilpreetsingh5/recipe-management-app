-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "cuisineType" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "calories" INTEGER,
    "protein" INTEGER,
    "carbs" INTEGER,
    "fat" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRecipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cuisineType" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" SERIAL NOT NULL,
    "userRecipeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeInstruction" (
    "id" SERIAL NOT NULL,
    "userRecipeId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RecipeInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Recipe_cuisineType_idx" ON "Recipe"("cuisineType");

-- CreateIndex
CREATE INDEX "Recipe_difficulty_idx" ON "Recipe"("difficulty");

-- CreateIndex
CREATE INDEX "Favorite_recipeId_idx" ON "Favorite"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_recipeId_key" ON "Favorite"("recipeId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_userRecipeId_fkey" FOREIGN KEY ("userRecipeId") REFERENCES "UserRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeInstruction" ADD CONSTRAINT "RecipeInstruction_userRecipeId_fkey" FOREIGN KEY ("userRecipeId") REFERENCES "UserRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
