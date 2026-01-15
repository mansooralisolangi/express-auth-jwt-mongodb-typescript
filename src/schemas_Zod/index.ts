
// import { z } from "zod";

// export const UserSchema = z.object({
//   username: z.string().min(3, "Username must be 3+ chars"),
//   email: z.string().email("Invalid email format"),
//   password: z.string().min(6, "Password must be 6+ chars"),
//   phone_number: z.string().min(11, "Phone number must be valid"),
// });

// import { z } from "zod";

// export const UserSchema = z.object({
//   username: z.string().min(3, "Username must be 3+ chars"),
//   email: z.string().email("Invalid email format"),
//   password: z.string().min(6, "Password must be 6+ chars"),
//   phone_number: z.string().min(11, "Phone number must be valid"),
// });

// export const CreateUserSchema = UserSchema;

// export const UpdateUserSchema = UserSchema.partial();

// export const DeleteUserSchema = z.object({
//   id: z.number().int().positive(),
// });

// updated code here yahan p akh h file main login or  resgitser k schema h
import { z } from "zod";

// Base User Schema (CRUD)

export const UserSchema = z.object({
  username: z.string().min(3, "Username must be 3+ chars"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be 6+ chars"),
  phone_number: z.string().min(11, "Phone number must be valid"),
});

// CRUD Schemas

export const CreateUserSchema = UserSchema; 
export const UpdateUserSchema = UserSchema.partial(); 
export const DeleteUserSchema = z.object({
  id: z.number().int().positive(),
});

// AUTH Schemas

// Login: only email and password required
export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be 6+ chars"),
});

// Optional: Register can reuse full CreateUserSchema
export const RegisterSchema = CreateUserSchema;
