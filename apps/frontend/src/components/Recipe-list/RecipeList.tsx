import "./RecipeList.css";

interface DetailedRecipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const RecipeList = () => {
  const detailedRecipes: DetailedRecipe[] = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      ingredients: [
        "400g spaghetti",
        "200g pancetta or guanciale",
        "4 large eggs",
        "100g Pecorino Romano cheese",
        "Black pepper to taste",
        "Salt for pasta water"
      ],
      instructions: [
        "Bring a large pot of salted water to boil and cook spaghetti according to package directions",
        "While pasta cooks, dice pancetta and cook in a large pan until crispy",
        "In a bowl, whisk together eggs and grated cheese",
        "Drain pasta, reserving 1 cup pasta water",
        "Add hot pasta to pancetta pan, remove from heat",
        "Quickly stir in egg mixture, adding pasta water to create creamy sauce",
        "Season with black pepper and serve immediately"
      ],
      calories: 520,
      protein: 22,
      carbs: 65,
      fat: 18
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      ingredients: [
        "500g chicken breast, cubed",
        "1 cup yogurt",
        "2 tbsp tikka masala spice",
        "1 can tomato sauce",
        "1 cup heavy cream",
        "2 onions, diced",
        "4 cloves garlic, minced",
        "Fresh cilantro for garnish"
      ],
      instructions: [
        "Marinate chicken in yogurt and half the spices for 2 hours",
        "Grill or pan-fry chicken until cooked through",
        "In a large pan, sauté onions and garlic until soft",
        "Add remaining spices and cook for 1 minute",
        "Add tomato sauce and simmer for 10 minutes",
        "Stir in cream and cooked chicken",
        "Simmer for 5 more minutes and garnish with cilantro"
      ],
      calories: 380,
      protein: 35,
      carbs: 18,
      fat: 20
    },
    {
      id: 3,
      title: "Caesar Salad",
      ingredients: [
        "1 large romaine lettuce, chopped",
        "1 cup croutons",
        "1/2 cup Parmesan cheese, shaved",
        "1/4 cup Caesar dressing",
        "2 anchovy fillets (optional)",
        "Lemon wedges for serving"
      ],
      instructions: [
        "Wash and thoroughly dry romaine lettuce",
        "Tear lettuce into bite-sized pieces",
        "In a large bowl, toss lettuce with Caesar dressing",
        "Add croutons and toss again",
        "Top with shaved Parmesan and anchovies if using",
        "Serve immediately with lemon wedges"
      ],
      calories: 220,
      protein: 8,
      carbs: 15,
      fat: 14
    }
  ];

  return (
    <section className="recipe-list">
      <h2>Recipe Details</h2>

      {detailedRecipes.map((recipe) => (
        <article key={recipe.id} className="recipe-list-item">
          <h3>{recipe.title}</h3>

          <div className="recipe-section">
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h4>Instructions</h4>
            <ol>
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="nutrition-info">
            <span>Calories: {recipe.calories} </span>
            <span>Protein: {recipe.protein} </span>
            <span>Carbs: {recipe.carbs} </span>
            <span>Fat: {recipe.fat} </span>
          </div>
        </article>
      ))}
    </section>
  );
};

export default RecipeList;
