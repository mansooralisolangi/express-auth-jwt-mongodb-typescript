// import { Router } from "express";
// import { getuser, adduser, updateuser, deleteuser } from "../controllers/user_controller";

// import { validate } from "../middleware/validate_middleware";
// import { CreateUserSchema, UpdateUserSchema } from "../schemas_Zod/index";
// import { authenticate } from "../middleware/auth.middleware";
// import { isAdmin } from "../middleware/role.middleware";

// const router = Router();

// router.get("/", authenticate, isAdmin, getuser);
// router.get("/:id", authenticate, isAdmin, getuser);
// router.post("/adduser", adduser);
// router.put("/updateuser/:id", authenticate, isAdmin, validate(UpdateUserSchema), updateuser);
// router.delete("/deleteuser/:id", authenticate, isAdmin, deleteuser);

// export default router;


import { Router } from "express";
import { getuser, adduser, updateuser, deleteuser } from "../controllers/user_controller";
import { authenticate } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/role.middleware";
import { validate } from "../middleware/validate_middleware";
import { CreateUserSchema, UpdateUserSchema } from "../schemas_Zod";

const router = Router();

router.get("/", authenticate, isAdmin, getuser);
router.get("/:id", authenticate, isAdmin, getuser);

router.post(
  "/adduser",
  authenticate,
  isAdmin,
  validate(CreateUserSchema),
  adduser
);

router.put(
  "/updateuser/:id",
  authenticate,
  isAdmin,
  validate(UpdateUserSchema),
  updateuser
);

router.delete(
  "/deleteuser/:id",
  authenticate,
  isAdmin,
  deleteuser
);

export default router;
