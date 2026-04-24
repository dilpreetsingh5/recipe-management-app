import type { UserRecipe } from "../../../../shared/types/UserRecipe";
import { apiClient, getApiErrorMessage } from "../lib/apiClient";

const API_BASE_URL = "/user-recipes";

type BackendUserRecipe = {
  id: number;
  title: string;
  cuisineType: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  createdAt: string;
  updatedAt: string;
  ingredients: { id: number; userRecipeId: number; name: string }[];
  instructions: {
    id: number;
    userRecipeId: number;
    stepNumber: number;
    description: string;
  }[];
};

const mapBackendRecipeToUserRecipe = (
  recipe: BackendUserRecipe
): UserRecipe => ({
  id: recipe.id,
  title: recipe.title,
  cuisineType: recipe.cuisineType,
  difficulty: recipe.difficulty as "Easy" | "Medium" | "Hard",
  prepTime: recipe.prepTime,
  cookTime: recipe.cookTime,
  servings: recipe.servings,
  ingredients: recipe.ingredients.map((ingredient) => ingredient.name),
  instructions: recipe.instructions
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .map((instruction) => instruction.description),
});

export class UserRecipeRepository {
  static async getAll(): Promise<UserRecipe[]> {
    try {
      const response = await apiClient.get<BackendUserRecipe[]>(API_BASE_URL);
      return response.data.map(mapBackendRecipeToUserRecipe);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Request failed"));
    }
  }

  static async getById(id: number): Promise<UserRecipe | undefined> {
    try {
      const response = await apiClient.get<BackendUserRecipe>(
        `${API_BASE_URL}/${id}`
      );
      return mapBackendRecipeToUserRecipe(response.data);
    } catch (error) {
      if (typeof error === "object" && error && "response" in error) {
        const status = (error as { response?: { status?: number } }).response?.status;
        if (status === 404) return undefined;
      }

      throw new Error(getApiErrorMessage(error, "Request failed"));
    }
  }

  static async create(recipe: UserRecipe): Promise<UserRecipe> {
    try {
      const response = await apiClient.post<BackendUserRecipe>(API_BASE_URL, {
        title: recipe.title,
        cuisineType: recipe.cuisineType,
        difficulty: recipe.difficulty,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      });

      return mapBackendRecipeToUserRecipe(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Request failed"));
    }
  }

  static async update(updatedRecipe: UserRecipe): Promise<UserRecipe> {
    try {
      const response = await apiClient.put<BackendUserRecipe>(
        `${API_BASE_URL}/${updatedRecipe.id}`,
        {
          title: updatedRecipe.title,
          cuisineType: updatedRecipe.cuisineType,
          difficulty: updatedRecipe.difficulty,
          prepTime: updatedRecipe.prepTime,
          cookTime: updatedRecipe.cookTime,
          servings: updatedRecipe.servings,
          ingredients: updatedRecipe.ingredients,
          instructions: updatedRecipe.instructions,
        }
      );

      return mapBackendRecipeToUserRecipe(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Request failed"));
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Failed to delete recipe"));
    }
  }
}
