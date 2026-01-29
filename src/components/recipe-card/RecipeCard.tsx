import './RecipeCard.css';
import { recipes } from '../../data/Recipe';
import type {Recipe} from '../../types/Recipe';

export default function RecipeCard() {
  return (
    <section className="recipe-card">
      <h2>Featured Recipes</h2>
      <p className="recipe-card-subtitle">Discover delicious recipes from around the world</p>
      <div className="recipe-card-grid">
        {recipes.map((recipe: Recipe) => (
          <article key={recipe.id} className="recipe-card-item">
            <div className="recipe-card-image-container">
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="recipe-card-image"
              />
              <span className="recipe-card-difficulty">{recipe.difficulty}</span>
            </div>
            <div className="recipe-card-content">
              <h3 className="recipe-card-title">{recipe.title}</h3>
              <p className="recipe-card-cuisine">{recipe.cuisineType}</p>
              <div className="recipe-card-meta">
                <span className="recipe-card-meta-item">
                  <span className="recipe-card-icon">⏱️</span>
                  {recipe.prepTime + recipe.cookTime} min
                </span>
                <span className="recipe-card-meta-item">
                  <span className="recipe-card-icon">🍽️</span>
                  {recipe.servings} servings
                </span>
              </div>
              <button className="recipe-card-button">Add to Favorites</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
