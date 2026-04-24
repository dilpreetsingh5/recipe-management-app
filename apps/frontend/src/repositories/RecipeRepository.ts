import type { Recipe } from '../../../../shared/types/Recipe';
import { apiClient, getApiErrorMessage } from "../lib/apiClient";

export class RecipeRepository {
  static async getAll(): Promise<Recipe[]> {
    try {
      const response = await apiClient.get<Recipe[]>("/recipes");
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to fetch recipes"));
    }
  }

  static async getById(id: number): Promise<Recipe | null> {
    try {
      const response = await apiClient.get<Recipe>(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      if (typeof error === "object" && error && "response" in error) {
        const status = (error as { response?: { status?: number } }).response?.status;
        if (status === 404) return null;
      }

      throw new Error(getApiErrorMessage(error, "Failed to fetch recipe"));
    }
  }

  static async search(searchTerm: string): Promise<Recipe[]> {
    try {
      const response = await apiClient.get<Recipe[]>("/recipes/search", {
        params: { q: searchTerm },
      });
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to search recipes"));
    }
  }

  static async create(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    try {
      const response = await apiClient.post<Recipe>("/recipes", recipe);
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to create recipe"));
    }
  }

  static async update(id: number, data: Partial<Recipe>): Promise<Recipe> {
    try {
      const response = await apiClient.put<Recipe>(`/recipes/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to update recipe"));
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`/recipes/${id}`);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to delete recipe"));
    }
  }
}
