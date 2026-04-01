import type { Request, Response } from "express";
import * as RecipeService from "../services/recipe.services.js";

export async function getAllRecipes( res: Response) {
  try {
const recipes = await RecipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}

export async function getRecipeById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
const recipe = await RecipeService.getRecipeById(id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
}

export async function searchRecipes(req: Request, res: Response) {
  try {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }
    
const recipes = await RecipeService.searchRecipes(searchTerm);
    res.json(recipes);
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ error: 'Failed to search recipes' });
  }
}

export async function createRecipe(req: Request, res: Response) {
  try {
    const { title, cuisineType, difficulty, prepTime, cookTime, servings, ingredients, instructions } = req.body;
    
    // Validation
    if (!title || !cuisineType || !difficulty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
const recipe = await RecipeService.createRecipe({
      title,
      cuisineType,
      difficulty,
      prepTime: parseInt(prepTime),
      cookTime: parseInt(cookTime),
      servings: parseInt(servings),
      ingredients,
      instructions
    });
    
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
}

export async function updateRecipe(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    
const recipe = await RecipeService.updateRecipe(id, data);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
}

export async function deleteRecipe(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
await RecipeService.deleteRecipe(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
}
