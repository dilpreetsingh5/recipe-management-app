import axios from 'axios';
import type { Recipe } from '../../../../shared/types/Recipe';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

export class RecipeRepository {
  static async getAll(): Promise<Recipe[]> {
    try {
      const response = await axios.get(`${API_URL}/recipes`);
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to fetch recipes:', error);
      throw new Error('Failed to fetch recipes');
    }
  }

  static async getById(id: number): Promise<Recipe | null> {
    try {
      const response = await axios.get(`${API_URL}/recipes/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch recipe');
    }
  }

  static async search(searchTerm: string): Promise<Recipe[]> {
    try {
      const response = await axios.get(`${API_URL}/recipes/search`, {
        params: { q: searchTerm }
      });
      return response.data;
    } catch (error: unknown) {
      throw new Error('Failed to search recipes');
    }
  }

  static async create(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    try {
      const response = await axios.post(`${API_URL}/recipes`, recipe);
      return response.data;
    } catch (error: unknown) {
      throw new Error('Failed to create recipe');
    }
  }

  static async update(id: number, data: Partial<Recipe>): Promise<Recipe> {
    try {
      const response = await axios.put(`${API_URL}/recipes/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      throw new Error('Failed to update recipe');
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/recipes/${id}`);
    } catch (error: unknown) {
      throw new Error('Failed to delete recipe');
    }
  }
}

