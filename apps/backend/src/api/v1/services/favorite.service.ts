import { prisma } from "../../../lib/prisma.js";
 
export const getAllFavorites = async () => {
  return prisma.favorite.findMany();
};
 
export const addFavorite = async (recipeId: number, userId: number) => {
  return prisma.favorite.create({
    data: { recipeId, userId },
  });
};
 
export const removeFavorite = async (id: number) => {
  return prisma.favorite.delete({
    where: { id },
  });
};
