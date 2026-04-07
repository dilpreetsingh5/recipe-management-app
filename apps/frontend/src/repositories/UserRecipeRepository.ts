import type { UserRecipe } from "../../../../shared/types/UserRecipe";

const API_BASE_URL = "http://localhost:3001/api/v1/user-recipes";

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

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || "Request failed");
  }

  return response.json();
};

export class UserRecipeRepository {
  static async getAll(): Promise<UserRecipe[]> {
    const response = await fetch(API_BASE_URL);
    const data: BackendUserRecipe[] = await handleResponse(response);

    return data.map(mapBackendRecipeToUserRecipe);
  }

  static async getById(id: number): Promise<UserRecipe | undefined> {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (response.status === 404) {
      return undefined;
    }

    const data: BackendUserRecipe = await handleResponse(response);
    return mapBackendRecipeToUserRecipe(data);
  }

  static async create(recipe: UserRecipe): Promise<UserRecipe> {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: recipe.title,
        cuisineType: recipe.cuisineType,
        difficulty: recipe.difficulty,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      }),
    });

    const data: BackendUserRecipe = await handleResponse(response);
    return mapBackendRecipeToUserRecipe(data);
  }

  static async update(updatedRecipe: UserRecipe): Promise<UserRecipe> {
    const response = await fetch(`${API_BASE_URL}/${updatedRecipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedRecipe.title,
        cuisineType: updatedRecipe.cuisineType,
        difficulty: updatedRecipe.difficulty,
        prepTime: updatedRecipe.prepTime,
        cookTime: updatedRecipe.cookTime,
        servings: updatedRecipe.servings,
        ingredients: updatedRecipe.ingredients,
        instructions: updatedRecipe.instructions,
      }),
    });

    const data: BackendUserRecipe = await handleResponse(response);
    return mapBackendRecipeToUserRecipe(data);
  }

  static async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new Error(errorBody?.message || "Failed to delete recipe");
    }
  }
}