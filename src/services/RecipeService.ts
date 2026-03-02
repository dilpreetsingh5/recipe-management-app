import { RecipeRepository } from "../repositories/RecipeRepository";
import type { Recipe } from "../types/Recipe";

export class RecipeService {
  // Get all recipes
  static async getAllRecipes(): Promise<Recipe[]> {
    return RecipeRepository.getAll();
  }

  // Search recipes by title
  static async searchRecipes(searchText: string): Promise<Recipe[]> {
    const recipes = await RecipeRepository.getAll();

    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Create recipe
  static async createRecipe(recipe: Recipe): Promise<Recipe> {
    return RecipeRepository.create(recipe);
  }

  // Delete recipe
  static async deleteRecipe(id: number): Promise<boolean> {
    return RecipeRepository.delete(id);
  }

  // Calculate total time
  static calculateTotalTime(recipe: Recipe): number {
    return recipe.prepTime + recipe.cookTime;
  }
}