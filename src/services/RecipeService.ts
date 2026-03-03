/**
 * Recipe Service
 * Handles business logic for recipe operations
 */

import { RecipeRepository } from '../repositories/RecipeRepository';
import type { Recipe } from '../types/Recipe';

export class RecipeService {
  /**
   * Get all recipes
   */
  static async getAllRecipes(): Promise<Recipe[]> {
    const recipes = await RecipeRepository.getAll();
    return recipes;
  }

  /**
   * Search recipes by title or cuisine
   */
  static async searchRecipes(searchTerm: string): Promise<Recipe[]> {
    const allRecipes = await RecipeRepository.getAll();
    return allRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisineType.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  }

  /**
   * Filter recipes by cuisine type
   */
  static async filterByCuisine(cuisineType: string): Promise<Recipe[]> {
    const allRecipes = await RecipeRepository.getAll();
    return allRecipes.filter(recipe => recipe.cuisineType === cuisineType);
  }

  /**
   * Filter recipes by difficulty
   */
  static async filterByDifficulty(difficulty: string): Promise<Recipe[]> {
    const allRecipes = await RecipeRepository.getAll();
    return allRecipes.filter(recipe => recipe.difficulty === difficulty);
  }

  /**
   * Calculate total cooking time (prep + cook)
   */
  static calculateTotalTime(recipe: Recipe): number {
    return recipe.prepTime + recipe.cookTime;
  }

  /**
   * Format cooking time for display
   */
  static formatCookingTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  }

  /**
   * Get recipe by ID
   */
  static async getRecipeById(id: number): Promise<Recipe | null> {
    return await RecipeRepository.getById(id);
  }

  /**
   * Validate recipe data before submission
   */
  static validateRecipe(recipe: Partial<Recipe>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!recipe.title || recipe.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters');
    }

    if (!recipe.cuisineType) {
      errors.push('Cuisine type is required');
    }

    if (!recipe.difficulty) {
      errors.push('Difficulty level is required');
    }

    if (!recipe.prepTime || recipe.prepTime < 0) {
      errors.push('Prep time must be 0 or greater');
    }

    if (!recipe.cookTime || recipe.cookTime < 0) {
      errors.push('Cook time must be 0 or greater');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}