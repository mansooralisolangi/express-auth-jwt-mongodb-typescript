import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller";
import { validate } from "../middleware/validate_middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { RegisterSchema, LoginSchema } from "../schemas_Zod/index";

const router = Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.get("/profile", authMiddleware, profile);

export default router;
