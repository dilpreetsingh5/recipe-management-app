import './RecipeForm.css';
import type { UserRecipe } from '../../types/UserRecipe';
import React from 'react';

interface RecipeFormProps {
  onAddRecipe: (recipe: Omit<UserRecipe, 'id'>) => Promise<UserRecipe>;
}

interface CuisineType {
  id: number;
  name: string;
}

interface DifficultyLevel {
  id: number;
  level: "Easy" | "Medium" | "Hard";
}

export default function RecipeForm({ onAddRecipe }: RecipeFormProps) {

  const cuisineTypes: CuisineType[] = [
    { id: 1, name: "Italian" },
    { id: 2, name: "Indian" },
    { id: 3, name: "Chinese" },
    { id: 4, name: "Mexican" },
    { id: 5, name: "American" },
    { id: 6, name: "French" },
    { id: 7, name: "Japanese" },
    { id: 8, name: "Thai" },
    { id: 9, name: "Mediterranean" },
    { id: 10, name: "Korean" }
  ];

  const difficultyLevels: DifficultyLevel[] = [
    { id: 1, level: "Easy" },
    { id: 2, level: "Medium" },
    { id: 3, level: "Hard" }
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const newRecipe: Omit<UserRecipe, 'id'> = {
      title: data.title as string,
      cuisineType: data.cuisineType as string,
      difficulty: data.difficulty as "Easy" | "Medium" | "Hard",
      prepTime: Number(data.prepTime),
      cookTime: Number(data.cookTime),
      servings: Number(data.servings),
      ingredients: (data.ingredients as string).split('\n').filter(Boolean),
      instructions: (data.instructions as string).split('\n').filter(Boolean),
    };

    await onAddRecipe(newRecipe);

    (event.target as HTMLFormElement).reset();
  };

  return (
    <section className="recipe-form">
      <h2 className="form-title">Share Your Recipe</h2>
      <p className="form-description">
        Add your delicious recipe to our community collection
      </p>

      <form onSubmit={handleSubmit} className="recipe-form-container">

        {/* Recipe Title */}
        <div className="form-group">
          <label htmlFor="recipeTitle" className="form-label">
            Recipe Title *
          </label>
          <input
            type="text"
            id="recipeTitle"
            name="title"
            className="form-input"
            placeholder="e.g., Classic Spaghetti Carbonara"
            required
          />
        </div>

        {/* Cuisine Type */}
        <div className="form-group">
          <label htmlFor="cuisineType" className="form-label">
            Cuisine Type *
          </label>
          <select
            id="cuisineType"
            name="cuisineType"
            className="form-select"
            required
          >
            <option value="">Select a cuisine type</option>
            {cuisineTypes.map((cuisine) => (
              <option key={cuisine.id} value={cuisine.name}>
                {cuisine.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level */}
        <div className="form-group">
          <label htmlFor="difficulty" className="form-label">
            Difficulty Level *
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="form-select"
            required
          >
            <option value="">Select difficulty</option>
            {difficultyLevels.map((level) => (
              <option key={level.id} value={level.level}>
                {level.level}
              </option>
            ))}
          </select>
        </div>

        {/* Prep & Cook Time */}
        <div className="form-row">

          <div className="form-group">
            <label htmlFor="prepTime" className="form-label">
              Prep Time (minutes) *
            </label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              className="form-input"
              min="0"
              placeholder="15"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookTime" className="form-label">
              Cook Time (minutes) *
            </label>
            <input
              type="number"
              id="cookTime"
              name="cookTime"
              className="form-input"
              min="0"
              placeholder="30"
              required
            />
          </div>

        </div>

        {/* Servings */}
        <div className="form-group">
          <label htmlFor="servings" className="form-label">
            Number of Servings *
          </label>
          <input
            type="number"
            id="servings"
            name="servings"
            className="form-input"
            min="1"
            placeholder="4"
            required
          />
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <label htmlFor="ingredients" className="form-label">
            Ingredients *
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-textarea"
            rows={5}
            placeholder="Enter each ingredient on a new line:
• 400g spaghetti
• 200g pancetta
• 4 large eggs
• 100g Pecorino Romano cheese"
            required
          />
        </div>

        {/* Instructions */}
        <div className="form-group">
          <label htmlFor="instructions" className="form-label">
            Instructions *
          </label>
          <textarea
            id="instructions"
            name="instructions"
            className="form-textarea"
            rows={6}
            placeholder="Enter step-by-step instructions:
1. Bring salted water to boil and cook spaghetti
2. While pasta cooks, dice pancetta and cook until crispy
3. In a bowl, whisk together eggs and grated cheese"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          🍳 Submit Recipe
        </button>

      </form>
    </section>
  );
}