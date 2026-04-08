import { useEffect, useState } from "react";
import type { Favorite } from "../../../../shared/types/Favorite";
import { FavoriteService } from "../services/FavoriteService";

export function useFavorites() {

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadFavorites();
  }, []);

  const loadFavorites = async () => {
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
  };

  const toggleFavorite = async (recipeId: number) => {
    setError(null);

    try {
      await FavoriteService.toggleFavorite(recipeId);
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
