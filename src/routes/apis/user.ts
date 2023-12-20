

import { Router } from "express";
import { deletUser, getAllUser, updateUser} from "../../controller/auth.controller";
import restrictTo from "../../middleware/restrictTo";
import verifyToken from "../../middleware/authMiddleware";
const router = Router();
router.use(
verifyToken
)  
router.use(restrictTo(["admin","superAdmin"]))
router.route("/").get(getAllUser)
router.route('/:userId').put( updateUser).delete(deletUser)

export { router as user };
