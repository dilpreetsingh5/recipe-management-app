import { useState } from 'react';
import SortForm from '../components/Sort-form/sort-form';
import './Pages.css';
import type { Recipe } from '../types/Recipe';
 
interface FavoritesProps {
  favoriteRecipes: Recipe[];
  removeFromFavorites: (recipeId: number) => void;
}
 
export default function Favorites({
  favoriteRecipes,
  removeFromFavorites
}: FavoritesProps) {
  const [sortedRecipes, setSortedRecipes] = useState(favoriteRecipes);
 
  if (favoriteRecipes.length === 0) {
    return (
      <div className="favorites-page">
        <header className="page-header">
          <h1>My Favorite Recipes</h1>
        </header>
        <div className="empty-state">
          <p>😔 No favorite recipes yet!</p>
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
 
      <SortForm
        recipes={favoriteRecipes}
        setSortedRecipes={setSortedRecipes}
      />
 
      <div className="favorites-list">
        {sortedRecipes.map((recipe) => (
          <article key={recipe.id} className="favorite-item">
            <img src={recipe.image} alt={recipe.title} />
            <div className="favorite-content">
              <h3>{recipe.title}</h3>
              <p className="cuisine">{recipe.cuisineType}</p>
              <p className="difficulty">Difficulty: {recipe.difficulty}</p>
              <button
                onClick={() => removeFromFavorites(recipe.id)}
                className="btn-remove"
              >
                ❌ Remove from Favorites
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}