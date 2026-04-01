import { Router } from "express";
import {
  getAll,
  create,
  remove,
} from "../controllers/favorite.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  favoriteIdParamSchema,
  createFavoriteSchema,
} from "../validation/favorite.schema.js";
 
const router = Router();
 
router.get("/", getAll);
router.post("/", validate(createFavoriteSchema, "body"), create);
router.delete("/:id", validate(favoriteIdParamSchema, "params"), remove);
 
export default router;