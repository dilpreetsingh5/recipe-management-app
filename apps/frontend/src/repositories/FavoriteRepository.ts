import axios from 'axios';
import type { Favorite } from '../../../../shared/types/Favorite';
 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const hasMessageResponse = (
  error: unknown
): error is { response?: { data?: { message?: string } } } => {
  return typeof error === 'object' && error !== null && 'response' in error;
};

const getFavoriteErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (hasMessageResponse(error)) {
    const apiMessage = error.response?.data;

    if (
      apiMessage &&
      typeof apiMessage === 'object' &&
      'message' in apiMessage &&
      typeof apiMessage.message === 'string'
    ) {
      return apiMessage.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
};
 
export class FavoriteRepository {
  static async getAll(): Promise<Favorite[]> {
    try {
      const response = await axios.get<Favorite[]>(`${API_URL}/favorites`);
      return response.data;
    } catch (error: unknown) {
      const message = getFavoriteErrorMessage(error, 'Failed to fetch favorites');
      console.error(message, error);
      throw new Error(message);
    }
  }
 
  static async add(recipeId: number): Promise<Favorite> {
    try {
      const response = await axios.post<Favorite>(`${API_URL}/favorites`, { recipeId });
      return response.data;
    } catch (error: unknown) {
      const message = getFavoriteErrorMessage(error, 'Failed to add favorite');
      console.error(message, error);
      throw new Error(message);
    }
  }
 
  static async remove(recipeId: number): Promise<void> {
    try {
      const favorite = await this.getByRecipeId(recipeId);
      if (!favorite) {
        throw new Error('Favorite not found');
      }
      await axios.delete(`${API_URL}/favorites/${favorite.id}`);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Favorite not found') {
        throw error;
      }
      const message = getFavoriteErrorMessage(error, 'Failed to remove favorite');
      console.error(message, error);
      throw new Error(message);
    }
  }
 
  static async isFavorite(recipeId: number): Promise<boolean> {
    try {
      const favorite = await this.getByRecipeId(recipeId);
      return favorite !== undefined;
    } catch (error: unknown) {
      const message = getFavoriteErrorMessage(error, 'Failed to check favorite status');
      console.error(message, error);
      throw new Error(message);
    }
  }

  private static async getByRecipeId(recipeId: number): Promise<Favorite | undefined> {
    const favorites = await this.getAll();
    return favorites.find((favorite) => favorite.recipeId === recipeId);
  }
}
