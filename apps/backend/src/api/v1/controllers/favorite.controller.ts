import type { Request, Response } from "express";

import {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favorite.service.js";
 
export const getAll = async (_req: Request, res: Response) => {
  try {
    const favorites = await getAllFavorites();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites", error });
  }

};
 
export const create = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.body;
    const favorite = await addFavorite(recipeId);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Failed to add favorite", error });
  }

};
 
export const remove = async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.id);
    await removeFavorite(id);
    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favorite", error });
  }

};
 