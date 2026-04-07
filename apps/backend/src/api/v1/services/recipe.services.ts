import { prisma } from "../../../lib/prisma.js";

export interface CreateRecipeInput {
  title: string;
  image?: string;
  cuisineType: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface UpdateRecipeInput {
  title?: string;
  image?: string;
  cuisineType?: string;
  difficulty?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients?: string[];
  instructions?: string[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export const getAllRecipes = async () => {
  return prisma.recipe.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRecipeById = async (id: number) => {
  return prisma.recipe.findUnique({
    where: { id },
  });
};

export const searchRecipes = async (searchTerm: string) => {
  return prisma.recipe.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { cuisineType: { contains: searchTerm, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createRecipe = async (data: CreateRecipeInput) => {
  return prisma.recipe.create({
    data,
  });
};

export const updateRecipe = async (id: number, data: UpdateRecipeInput) => {
  return prisma.recipe.update({
    where: { id },
    data,
  });
};

export const deleteRecipe = async (id: number) => {
  return prisma.recipe.delete({
    where: { id },
  });
};
