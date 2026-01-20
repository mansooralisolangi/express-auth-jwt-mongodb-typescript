

import { Router } from "express";
import { getuser, adduser, updateuser, deleteuser } from "../controllers/user_controller";
import { authenticate } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";
import { validate } from "../middleware/validate_middleware";
import { CreateUserSchema, UpdateUserSchema } from "../schemas_Zod";

const router = Router();

console.log("✅ user_route loaded"); // 🔥 IMPORTANT

router.get("/", authenticate, isAdmin, getuser);
router.post("/adduser", authenticate, isAdmin, validate(CreateUserSchema), adduser);
router.put("/updateuser/:id", authenticate, isAdmin, validate(UpdateUserSchema), updateuser);
router.delete("/deleteuser/:id", authenticate, isAdmin, deleteuser);

export default router; // 🔥 MUST
