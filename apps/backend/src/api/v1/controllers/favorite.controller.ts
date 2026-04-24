import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favorite.service.js";
 
export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).userId;
    const favorites = await getAllFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites", error });
  }

};
 
export const create = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.body;
    const { favorite, created } = await addFavorite(
      recipeId,
      (req as AuthenticatedRequest).userId
    );
    res.status(created ? 201 : 200).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Failed to add favorite", error });
  }

};
 
export const remove = async (req: Request, res: Response) => {

  try {
    const id = Number(req.params.id);
    const userId = (req as AuthenticatedRequest).userId;
    const removedCount = await removeFavorite(id, userId);

    if (removedCount === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    return res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove favorite", error });
  }

};
 
