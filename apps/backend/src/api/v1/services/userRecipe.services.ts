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

export const getAllUserRecipes = async () => {
  return prisma.userRecipe.findMany({
    include: {
      ingredients: true,
      instructions: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserRecipeById = async (id: number) => {
  return prisma.userRecipe.findUnique({
    where: { id },
    include: {
      ingredients: true,
      instructions: true,
    },
  });
};

export const createUserRecipe = async (data: CreateUserRecipeInput) => {
  return prisma.userRecipe.create({
    data: {
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
    include: {
      ingredients: true,
      instructions: true,
    },
  });
};

export const updateUserRecipe = async (
  id: number,
  data: UpdateUserRecipeInput
) => {
  return prisma.userRecipe.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.cuisineType !== undefined && { cuisineType: data.cuisineType }),
      ...(data.difficulty !== undefined && { difficulty: data.difficulty }),
      ...(data.prepTime !== undefined && { prepTime: data.prepTime }),
      ...(data.cookTime !== undefined && { cookTime: data.cookTime }),
      ...(data.servings !== undefined && { servings: data.servings }),

      ...(data.ingredients !== undefined && {
        ingredients: {
          deleteMany: {},
          create: data.ingredients.map((ingredient) => ({
            name: ingredient,
          })),
        },
      }),

      ...(data.instructions !== undefined && {
        instructions: {
          deleteMany: {},
          create: data.instructions.map((instruction, index) => ({
            stepNumber: index + 1,
            description: instruction,
          })),
        },
      }),
    },
    include: {
      ingredients: true,
      instructions: true,
    },
  });
};

export const deleteUserRecipe = async (id: number) => {
  return prisma.userRecipe.delete({
    where: { id },
  });
};