
import express from "express";
import { classe } from "./apis/class";
import { authusers } from "./apis/auth";
import { course } from "./apis/course";
import { chapterRouter } from "./apis/chapter";
import { lessonRouter } from "./apis/lesson";
import { magazineRouter } from "./apis/magazine";
import { userRoleRouter } from "./apis/user_role";
import { commentRouter } from "./apis/comment";
import { user } from "./apis/user";

const router = express.Router();

// user Routes CRUD
router.use("/api/v0/auth", authusers);
router.use("/api/v0/classe", classe);
router.use("/api/v0/chapter", chapterRouter);
router.use("/api/v0/lesson", lessonRouter);
router.use("/api/v0/magazine", magazineRouter);
router.use("/api/v0/user_role", userRoleRouter);
router.use("/api/v0/comment",commentRouter)
router.use("/api/v0/user",user)




router.use("/api/v0/course", course);






export default router;
