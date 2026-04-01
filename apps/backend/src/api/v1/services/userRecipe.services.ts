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
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserRecipeById = async (id: number) => {
  return prisma.userRecipe.findUnique({
    where: { id },
  });
};

export const createUserRecipe = async (data: CreateUserRecipeInput) => {
  return prisma.userRecipe.create({
    data,
  });
};

export const updateUserRecipe = async (
  id: number,
  data: UpdateUserRecipeInput
) => {
  return prisma.userRecipe.update({
    where: { id },
    data,
  });
};

export const deleteUserRecipe = async (id: number) => {
  return prisma.userRecipe.delete({
    where: { id },
  });
};