import axios from 'axios';
import type { Favorite } from '../../../../shared/types/Favorite';
 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';
 
export class FavoriteRepository {
  // Get all favorites
  static async getAll(): Promise<Favorite[]> {
    try {
      const response = await axios.get(`${API_URL}/favorites`);
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to fetch favorites:', error);
      throw new Error('Failed to fetch favorites');
    }
  }
 
  // Add recipe to favorites
  static async add(recipeId: number): Promise<Favorite> {
    try {
      const response = await axios.post(`${API_URL}/favorites`, { recipeId });
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to add favorite:', error);
      throw new Error('Failed to add favorite');
    }
  }
 
  // Remove recipe from favorites (find id first, delete by id)
  static async remove(recipeId: number): Promise<void> {
    try {
      const favorites = await this.getAll();
      const favorite = favorites.find(f => f.recipeId === recipeId);
      if (!favorite) {
        throw new Error('Favorite not found');
      }
      await axios.delete(`${API_URL}/favorites/${favorite.id}`);
    } catch (error: unknown) {
      if ((error as Error).message === 'Favorite not found') {
        throw error;
      }
      console.error('Failed to remove favorite:', error);
      throw new Error('Failed to remove favorite');
    }
  }
 
  // Check if recipe is favorite
  static async isFavorite(recipeId: number): Promise<boolean> {
    try {
      const favorites = await this.getAll();
      return favorites.some(f => f.recipeId === recipeId);
    } catch (error: unknown) {
      console.error('Failed to check favorite status:', error);
      throw new Error('Failed to check if favorite');
    }
  }
}