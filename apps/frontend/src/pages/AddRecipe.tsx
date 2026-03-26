import RecipeForm from "../components/recipe-form/RecipeForm";
import UserRecipeCard from "../components/UserRecipeCard/UserRecipeCard";
import { useUserRecipes } from "../hooks/useUserRecipe";

export default function AddRecipe() {
  const { recipes, isLoading, error, addRecipe, deleteRecipe } = useUserRecipes();

  return (
    <div>
      <RecipeForm onAddRecipe={addRecipe} />

      <h2>Your Added Recipes</h2>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      {isLoading ? <p>Loading...</p> : null}

      {recipes.map(recipe => (
        <UserRecipeCard key={recipe.id} recipe={recipe} onRemove={deleteRecipe} />
      ))}
    </div>
  );
}
