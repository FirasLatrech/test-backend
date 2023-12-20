import express from 'express';
import ChapterController from '../../controller/chapter.controller';
import restrictTo from '../../middleware/restrictTo';
import verifyToken from '../../middleware/authMiddleware';
import validate from '../../middleware/validation';
import Chapter from '../../database/models/chapter.model';
import { createChapterSchema, deleteChapterSchema, updateChapterSchema } from '../../database/schema/chapter.schema';


const router = express.Router();

// Get all chapters
router.use(verifyToken)
router.get('/', ChapterController.getAllChapters);
// Get a specific chapter by ID
router.get('/:chapterId', ChapterController.getChapterById);

// Create a new chapter
router.post('/',
    validate(createChapterSchema),
    restrictTo(['superAdmin', 'admin', 'teacher']), ChapterController.createChapter);

// Update a chapter by ID
router.put('/:chapterId',
validate(updateChapterSchema),
 restrictTo(['superAdmin', 'admin', 'teacher']), ChapterController.updateChapterById);

// Delete a chapter by ID
router.delete('/:chapterId',
validate(deleteChapterSchema),
 restrictTo(['superAdmin', 'admin', 'teacher']), ChapterController.deleteChapterById);

export {
        router as chapterRouter
};