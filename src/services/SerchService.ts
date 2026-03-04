/**
 * Search Service
 * Handles searching and filtering logic.
 */

import type { Recipe } from "../types/Recipe";

export class SearchService {

  /**
   * Search recipes by text
   */
  static search(recipes: Recipe[], searchTerm: string): Recipe[] {
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Filter by difficulty
   */
  static filterByDifficulty(recipes: Recipe[], difficulty: string): Recipe[] {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
  }

  /**
   * Filter by cuisine
   */
  static filterByCuisine(recipes: Recipe[], cuisine: string): Recipe[] {
    return recipes.filter(recipe => recipe.cuisineType === cuisine);
  }
}