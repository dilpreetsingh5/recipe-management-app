import { FavoriteRepository } from "../repositories/FavoriteRepository";

export class FavoriteService {

  static async getAllFavorites() {
    return await FavoriteRepository.getAll();
  }

  static async addToFavorites(recipeId: number) {
    return await FavoriteRepository.add(recipeId);
  }

  static async removeFromFavorites(recipeId: number) {
    return await FavoriteRepository.remove(recipeId);
  }

  static async toggleFavorite(recipeId: number) {
    const isFav = await FavoriteRepository.isFavorite(recipeId);

    if (isFav) {
      await FavoriteRepository.remove(recipeId);
      return false;
    } else {
      await FavoriteRepository.add(recipeId);
      return true;
    }
  }
}