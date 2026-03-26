import type { UserRecipe } from "../../../../shared/types/UserRecipe";
import { UserRecipeRepository } from "../repositories/UserRecipeRepository";

export class UserRecipeService {
  private static createId(): number {
    return Date.now();
  }

  private static normalize(recipe: Omit<UserRecipe, "id"> & { id?: number }): UserRecipe {
    return {
      id: recipe.id ?? UserRecipeService.createId(),
      title: recipe.title.trim(),
      image: recipe.image?.trim() || undefined,
      cuisineType: recipe.cuisineType.trim(),
      prepTime: Math.max(0, Number(recipe.prepTime)),
      cookTime: Math.max(0, Number(recipe.cookTime)),
      difficulty: recipe.difficulty,
      servings: Math.max(1, Number(recipe.servings)),
      ingredients: recipe.ingredients.map(i => i.trim()).filter(Boolean),
      instructions: recipe.instructions.map(s => s.trim()).filter(Boolean),
    };
  }

  static async getAllRecipes(): Promise<UserRecipe[]> {
    return await UserRecipeRepository.getAll();
  }

  static async addRecipe(recipe: Omit<UserRecipe, "id">): Promise<UserRecipe> {
    const normalized = UserRecipeService.normalize(recipe);

    if (!normalized.title) throw new Error("Recipe title is required.");
    if (normalized.ingredients.length === 0) throw new Error("Please provide at least one ingredient.");
    if (normalized.instructions.length === 0) throw new Error("Please provide at least one instruction step.");

    return await UserRecipeRepository.create(normalized);
  }

  static async deleteRecipe(id: number): Promise<void> {
    return await UserRecipeRepository.delete(id);
  }
}
