import type { UserRecipe } from "../types/UserRecipe";
import { userRecipesData } from "../data/userRecipesData";

let recipes: UserRecipe[] = [...userRecipesData];

export class UserRecipeRepository {
  static getAll(): Promise<UserRecipe[]> {
    return Promise.resolve(recipes.map(r => ({ ...r, ingredients: [...r.ingredients], instructions: [...r.instructions] })));
  }

  static getById(id: number): Promise<UserRecipe | undefined> {
    const recipe = recipes.find(r => r.id === id);
    return Promise.resolve(
      recipe ? { ...recipe, ingredients: [...recipe.ingredients], instructions: [...recipe.instructions] } : undefined
    );
  }

  static create(recipe: UserRecipe): Promise<UserRecipe> {
    const toStore: UserRecipe = { ...recipe, ingredients: [...recipe.ingredients], instructions: [...recipe.instructions] };
    recipes.push(toStore);
    return Promise.resolve({ ...toStore, ingredients: [...toStore.ingredients], instructions: [...toStore.instructions] });
  }

  static update(updatedRecipe: UserRecipe): Promise<UserRecipe> {
    const toStore: UserRecipe = { ...updatedRecipe, ingredients: [...updatedRecipe.ingredients], instructions: [...updatedRecipe.instructions] };
    recipes = recipes.map(r => (r.id === toStore.id ? toStore : r));
    return Promise.resolve({ ...toStore, ingredients: [...toStore.ingredients], instructions: [...toStore.instructions] });
  }

  static delete(id: number): Promise<void> {
    recipes = recipes.filter(r => r.id !== id);
    return Promise.resolve();
  }
}