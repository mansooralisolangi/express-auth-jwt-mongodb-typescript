// import { Router } from "express";
// import { register, login, profile } from "../controllers/auth.controller";
// import { validate } from "../middleware/validate_middleware";
// import { authenticate } from "../middleware/auth.middleware";
// import { RegisterSchema, LoginSchema } from "../schemas_Zod";

// const router = Router();

// // Public Routes
// router.post("/register", validate(RegisterSchema), register);
// router.post("/login", validate(LoginSchema), login);

// // Protected Route (Token is required here)
// router.get("/profile", authenticate, profile); 

// export default router;

import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller";
import { validate } from "../middleware/validate_middleware";
import { authenticate } from "../middleware/auth.middleware";
import { RegisterSchema, LoginSchema } from "../schemas_Zod";

const router = Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.get("/profile", authenticate, profile);

export default router;

