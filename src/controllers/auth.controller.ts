
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user_model";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, phone_number } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword, phone_number });

    res.status(201).json({ success: true, message: "User registered", user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err });
  }
};

// testing
// export const profile = async (req: Request, res: Response) => {
//   res.json({ success: true, message: "Protected route accessed", user: (req as any).user });
// };
// Pthis is protect route agr token hoga to ye access hoga warna nhi
export const profile = async (req: Request, res: Response) => {
  try {
    // User is already attached by middleware
    const user = (req as any).user;
    
    res.json({
      success: true,
      message: "Protected route accessed",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};