import type { Favorite } from '../../../../shared/types/Favorite';
import { authFetch } from '../lib/clerkAuth';
 
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const getFavoriteErrorMessage = async (
  response: Response,
  fallbackMessage: string
): Promise<string> => {
  const payload = await response.json().catch(() => null);

  if (
    payload &&
    typeof payload === 'object' &&
    'message' in payload &&
    typeof payload.message === 'string'
  ) {
    return payload.message;
  }

  return fallbackMessage;
};
 
export class FavoriteRepository {
  static async getAll(): Promise<Favorite[]> {
    const response = await authFetch(`${API_URL}/favorites`);

    if (!response.ok) {
      const message = await getFavoriteErrorMessage(response, 'Failed to fetch favorites');
      throw new Error(message);
    }

    return (await response.json()) as Favorite[];
  }
 
  static async add(recipeId: number): Promise<Favorite> {
    const response = await authFetch(`${API_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId }),
    });

    if (!response.ok) {
      const message = await getFavoriteErrorMessage(response, 'Failed to add favorite');
      throw new Error(message);
    }

    return (await response.json()) as Favorite;
  }
 
  static async remove(recipeId: number): Promise<void> {
    const favorite = await this.getByRecipeId(recipeId);

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    const response = await authFetch(`${API_URL}/favorites/${favorite.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const message = await getFavoriteErrorMessage(response, 'Failed to remove favorite');
      throw new Error(message);
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
