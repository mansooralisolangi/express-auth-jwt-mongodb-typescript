import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Use safeParse to avoid try-catch blocks for logic flow
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Log this so you can see exactly what failed in your terminal
      console.error("❌ Validation Failed:", result.error.format());

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        // This returns a more readable error object to Postman
        errors: result.error.flatten().fieldErrors, 
      });
    }

    // Assign the cleaned/validated data back to req.body
    req.body = result.data;
    next();
  };