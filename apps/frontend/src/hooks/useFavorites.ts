import { useEffect, useState } from "react";
import type { Favorite } from "../../../../shared/types/Favorite";
import { FavoriteService } from "../services/FavoriteService";

export function useFavorites() {

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await FavoriteService.getAllFavorites();
    setFavorites(data);
    setLoading(false);
  };

  const toggleFavorite = async (recipeId: number) => {
    await FavoriteService.toggleFavorite(recipeId);
    loadFavorites();
  };

  return {
    favorites,
    loading,
    toggleFavorite
  };
}
