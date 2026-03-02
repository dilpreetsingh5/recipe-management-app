export interface Recipe {
  id: number;
  title: string;
  cuisineType: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  createdAt: string;
  image?: string;
  servings?: number;
  ingredients?: string[];
  instructions?: string
}
