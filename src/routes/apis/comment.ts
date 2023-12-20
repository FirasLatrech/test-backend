import express from 'express';
import CommentController from '../../controller/comment.controller';
import verifyToken from '../../middleware/authMiddleware';
import validate from '../../middleware/validation';
import { createCommentSchema, deleteCommentSchema, getCommentSchema, updateCommentSchema } from '../../database/schema/comment.schema';

const router = express.Router();
router.use(verifyToken)

router.get('/', CommentController.getAllComments);
router.get('/:commentId',validate(getCommentSchema), CommentController.getCommentById);
router.post('/',validate(createCommentSchema), CommentController.createComment);
router.put('/:commentId',validate(updateCommentSchema), CommentController.updateCommentById);
router.delete('/:commentId',validate(deleteCommentSchema),CommentController.deleteCommentById);

export { router as commentRouter };
