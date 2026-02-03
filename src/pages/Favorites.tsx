import "./Pages.css";
import type { Recipe } from "../types/Recipe"

interface FavoriteProps {
  favoriteRecipes: Recipe[];
  removeFromFavorites: (id: number) => void;
}

export default function Favorites({
  favoriteRecipes,
  removeFromFavorites
}: FavoriteProps) {
  return (
    <div>
      <h2>My Favorite Recipes</h2>

      {favoriteRecipes.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul className="favorites-list">
  {favoriteRecipes.map(recipe => (
    <li key={recipe.id} className="favorite-item">
      <span className="recipe-title">{recipe.title}</span>
      <button
        className="remove-btn"
        onClick={() => removeFromFavorites(recipe.id)}
      >
        Remove
      </button>
    </li>
  ))}
</ul>
      )}
    </div>
  );
}