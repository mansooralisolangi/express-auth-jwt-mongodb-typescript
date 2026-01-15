import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.body = data; // ✅ cleaned data
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }
  };
