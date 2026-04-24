import type { Favorite } from '../../../../shared/types/Favorite';
import { apiClient, getApiErrorMessage } from "../lib/apiClient";
 
export class FavoriteRepository {
  static async getAll(): Promise<Favorite[]> {
    try {
      const response = await apiClient.get<Favorite[]>("/favorites");
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to fetch favorites"));
    }
  }
 
  static async add(recipeId: number): Promise<Favorite> {
    try {
      const response = await apiClient.post<Favorite>("/favorites", { recipeId });
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to add favorite"));
    }
  }
 
  static async remove(recipeId: number): Promise<void> {
    const favorite = await this.getByRecipeId(recipeId);

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    try {
      await apiClient.delete(`/favorites/${favorite.id}`);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to remove favorite"));
    }
  }
 
  static async isFavorite(recipeId: number): Promise<boolean> {
    const favorite = await this.getByRecipeId(recipeId);
    return favorite !== undefined;
  }

  private static async getByRecipeId(recipeId: number): Promise<Favorite | undefined> {
    const favorites = await this.getAll();
    return favorites.find((favorite) => favorite.recipeId === recipeId);
  }
}
