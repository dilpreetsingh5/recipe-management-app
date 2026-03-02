import type { Recipe } from "../types/Recipe";
import { recipesData } from "../data/recipesData";

export class RecipeRepository {
  private static recipes: Recipe[] = [...recipesData];

  // Get all recipes
  static async getAll(): Promise<Recipe[]> {
    return Promise.resolve(this.recipes);
  }

  // Get recipe by ID
  static async getById(id: number): Promise<Recipe | null> {
    const recipe = this.recipes.find((r) => r.id === id);
    return Promise.resolve(recipe || null);
  }

  // Create recipe
  static async create(recipe: Recipe): Promise<Recipe> {
    this.recipes.push(recipe);
    return Promise.resolve(recipe);
  }

  // Update recipe
  static async update(id: number, updatedData: Partial<Recipe>): Promise<Recipe | null> {
    const index = this.recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return Promise.resolve(null);
    }

    this.recipes[index] = {
      ...this.recipes[index],
      ...updatedData,
    };

    return Promise.resolve(this.recipes[index]);
  }

  // Delete recipe
  static async delete(id: number): Promise<boolean> {
    const index = this.recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return Promise.resolve(false);
    }

    this.recipes.splice(index, 1);
    return Promise.resolve(true);
  }
}