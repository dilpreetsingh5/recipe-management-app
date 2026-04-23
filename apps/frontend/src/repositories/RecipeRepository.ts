import type { Recipe } from '../../../../shared/types/Recipe';
import { authFetch } from '../lib/clerkAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const getRecipeErrorMessage = async (
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

export class RecipeRepository {
  static async getAll(): Promise<Recipe[]> {
    const response = await authFetch(`${API_URL}/recipes`);

    if (!response.ok) {
      throw new Error(await getRecipeErrorMessage(response, 'Failed to fetch recipes'));
    }

    return (await response.json()) as Recipe[];
  }

  static async getById(id: number): Promise<Recipe | null> {
    const response = await authFetch(`${API_URL}/recipes/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(await getRecipeErrorMessage(response, 'Failed to fetch recipe'));
    }

    return (await response.json()) as Recipe;
  }

  static async search(searchTerm: string): Promise<Recipe[]> {
    const response = await authFetch(
      `${API_URL}/recipes/search?q=${encodeURIComponent(searchTerm)}`
    );

    if (!response.ok) {
      throw new Error(await getRecipeErrorMessage(response, 'Failed to search recipes'));
    }

    return (await response.json()) as Recipe[];
  }

  static async create(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    const response = await authFetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error(await getRecipeErrorMessage(response, 'Failed to create recipe'));
    }

    return (await response.json()) as Recipe;
  }

  static async update(id: number, data: Partial<Recipe>): Promise<Recipe> {
    const response = await authFetch(`${API_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(await getRecipeErrorMessage(response, 'Failed to update recipe'));
    }

    return (await response.json()) as Recipe;
  }

  static async delete(id: number): Promise<void> {
    const response = await authFetch(`${API_URL}/recipes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(await getRecipeErrorMessage(response, 'Failed to delete recipe'));
    }
  }
}

