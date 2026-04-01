import Joi from "joi";
 
export const favoriteIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
 
export const createFavoriteSchema = Joi.object({
  recipeId: Joi.number().integer().positive().required(),
});