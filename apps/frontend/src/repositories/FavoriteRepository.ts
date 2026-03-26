import type { Favorite } from '../../../../shared/types/Favorite';
import { favoritesData } from "../data/FavoritesData";

export class FavoriteRepository {
  private static favorites: Favorite[] = favoritesData;

  // Get all favorites //
  static async getAll(): Promise<Favorite[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.favorites), 100);
    });
  }

  // Add recipe to favorites//
  static async add(recipeId: number): Promise<Favorite> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (this.favorites.some(f => f.recipeId === recipeId)) {
          reject(new Error("Recipe already favorited"));
          return;
        }

        const newFavorite: Favorite = {
          id: Date.now(),
          recipeId,
          addedAt: new Date().toISOString()
        };

        this.favorites.push(newFavorite);
        resolve(newFavorite);

      }, 100);
    });
  }

  // Remove recipe from favorites //
  static async remove(recipeId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        const index = this.favorites.findIndex(f => f.recipeId === recipeId);

        if (index === -1) {
          reject(new Error("Favorite not found"));
          return;
        }

        this.favorites.splice(index, 1);
        resolve();

      }, 100);
    });
  }

  // Check if recipe is favorite //
  static async isFavorite(recipeId: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.favorites.some(f => f.recipeId === recipeId));
      }, 50);
    });
  }
}
