import { Request, Response, NextFunction } from "express";

// User interface ko thora behtar banayein taake controller mein asani ho
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "admin" | "user";
    // Aap yahan mazeed fields add kar sakte hain jo token mein hain
  };
}

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Check karein ke user logged in hai ya nahi (safety check)
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login first."
    });
  }

  // 2. Check karein ke role 'admin' hai ya nahi
  // Hum .toLowerCase() use kar rahe hain taake case-sensitivity ka masla na ho
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin rights required."
    });
  }

  // Agar admin hai to next middleware/controller par bhejein
  next();
};