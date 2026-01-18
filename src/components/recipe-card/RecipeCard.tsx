import './RecipeCard.css';

interface Recipe {
  id: number;
  title: string;
  image: string;
  cuisineType: string;
  prepTime: number;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
}

export default function RecipeCard() {
  const recipes: Recipe[] = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      image: "https://images.pexels.com/photos/4518833/pexels-photo-4518833.jpeg",
      cuisineType: "Italian",
      prepTime: 10,
      cookTime: 20,
      difficulty: "Medium",
      servings: 4
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      image: "https://images.pexels.com/photos/34159109/pexels-photo-34159109.jpeg",
      cuisineType: "Indian",
      prepTime: 20,
      cookTime: 30,
      difficulty: "Medium",
      servings: 6
    },
    {
      id: 3,
      title: "Caesar Salad",
      image: "https://images.pexels.com/photos/9624297/pexels-photo-9624297.jpeg",
      cuisineType: "American",
      prepTime: 15,
      cookTime: 0,
      difficulty: "Easy",
      servings: 4
    },
    {
      id: 4,
      title: "Beef Tacos",
      image: "https://images.pexels.com/photos/33614199/pexels-photo-33614199.jpeg",
      cuisineType: "Mexican",
      prepTime: 15,
      cookTime: 20,
      difficulty: "Easy",
      servings: 4
    },
    {
      id: 5,
      title: "Pad Thai",
      image: "https://images.pexels.com/photos/12188535/pexels-photo-12188535.jpeg",
      cuisineType: "Thai",
      prepTime: 20,
      cookTime: 15,
      difficulty: "Medium",
      servings: 2
    },
    {
      id: 6,
      title: "Margherita Pizza",
      image: "https://images.pexels.com/photos/19968430/pexels-photo-19968430.jpeg",
      cuisineType: "Italian",
      prepTime: 30,
      cookTime: 15,
      difficulty: "Hard",
      servings: 4
    }
  ];

  return (
    <section className="recipe-card">
      <h2>Featured Recipes</h2>
      <p className="recipe-card-subtitle">Discover delicious recipes from around the world</p>
      <div className="recipe-card-grid">
        {recipes.map((recipe) => (
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
              <button className="recipe-card-button">View Recipe</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
