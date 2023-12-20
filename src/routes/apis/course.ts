import express from 'express';
import CourseController from '../../controller/course.controller';
import verifyToken from '../../middleware/authMiddleware';
import validate from '../../middleware/validation';
import { createCourseSchema, deleteCourseSchema, getCourseSchema, updateCourseSchema } from '../../database/schema/course.schema';

const router = express.Router();



router.use(verifyToken);
// Get all courses
router.route('/')
.get(CourseController.getAllCourses);
// Get a specific course by ID
router.get('/:courseId',validate(getCourseSchema), verifyToken, CourseController.getCourseById);

// Create a new course
router.post('/',validate(createCourseSchema), CourseController.createCourse);

// Update a course by ID
router.put('/:courseId',validate(updateCourseSchema), CourseController.updateCourseById);

// Delete a course by ID
router.delete('/:courseId',validate(deleteCourseSchema), CourseController.deleteCourseById);

export { router as course };





// import express from 'express';
// import ChapterController from '../../controller/chapter.controller';
// import restrictToRole from '../../middleware/restrictToRole';

// const router = express.Router();

// // Get all chapters (only accessible to admins)
// router.get('/', restrictToRole('admin'), ChapterController.getAllChapters);

// // Get a specific chapter by ID (accessible to all roles)
// router.get('/:chapterId', ChapterController.getChapterById);

// // Create a new chapter (accessible to teachers and above)
// router.post('/', restrictToRole('teacher'), ChapterController.createChapter);

// // Update a chapter by ID (accessible to teachers and above)
// router.put('/:chapterId', restrictToRole('teacher'), ChapterController.updateChapterById);

// // Delete a chapter by ID (only accessible to superadmins)
// router.delete('/:chapterId', restrictToRole('superadmin'), ChapterController.deleteChapterById);

// export { router as chapterRouter };
