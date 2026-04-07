import Joi, { type ObjectSchema } from "joi";

export const recipeIdParamSchema: ObjectSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const createRecipeSchema: ObjectSchema = Joi.object({
  title: Joi.string().trim().required(),
  image: Joi.string().trim().allow("").optional(),
  cuisineType: Joi.string().trim().required(),
  difficulty: Joi.string().trim().required(),
  prepTime: Joi.number().integer().min(0).required(),
  cookTime: Joi.number().integer().min(0).required(),
  servings: Joi.number().integer().positive().required(),
  ingredients: Joi.array().items(Joi.string().trim().required()).min(1).required(),
  instructions: Joi.array().items(Joi.string().trim().required()).min(1).required(),
  calories: Joi.number().integer().min(0).optional(),
  protein: Joi.number().integer().min(0).optional(),
  carbs: Joi.number().integer().min(0).optional(),
  fat: Joi.number().integer().min(0).optional(),
});

export const updateRecipeSchema: ObjectSchema = Joi.object({
  title: Joi.string().trim(),
  image: Joi.string().trim().allow("").optional(),
  cuisineType: Joi.string().trim(),
  difficulty: Joi.string().trim(),
  prepTime: Joi.number().integer().min(0),
  cookTime: Joi.number().integer().min(0),
  servings: Joi.number().integer().positive(),
  ingredients: Joi.array().items(Joi.string().trim().required()).min(1),
  instructions: Joi.array().items(Joi.string().trim().required()).min(1),
  calories: Joi.number().integer().min(0),
  protein: Joi.number().integer().min(0),
  carbs: Joi.number().integer().min(0),
  fat: Joi.number().integer().min(0),
}).min(1);

export const searchRecipeQuerySchema: ObjectSchema = Joi.object({
  q: Joi.string().trim().min(1).required(),
});

