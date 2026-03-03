import type { Recipe } from '../types/Recipe';
import { RecipeRepository } from '../repositories/RecipeRepository';

export class RecipeService {

    /** Get all recipes */
    static async getAllRecipes(): Promise<Recipe[]> {
        return await RecipeRepository.getAll();
    }

    /** Get one recipe by its id, returns null if not found */
    static async getRecipeById(id: number): Promise<Recipe | null> {
        return await RecipeRepository.getById(id);
    }

    /** Search recipes by title or cuisine name */
    static async searchRecipes(searchTerm: string): Promise<Recipe[]> {
        const allRecipes = await RecipeRepository.getAll();
        const term = searchTerm.toLowerCase().trim();
        if (!term) return allRecipes;
        return allRecipes.filter(
            (recipe) =>
                recipe.title.toLowerCase().includes(term) ||
                recipe.cuisineType.toLowerCase().includes(term)
        );
    }

    /** Filter recipes by cuisine type */
    static async filterByCuisine(cuisineType: string): Promise<Recipe[]> {
        const allRecipes = await RecipeRepository.getAll();
        return allRecipes.filter(
            (recipe) =>
                recipe.cuisineType.toLowerCase() === cuisineType.toLowerCase()
        );
    }

    /** Filter recipes by difficulty: Easy, Medium, or Hard */
    static async filterByDifficulty(
        difficulty: 'Easy' | 'Medium' | 'Hard'
    ): Promise<Recipe[]> {
        const allRecipes = await RecipeRepository.getAll();
        return allRecipes.filter((recipe) => recipe.difficulty === difficulty);
    }

    /** Create a new recipe after validating it */
    static async createRecipe(
        recipe: Omit<Recipe, 'id' | 'createdAt'>
    ): Promise<Recipe> {
        const validation = RecipeService.validateRecipe(recipe);
        if (!validation.valid) {
            throw new Error(validation.errors.join(', '));
        }
        return await RecipeRepository.create(recipe);
    }

    /** Update an existing recipe by id */
    static async updateRecipe(id: number, data: Partial<Recipe>): Promise<Recipe> {
        return await RecipeRepository.update(id, data);
    }

    /** Delete a recipe by id */
    static async deleteRecipe(id: number): Promise<void> {
        return await RecipeRepository.delete(id);
    }

    /** Returns total cooking time (prep + cook) in minutes */
    static calculateTotalTime(recipe: Recipe): number {
        return recipe.prepTime + recipe.cookTime;
    }

    /** Formats minutes into a readable string like "1h 30min" */
    static formatCookingTime(minutes: number): string {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }

    /** Validates recipe fields, returns valid true/false and list of errors */
    static validateRecipe(
        recipe: Partial<Recipe>
    ): { valid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!recipe.title || recipe.title.trim().length < 3) {
            errors.push('Title must be at least 3 characters');
        }

        if (!recipe.cuisineType || recipe.cuisineType.trim().length === 0) {
            errors.push('Cuisine type is required');
        }

        if (!recipe.difficulty) {
            errors.push('Difficulty level is required');
        }

        if (recipe.prepTime === undefined || recipe.prepTime < 0) {
            errors.push('Prep time must be 0 or greater');
        }

        if (recipe.cookTime === undefined || recipe.cookTime < 0) {
            errors.push('Cook time must be 0 or greater');
        }

        if (!recipe.servings || recipe.servings < 1) {
            errors.push('Servings must be at least 1');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    /** Get a sorted list of all unique cuisine types */
    static async getUniqueCuisines(): Promise<string[]> {
        const allRecipes = await RecipeRepository.getAll();
        const cuisines = new Set(allRecipes.map((r) => r.cuisineType));
        return Array.from(cuisines).sort();
    }
}
