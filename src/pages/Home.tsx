import { useState } from 'react';
import RecipeCard from '../components/recipe-card/RecipeCard';
import RecipeSearchForm from '../components/recipe-search-form/RecipeSearchForm';
import "./Pages.css"
import { recipes } from '../data/Recipe';
import type { Recipe } from '../types/Recipe';

interface HomeProps {
    favoriteRecipes: Recipe[];
    addToFavorites: (recipe: Recipe) => void;
}

export default function Home({ favoriteRecipes, addToFavorites}: HomeProps) {
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

    const isFavorite = (recipeId: number) => {
        return favoriteRecipes.some(r => r.id === recipeId);
    };

    return (
        <div className="home-page">
            <header className="page-header">
                <h1>Browse Recipes</h1>
                <p>Discover amazing recipes from around the world</p>
                <p className="favorite-count">
                    ❤️ {favoriteRecipes.length} favorites
                </p>
            </header>

            <RecipeSearchForm
                recipes={recipes}
                setFilteredRecipes={setFilteredRecipes}
            />

            <div className="recipe-grid">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onAddToFavorites={addToFavorites}
                        isFavorite={isFavorite(recipe.id)}
                    />
                ))}
            </div>
        </div>
  );
}