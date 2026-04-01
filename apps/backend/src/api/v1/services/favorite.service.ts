import { prisma } from "../../../lib/prisma.js";
 
export const getAllFavorites = async () => {
  return prisma.favorite.findMany();
};
 
export const addFavorite = async (recipeId: number) => {
  return prisma.favorite.create({
    data: { recipeId },
  });
};
 
export const removeFavorite = async (id: number) => {
  return prisma.favorite.delete({
    where: { id },
  });
};