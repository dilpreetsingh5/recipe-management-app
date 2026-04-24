import { useEffect, useMemo, useState } from "react";
import SortForm from "../components/Sort-form/sort-form";
import "./Pages.css";
import type { Recipe } from "../../../../shared/types/Recipe";
import { useFavorites } from "../hooks/useFavorites";
import { useRecipes } from "../hooks/useRecipe";

export default function Favorites() {
  const { favorites, loading: favoritesLoading, error, toggleFavorite } =
    useFavorites(true);
  const { recipes, loading: recipesLoading, error: recipesError } = useRecipes();

  const favoriteRecipes = useMemo(() => {
    const favoriteIds = new Set(favorites.map((favorite) => favorite.recipeId));
    return recipes.filter((recipe) => favoriteIds.has(recipe.id));
  }, [favorites, recipes]);

  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>(favoriteRecipes);

  useEffect(() => {
    setSortedRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  if (favoritesLoading || recipesLoading) {
    return (
      <div className="favorites-page">
        <header className="page-header">
          <h1>My Favorite Recipes</h1>
        </header>
        <p>Loading favorites...</p>
      </div>
    );
  }

  if (error || recipesError) {
    return (
      <div className="favorites-page">
        <header className="page-header">
          <h1>My Favorite Recipes</h1>
        </header>
        <p style={{ color: "crimson" }}>Error: {error || recipesError}</p>
      </div>
    );
  }

  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-page">
        <header className="page-header">
          <h1>My Favorite Recipes</h1>
        </header>
        <div className="empty-state">
          <p>ðŸ˜” No favorite recipes yet!</p>
          <p>Start adding recipes to your favorites from the Browse page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <header className="page-header">
        <h1>My Favorite Recipes</h1>
        <p>You have {favoriteRecipes.length} favorite recipes</p>
      </header>

      <SortForm recipes={favoriteRecipes} setSortedRecipes={setSortedRecipes} />

      <div className="favorites-list">
        {sortedRecipes.map((recipe) => (
          <article key={recipe.id} className="favorite-item">
            <img src={recipe.image} alt={recipe.title} />
            <div className="favorite-content">
              <h3>{recipe.title}</h3>
              <p className="cuisine">{recipe.cuisineType}</p>
              <p className="difficulty">Difficulty: {recipe.difficulty}</p>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="btn-remove"
              >
                Remove from Favorites
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
