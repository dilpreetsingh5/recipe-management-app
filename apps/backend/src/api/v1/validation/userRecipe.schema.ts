import Joi from "joi";

export const userRecipeIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const createUserRecipeSchema = Joi.object({
  title: Joi.string().trim().required(),
  cuisineType: Joi.string().trim().required(),
  difficulty: Joi.string().trim().required(),
  prepTime: Joi.number().integer().min(0).required(),
  cookTime: Joi.number().integer().min(0).required(),
  servings: Joi.number().integer().positive().required(),
  ingredients: Joi.array().items(Joi.string().trim().required()).min(1).required(),
  instructions: Joi.array().items(Joi.string().trim().required()).min(1).required(),
});

export const updateUserRecipeSchema = Joi.object({
  title: Joi.string().trim(),
  cuisineType: Joi.string().trim(),
  difficulty: Joi.string().trim(),
  prepTime: Joi.number().integer().min(0),
  cookTime: Joi.number().integer().min(0),
  servings: Joi.number().integer().positive(),
  ingredients: Joi.array().items(Joi.string().trim().required()).min(1),
  instructions: Joi.array().items(Joi.string().trim().required()).min(1),
}).min(1);