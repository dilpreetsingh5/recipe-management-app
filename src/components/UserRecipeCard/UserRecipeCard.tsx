import type { Recipe } from '../../types/Recipe';
import '../UserRecipeCard/UseRecipeCard.css';

interface Props {
  recipe: Recipe;
  onRemove: (id: number) => void;
}

export default function UserRecipeCard({ recipe, onRemove }: Props) {
  return (
    <div className="user-recipe-card">
      <button
        className="remove-button"
        onClick={() => onRemove(recipe.id)}
      >
        Remove
      </button>

      <h2>{recipe.title}</h2>
      <p><strong>Cuisine:</strong> {recipe.cuisineType}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Prep:</strong> {recipe.prepTime} mins</p>
      <p><strong>Cook:</strong> {recipe.cookTime} mins</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>

      <div>
        <strong>Ingredients:</strong>
        <ul>
          {recipe.ingredients?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Instructions:</strong>
        <ol>
          {recipe.instructions?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
