export interface UserRecipe {
  id: number;
  title: string;
  image?: string;
  cuisineType: string;
  prepTime: number;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  ingredients: string[];
  instructions: string[];
}