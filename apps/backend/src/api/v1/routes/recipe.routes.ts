import { Router } from "express";
import {
  validateRecipeId,
  validateCreateRecipe,
  validateUpdateRecipe,
  validateSearchQuery,
} from "../middleware/recipe.middleware.js";
// validate no longer needed - using recipe middleware
import {
  getAllRecipes,
  getRecipeById,
  searchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";

const router = Router();

router.get("/", getAllRecipes);
router.get("/search", validateSearchQuery, searchRecipes);
router.get("/:id", validateRecipeId, getRecipeById);
router.post("/", validateCreateRecipe, createRecipe);
router.put(
  "/:id",
  validateRecipeId,
  validateUpdateRecipe,
  updateRecipe
);
router.delete("/:id", validateRecipeId, deleteRecipe);

export default router;
