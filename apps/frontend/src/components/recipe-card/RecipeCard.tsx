import './RecipeCard.css';
import type {Recipe} from '../../../../../shared/types/Recipe';

interface RecipeCardProps {
    recipe: Recipe;
    onAddToFavorites: (recipe: Recipe) => void;
    isFavorite: boolean;
}

export default function RecipeCard({ recipe, onAddToFavorites, isFavorite }: RecipeCardProps) {
  return (
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
                <button
                    onClick={() => onAddToFavorites(recipe)}
                    disabled={isFavorite}
                    className={isFavorite ? 'recipe-card-button favorited' : 'recipe-card-button'}
                >
                    {isFavorite ? ' Favorited' : ' Add to Favorites'}
                </button>
            </div>
      </article>
    );
}
