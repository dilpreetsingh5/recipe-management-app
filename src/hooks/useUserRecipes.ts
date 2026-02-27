import { useCallback, useEffect, useMemo, useState } from "react";
import type { UserRecipe } from "../types/UserRecipe";
import { UserRecipeService } from "../services/UserRecipeService";

export function useUserRecipes() {
  const [recipes, setRecipes] = useState<UserRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const all = await UserRecipeService.getAllRecipes();
      setRecipes(all);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load recipes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addRecipe = useCallback(async (recipe: Omit<UserRecipe, "id">) => {
    setError(null);
    const created = await UserRecipeService.addRecipe(recipe);
    setRecipes(prev => [created, ...prev]);
    return created;
  }, []);

  const deleteRecipe = useCallback(async (id: number) => {
    setError(null);
    await UserRecipeService.deleteRecipe(id);
    setRecipes(prev => prev.filter(r => r.id !== id));
  }, []);

  return useMemo(
    () => ({ recipes, isLoading, error, refresh, addRecipe, deleteRecipe }),
    [recipes, isLoading, error, refresh, addRecipe, deleteRecipe]
  );
}