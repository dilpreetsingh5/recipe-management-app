/**
 * Recipe Repository
 * Handles data access for recipes.
 * No business logic here.
 */

import type { Recipe } from "../types/Recipe";

const STORAGE_KEY = "recipes";

export class RecipeRepository {

  /**
   * Get all recipes
   */
  static async getAll(): Promise<Recipe[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Get recipe by ID
   */
  static async getById(id: number): Promise<Recipe | null> {
    const recipes = await this.getAll();
    return recipes.find(recipe => recipe.id === id) || null;
  }

  /**
   * Save all recipes
   */
  static async saveAll(recipes: Recipe[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }

  /**
   * Add new recipe
   */
  static async add(recipe: Recipe): Promise<void> {
    const recipes = await this.getAll();
    recipes.push(recipe);
    await this.saveAll(recipes);
  }

  /**
   * Delete recipe
   */
  static async delete(id: number): Promise<void> {
    const recipes = await this.getAll();
    const updated = recipes.filter(recipe => recipe.id !== id);
    await this.saveAll(updated);
  }
}