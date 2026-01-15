

// import { Request, Response } from "express";
// import User from "../models/user_model";
// //now zod schemas for controller 

// import {UserSchema} from "../schemas_Zod/index";
// import { log } from "console

// // inset 
//  export async function adduser(req: Request, res: Response) {
//   try {
//         const { success, error, data } = UserSchema.safeParse(req.body);
//     if(!success){
//       res.status(400).json({
//         success:false,
//         message:"some thing erro in  code"
//       })
//     }

//       const user = new User(data);
//       await user.save();

//   res.status(200).json({
//       success: true,
//       message: "data insert succesfully "
//     });
      
//   } catch (error : any ) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

//   } //// testing code 



import { Request, Response } from "express";
import User from "../models/user_model";
import bcrypt from "bcryptjs";

// CREATE - Add new user
export async function adduser(req: Request, res: Response) {
  try {
    const { username, email, password, phone_number } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phone_number: phone_number || ""
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone_number: user.phone_number
      }
    });

  } catch (error: any) {
    console.error("Add user error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}

// READ - Get user (single or multiple)
export async function getuser(req: Request, res: Response) {
  try {
    const { id, email } = req.query;

    // If ID is provided, get single user
    if (id) {
      const user = await User.findById(id).select('-password -__v');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user
      });
    }
    
    // If email is provided, get user by email
    else if (email) {
      const user = await User.findOne({ email }).select('-password -__v');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user
      });
    }
    
    // If no specific parameter, get all users
    else {
      const users = await User.find().select('-password -__v').sort({ createdAt: -1 });
      
      return res.status(200).json({
        success: true,
        message: "All users retrieved successfully",
        count: users.length,
        data: users
      });
    }

  } catch (error: any) {
    console.error("Get user error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}

// UPDATE - Update user
export async function updateuser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    // Remove id from updateData to avoid updating it
    delete updateData.id;

    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // If email is being updated, check if not already taken
    if (updateData.email) {
      const existingUser = await User.findOne({ 
        email: updateData.email, 
        _id: { $ne: id } 
      });
      
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already in use by another user"
        });
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
    
  } catch (error: any) {
    console.error("Update user error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}

// DELETE - Delete user
export async function deleteuser(req: Request, res: Response) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        id: deletedUser._id,
        email: deletedUser.email
      }
    });
    
  } catch (error: any) {
    console.error("Delete user error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}