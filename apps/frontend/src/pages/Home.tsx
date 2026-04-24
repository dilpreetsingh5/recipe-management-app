import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import RecipeCard from "../components/recipe-card/RecipeCard";
import RecipeSearchForm from "../components/recipe-search-form/RecipeSearchForm";
import "./Pages.css";
import type { Recipe } from "../../../../shared/types/Recipe";
import type { UserRecipe } from "../../../../shared/types/UserRecipe";
import { useRecipes } from "../hooks/useRecipe";
import { useFavorites } from "../hooks/useFavorites";
import { useUserRecipes } from "../hooks/useUserRecipe";

const mapUserRecipeToRecipe = (recipe: UserRecipe): Recipe => ({
  id: recipe.id,
  title: recipe.title,
  image: recipe.image,
  cuisineType: recipe.cuisineType,
  prepTime: recipe.prepTime,
  cookTime: recipe.cookTime,
  difficulty: recipe.difficulty,
  servings: recipe.servings,
  ingredients: recipe.ingredients,
  instructions: recipe.instructions,
});

export default function Home() {
  const { isSignedIn } = useUser();
  const { recipes, loading, error } = useRecipes();
  const {
    favorites,
    loading: favoritesLoading,
    error: favoritesError,
    toggleFavorite,
  } = useFavorites(Boolean(isSignedIn));
  const { recipes: userRecipes } = useUserRecipes(Boolean(isSignedIn));
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const isFavorite = (recipeId: number) => {
    return favorites.some((favorite) => favorite.recipeId === recipeId);
  };

  const mappedUserRecipes = userRecipes.map(mapUserRecipeToRecipe);

  if (loading) {
    return (
      <div className="home-page">
        <header className="page-header">
          <h1>Browse Recipes</h1>
        </header>
        <p>Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <header className="page-header">
          <h1>Browse Recipes</h1>
        </header>
        <p style={{ color: "crimson" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Browse Recipes</h1>
        <p>Discover amazing recipes from around the world</p>
        <p className="favorite-count">Favorites: {favorites.length}</p>
        {favoritesError && (
          <p style={{ color: "crimson" }}>Favorites error: {favoritesError}</p>
        )}
        {favoritesLoading && Boolean(isSignedIn) && (
          <p>Loading favorites...</p>
        )}
      </header>

      {mappedUserRecipes.length > 0 && (
        <>
          <header className="page-header">
            <h2>Your Recipes</h2>
            <p>Your added recipes are shown here too.</p>
          </header>

          <div className="recipe-grid">
            {mappedUserRecipes.map((recipe) => (
              <RecipeCard
                key={`user-${recipe.id}`}
                recipe={recipe}
                onToggleFavorite={toggleFavorite}
                isFavorite={false}
                canFavorite={false}
              />
            ))}
          </div>
        </>
      )}

      <RecipeSearchForm
        recipes={recipes}
        setFilteredRecipes={setFilteredRecipes}
      />

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
}
