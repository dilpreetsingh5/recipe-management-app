import './RecipeCard.css';
import type {Recipe} from '../../../../../shared/types/Recipe';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

interface RecipeCardProps {
    recipe: Recipe;
    onToggleFavorite: (recipeId: number) => void | Promise<void>;
    isFavorite: boolean;
    canFavorite?: boolean;
}

export default function RecipeCard({
  recipe,
  onToggleFavorite,
  isFavorite,
  canFavorite = true,
}: RecipeCardProps) {
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
              {canFavorite ? (
                <>
                  <SignedIn>
                    <button
                      onClick={() => onToggleFavorite(recipe.id)}
                      className={isFavorite ? 'recipe-card-button favorited' : 'recipe-card-button'}
                    >
                      {isFavorite ? ' Remove Favorite' : ' Add to Favorites'}
                    </button>
                  </SignedIn>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <button type="button" className="recipe-card-button">
                        Add to favorite
                      </button>
                    </SignInButton>
                  </SignedOut>
                </>
              ) : (
                <button type="button" className="recipe-card-button favorited" disabled>
                  Your Recipe
                </button>
              )}
            </div>
      </article>
    );
}
