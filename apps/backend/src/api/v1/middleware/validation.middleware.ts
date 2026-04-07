import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "joi";

export const validate =
  (schema: ObjectSchema, target: "body" | "params") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
      return;
    }

    req[target] = value;
    next();
  };