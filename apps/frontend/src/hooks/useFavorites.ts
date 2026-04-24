import { useCallback, useEffect, useState } from "react";
import type { Favorite } from "../../../../shared/types/Favorite";
import { FavoriteService } from "../services/FavoriteService";

export function useFavorites(enabled: boolean) {

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const data = await FavoriteService.getAllFavorites();
      setFavorites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setFavorites([]);
      setLoading(false);
      setError(null);
      return;
    }

    void loadFavorites();
  }, [enabled, loadFavorites]);

  const toggleFavorite = async (recipeId: number) => {
    if (!enabled) {
      throw new Error("Authentication required");
    }

    setError(null);

    try {
      const isFavorite = favorites.some(
        (favorite) => favorite.recipeId === recipeId
      );

      if (isFavorite) {
        await FavoriteService.removeFromFavorites(recipeId);
      } else {
        await FavoriteService.addToFavorites(recipeId);
      }

      await loadFavorites();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update favorite");
    }
  };

  return {
    favorites,
    loading,
    error,
    toggleFavorite
  };
}
