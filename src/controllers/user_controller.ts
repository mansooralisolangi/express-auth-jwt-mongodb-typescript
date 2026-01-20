
// import { Request, Response } from "express";
// import User from "../models/user_model";
// import bcrypt from "bcryptjs";

// // CREATE - Add new user
// export async function adduser(req: Request, res: Response) {
//   try {
//     const { username, email, password, phone_number } = req.body;

//     // Check required fields
//     if (!username || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Username, email and password are required"
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User with this email already exists"
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = new User({
//       username,
//       email,
//       password: hashedPassword,
//       phone_number: phone_number || ""
//     });

//     await user.save();

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       data: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         phone_number: user.phone_number
//       }
//     });

//   } catch (error: any) {
//     console.error("Add user error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// }

// // READ - Get user (single or multiple)
// export async function getuser(req: Request, res: Response) {
//   try {
//     const { id, email } = req.query;

//     // If ID is provided, get single user
//     if (id) {
//       const user = await User.findById(id).select('-password -__v');
      
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found"
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "User retrieved successfully",
//         data: user
//       });
//     }
    
//     // If email is provided, get user by email
//     else if (email) {
//       const user = await User.findOne({ email }).select('-password -__v');
      
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found"
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         message: "User retrieved successfully",
//         data: user
//       });
//     }
    
//     // If no specific parameter, get all users
//     else {
//       const users = await User.find().select('-password -__v').sort({ createdAt: -1 });
      
//       return res.status(200).json({
//         success: true,
//         message: "All users retrieved successfully",
//         count: users.length,
//         data: users
//       });
//     }

//   } catch (error: any) {
//     console.error("Get user error:", error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user ID format"
//       });
//     }
    
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// }








// // UPDATE - Update user
// export async function updateuser(req: Request, res: Response) {
//   try {
//     const { id } = req.body;
//     const updateData = req.body;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID is required"
//       });
//     }

//     // Remove id from updateData to avoid updating it
//     delete updateData.id;

//     // If password is being updated, hash it
//     if (updateData.password) {
//       updateData.password = await bcrypt.hash(updateData.password, 10);
//     }

//     // If email is being updated, check if not already taken
//     if (updateData.email) {
//       const existingUser = await User.findOne({ 
//         email: updateData.email, 
//         _id: { $ne: id } 
//       });
      
//       if (existingUser) {
//         return res.status(409).json({
//           success: false,
//           message: "Email already in use by another user"
//         });
//       }
//     }

//     // Update user
//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     ).select('-password -__v');

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: updatedUser
//     });
    
//   } catch (error: any) {
//     console.error("Update user error:", error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user ID format"
//       });
//     }
    
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// }





// // DELETE - Delete user
// export async function deleteuser(req: Request, res: Response) {
//   try {
//     const { id } = req.body;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "User ID is required"
//       });
//     }

//     const deletedUser = await User.findByIdAndDelete(id);
    
//     if (!deletedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//       data: {
//         id: deletedUser._id,
//         email: deletedUser.email
//       }
//     });
    
//   } catch (error: any) {
//     console.error("Delete user error:", error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user ID format"
//       });
//     }
    
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// }


import { Request, Response } from "express";
import User from "../models/user_model";
import bcrypt from "bcryptjs";

// CREATE (ADMIN)
// export async function adduser(req: Request, res: Response) {
//   try {
//     const { username, email, password, phone_number } = req.body;

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(409).json({ success: false, message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       phone_number,
//       role: "user"
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       data: { id: user._id, username, email }
//     });
//   } catch (err:any) {
//     return res.status(500).json({ success:false, message: err.message });
//   }
// }


export async function adduser(req: Request, res: Response) {
  try {
    // 1. Role ko bhi body se nikalen
    const { username, email, password, phone_number, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Destructured role ko yahan use karein
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone_number,
      role: role || "user" // Agar body mein role na ho toh default "user"
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        role: user.role // Response mein role bhi dikhayen
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
// READ (ADMIN)
export async function getuser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (id) {
      const user = await User.findById(id).select("-password -__v");
      if (!user) return res.status(404).json({ success:false, message:"User not found" });
      return res.json({ success:true, data:user });
    }

    const users = await User.find().select("-password -__v");
    return res.json({ success:true, count: users.length, data: users });
  } catch (err:any) {
    return res.status(500).json({ success:false, message: err.message });
  }
}

// UPDATE (ADMIN)
export async function updateuser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data:any = req.body;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, data, { new:true })
      .select("-password -__v");

    if (!user) return res.status(404).json({ success:false, message:"User not found" });

    return res.json({ success:true, message:"User updated", data:user });
  } catch (err:any) {
    return res.status(500).json({ success:false, message: err.message });
  }
}

// DELETE (ADMIN)
export async function deleteuser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ success:false, message:"User not found" });

    return res.json({ success:true, message:"User deleted" });
  } catch (err:any) {
    return res.status(500).json({ success:false, message: err.message });
  }
}
