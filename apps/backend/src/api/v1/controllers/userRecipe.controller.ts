import type { Request, Response } from "express";
import {
  getAllUserRecipes,
  getUserRecipeById,
  createUserRecipe,
  updateUserRecipe,
  deleteUserRecipe,
} from "../services/userRecipe.services.js";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const recipes = await getAllUserRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user recipes", error });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const recipe = await getUserRecipeById(id);

    if (!recipe) {
      res.status(404).json({ message: "User recipe not found" });
      return;
    }

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user recipe", error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const recipe = await createUserRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error: any) {
    console.error('Create user recipe error:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    res.status(500).json({ 
      message: "Failed to create user recipe", 
      error: {
        message: error.message,
        code: error.code,
        clientVersion: error.clientVersion
      } 
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingRecipe = await getUserRecipeById(id);

    if (!existingRecipe) {
      res.status(404).json({ message: "User recipe not found" });
      return;
    }

    const updatedRecipe = await updateUserRecipe(id, req.body);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user recipe", error });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existingRecipe = await getUserRecipeById(id);

    if (!existingRecipe) {
      res.status(404).json({ message: "User recipe not found" });
      return;
    }

    await deleteUserRecipe(id);
    res.status(200).json({ message: "User recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user recipe", error });
  }
};