import { prisma } from "../../../lib/prisma.js";
 
export const getAllFavorites = async (userId: number) => {
  return prisma.favorite.findMany({
    where: { userId },
    orderBy: { addedAt: "desc" },
  });
};
 
export const addFavorite = async (recipeId: number, userId: number) => {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId,
      },
    },
  });

  if (existing) {
    return { favorite: existing, created: false as const };
  }

  try {
    const favorite = await prisma.favorite.create({
      data: { recipeId, userId },
    });

    return { favorite, created: true as const };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: unknown }).code === "P2002"
    ) {
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_recipeId: {
            userId,
            recipeId,
          },
        },
      });

      if (favorite) {
        return { favorite, created: false as const };
      }
    }

    throw error;
  }
};
 
export const removeFavorite = async (id: number, userId: number) => {
  const result = await prisma.favorite.deleteMany({
    where: { id, userId },
  });

  return result.count;
};
