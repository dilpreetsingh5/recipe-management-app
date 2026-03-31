-- CreateTable
CREATE TABLE "UserRecipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "cuisineType" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_recipeId_key" ON "Favorite"("userId", "recipeId");
