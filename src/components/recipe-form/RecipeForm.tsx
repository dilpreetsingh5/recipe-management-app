import './RecipeForm.css';
import type { UserRecipe } from '../../types/UserRecipe';

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
      ingredients: (data.ingredients as string).split('\n'),
      instructions: (data.instructions as string).split('\n'),
    };

    await onAddRecipe(newRecipe); 

    (event.target as HTMLFormElement).reset();
  };

  return (
    <section className="recipe-form">
      <h2 className="form-title">Share Your Recipe</h2>
      <p className="form-description">Add your delicious recipe to our community collection</p>

      <form onSubmit={handleSubmit} className="recipe-form-container">

        <div className="form-group">
          <label className="form-label">Recipe Title *</label>
          <input type="text" name="title" className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Cuisine Type *</label>
          <select name="cuisineType" className="form-select" required>
            <option value="">Select a cuisine type</option>
            {cuisineTypes.map((cuisine) => (
              <option key={cuisine.id} value={cuisine.name}>
                {cuisine.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Difficulty Level *</label>
          <select name="difficulty" className="form-select" required>
            <option value="">Select difficulty</option>
            {difficultyLevels.map((level) => (
              <option key={level.id} value={level.level}>
                {level.level}
              </option>
            ))}
          </select>
        </div>

         <div className="form-row">
          <input
            type="number"
            name="prepTime"
            placeholder="Prep Time"
            className="form-input"
            required
          />
          <input
            type="number"
            name="cookTime"
            placeholder="Cook Time"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            name="servings"
            placeholder="Servings"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="ingredients"
            rows={5}
            placeholder="Ingredients (one per line)"
            className="form-textarea"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="instructions"
            rows={6}
            placeholder="Instructions (one per line)"
            className="form-textarea"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Recipe
        </button>
      </form>
    </section>
  );
}
