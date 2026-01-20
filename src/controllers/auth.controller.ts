import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user_model";

// ===================== REGISTER =====================
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password, phone_number } = req.body;

//     // 1. Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // 2. Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 3. Decide role
//     let userRole: "admin" | "user" = "user";

//     const usersCount = await User.countDocuments();
//     if (usersCount === 0) {
//       // First user → ADMIN
//       userRole = "admin";
//     }

//     // 4. Create user
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       phone_number,
//       role: userRole,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error: any) {
//     console.error("Register error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };
export const register = async (req: Request, res: Response) => {
  try {
    // 1. Role ko body se nikalen (Zod schema isse validate kar chuka hai)
    const { username, email, password, phone_number, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Role decide karne ka logic
    let userRole = "user"; 

    const usersCount = await User.countDocuments();
    
    if (usersCount === 0) {
      userRole = "admin"; // Pehla user hamesha admin
    } else if (role) {
      // Agar body mein role bheja gaya hai (e.g. "admin"), toh wahi use karein
      userRole = role.toLowerCase(); 
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone_number,
      role: userRole,
    });

    return res.status(201).json({
      success: true,
      message: `User created as ${userRole}`,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// ===================== LOGIN =====================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===================== PROFILE =====================
export const profile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error("Profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
