import express from 'express';
import LessonController from '../../controller/lesson.controller';
import verifyToken from '../../middleware/authMiddleware';
import validate from '../../middleware/validation';
import { createLessonSchema, deleteLessonSchema, getLessonSchema, updateLessonSchema } from '../../database/schema/lesson.schema';

const router = express.Router();
router.use(verifyToken)

router.get('/', LessonController.getAllLessons);
router.get('/:lessonId',validate(getLessonSchema), LessonController.getLessonById);
router.post('/', validate(createLessonSchema),LessonController.createLesson);
router.put('/:lessonId', validate(updateLessonSchema),LessonController.updateLessonById);
router.delete('/:lessonId',validate(deleteLessonSchema) , LessonController.deleteLessonById);

export { router as lessonRouter };
