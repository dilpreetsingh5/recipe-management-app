import type {Recipe} from '../types/Recipe';

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    image: "https://images.pexels.com/photos/4518833/pexels-photo-4518833.jpeg",
    cuisineType: "Italian",
    prepTime: 10,
    cookTime: 20,
    difficulty: "Medium",
    servings: 4,
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