// import { Router } from "express";
// import { getuser , adduser,updateuser,deleteuser} from "../controllers/user_controller";

// const router = Router();

// router.get("/alluser",getuser);
// router.post("/adduser",adduser);
// router.get("/updateuser", updateuser);
// router.get("/deleteuser",deleteuser);


// export default router;

/// middleware validate 
import { Router } from "express";
import {
  getuser , adduser,updateuser,deleteuser}

from "../controllers/user_controller";

import { validate } from "../middleware/validate_middleware";
import {
  CreateUserSchema,
  UpdateUserSchema,
  DeleteUserSchema,
} from "../schemas_Zod/index";

const router = Router();

router.post("/adduser", validate(CreateUserSchema), adduser);
router.get("/getuser", getuser);
router.put("/updateuser", validate(UpdateUserSchema), updateuser);
router.delete("/deleteuser", validate(DeleteUserSchema), deleteuser);

export default router;
