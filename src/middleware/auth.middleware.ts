// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export interface AuthRequest extends Request {
//   user?: any;
// }

// export const authMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Access denied. Token missing",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user_model"; // Make sure to import User model

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    
    // 1. Check if token exists and has Bearer prefix
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]; // Get token after "Bearer "
    } else {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing or invalid format. Use: Bearer <token>",
      });
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing",
      });
    }

    // 2. Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // 3. Fetch user from database (IMPORTANT!)
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or account deleted",
      });
    }
    
    // 4. Attach user to request
    req.user = user;
    next();
    
  } catch (error: any) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }
    
    // Generic error
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};