import type { Request, Response, NextFunction } from "express";
import { validate } from "./validation.middleware.js";
import {
  recipeIdParamSchema,
  createRecipeSchema,
  updateRecipeSchema,
  searchRecipeQuerySchema,
} from "../validation/recipe.schema.js";

export const validateRecipeId = (req: Request, res: Response, next: NextFunction) => {
  validate(recipeIdParamSchema, "params")(req, res, next);
};

export const validateCreateRecipe = (req: Request, res: Response, next: NextFunction) => {
  validate(createRecipeSchema, "body")(req, res, next);
};

export const validateUpdateRecipe = (req: Request, res: Response, next: NextFunction) => {
  validate(updateRecipeSchema, "body")(req, res, next);
};

export const validateSearchQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = searchRecipeQuerySchema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((detail: any) => detail.message),
    });
    return;
  }

  req.query = value as Request["query"];
  next();
};

