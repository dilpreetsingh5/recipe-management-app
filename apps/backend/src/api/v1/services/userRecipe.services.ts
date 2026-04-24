import { prisma } from "../../../lib/prisma.js";

export interface CreateUserRecipeInput {
  title: string;
  cuisineType: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
}

export interface UpdateUserRecipeInput {
  title?: string;
  cuisineType?: string;
  difficulty?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients?: string[];
  instructions?: string[];
}

const userRecipeInclude = {
  ingredients: true,
  instructions: true,
} as const;

export const getAllUserRecipes = async (userId: number) => {
  return prisma.userRecipe.findMany({
    where: { userId },
    include: userRecipeInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserRecipeById = async (id: number, userId: number) => {
  return prisma.userRecipe.findFirst({
    where: { id, userId },
    include: userRecipeInclude,
  });
};

export const createUserRecipe = async (
  userId: number,
  data: CreateUserRecipeInput
) => {
  return prisma.userRecipe.create({
    data: {
      userId,
      title: data.title,
      cuisineType: data.cuisineType,
      difficulty: data.difficulty,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      servings: data.servings,
      ingredients: {
        create: data.ingredients.map((ingredient) => ({
          name: ingredient,
        })),
      },
      instructions: {
        create: data.instructions.map((instruction, index) => ({
          stepNumber: index + 1,
          description: instruction,
        })),
      },
    },
    include: userRecipeInclude,
  });
};

export const updateUserRecipe = async (
  id: number,
  userId: number,
  data: UpdateUserRecipeInput
) => {
  await prisma.userRecipe.updateMany({
    where: { id, userId },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.cuisineType !== undefined && { cuisineType: data.cuisineType }),
      ...(data.difficulty !== undefined && { difficulty: data.difficulty }),
      ...(data.prepTime !== undefined && { prepTime: data.prepTime }),
      ...(data.cookTime !== undefined && { cookTime: data.cookTime }),
      ...(data.servings !== undefined && { servings: data.servings }),
    },
  });

  if (data.ingredients !== undefined) {
    await prisma.recipeIngredient.deleteMany({
      where: {
        userRecipeId: id,
        userRecipe: { userId },
      },
    });

    await prisma.recipeIngredient.createMany({
      data: data.ingredients.map((ingredient) => ({
        userRecipeId: id,
        name: ingredient,
      })),
    });
  }

  if (data.instructions !== undefined) {
    await prisma.recipeInstruction.deleteMany({
      where: {
        userRecipeId: id,
        userRecipe: { userId },
      },
    });

    await prisma.recipeInstruction.createMany({
      data: data.instructions.map((instruction, index) => ({
        userRecipeId: id,
        stepNumber: index + 1,
        description: instruction,
      })),
    });
  }

  return prisma.userRecipe.findFirstOrThrow({
    where: { id, userId },
    include: userRecipeInclude,
  });
};

export const deleteUserRecipe = async (id: number, userId: number) => {
  return prisma.userRecipe.deleteMany({
    where: { id, userId },
  });
};
