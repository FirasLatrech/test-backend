

import { Router } from "express";
import { config } from "../../config/config";
import { getMe, login, register } from "../../controller/auth.controller";
import verifyToken from "../../middleware/authMiddleware";

const router = Router();


router.post("/register",  
register);
router.post("/login",

login);
router.get("/me", verifyToken ,getMe);



export { router as authusers };
