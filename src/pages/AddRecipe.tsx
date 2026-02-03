import { useState } from 'react';
import RecipeForm from '../components/recipe-form/RecipeForm';
import UserRecipeCard from '../components/UserRecipeCard/UserRecipeCard';
import type { Recipe } from '../types/Recipe';

export default function AddRecipe() {
  const [addedRecipes, setAddedRecipes] = useState<Recipe[]>([]);

  const handleAddRecipe = (recipe: Recipe) => {
    setAddedRecipes(prev => [...prev, recipe]);
  };

  const handleRemoveRecipe = (id: number) => {
    setAddedRecipes(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div>
      <RecipeForm onAddRecipe={handleAddRecipe} />

      <h2>Your Added Recipes</h2>

      {addedRecipes.map(recipe => (
        <UserRecipeCard
          key={recipe.id}
          recipe={recipe}
          onRemove={handleRemoveRecipe}
        />
      ))}
    </div>
  );
}
