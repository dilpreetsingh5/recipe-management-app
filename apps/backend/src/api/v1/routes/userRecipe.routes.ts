import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/userRecipe.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  userRecipeIdParamSchema,
  createUserRecipeSchema,
  updateUserRecipeSchema,
} from "../validation/userRecipe.schema.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", validate(userRecipeIdParamSchema, "params"), getById);
router.post("/", validate(createUserRecipeSchema, "body"), create);
router.put(
  "/:id",
  validate(userRecipeIdParamSchema, "params"),
  validate(updateUserRecipeSchema, "body"),
  update
);
router.delete("/:id", validate(userRecipeIdParamSchema, "params"), remove);

export default router;