import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import RecipeForm from "../components/recipe-form/RecipeForm";
import UserRecipeCard from "../components/UserRecipeCard/UserRecipeCard";
import { useUserRecipes } from "../hooks/useUserRecipe";

export default function AddRecipe() {
  const { isSignedIn } = useUser();
  const { recipes, isLoading, error, addRecipe, deleteRecipe } = useUserRecipes(
    Boolean(isSignedIn)
  );

  return (
    <div>
      <SignedOut>
        <h2>Add a Recipe</h2>
        <p>Please sign in to add and manage your own recipes.</p>
        <SignInButton mode="modal">
          <button>Sign in</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <RecipeForm onAddRecipe={addRecipe} />

        <h2>Your Added Recipes</h2>

        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
        {isLoading ? <p>Loading...</p> : null}

        {recipes.map((recipe) => (
          <UserRecipeCard
            key={recipe.id}
            recipe={recipe}
            onRemove={deleteRecipe}
          />
        ))}
      </SignedIn>
    </div>
  );
}
