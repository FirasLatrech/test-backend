import express from 'express';
import MagazineController from '../../controller/magazine.controller';
import verifyToken from '../../middleware/authMiddleware';
import validate from '../../middleware/validation';
import { createMagazineSchema, deleteMagazineSchema, getMagazineSchema, updateMagazineSchema } from '../../database/schema/magazine.schema';

const router = express.Router();
router.use(verifyToken)
router.get('/',  MagazineController.getAllMagazines);
router.get('/:magazineId', validate(getMagazineSchema), MagazineController.getMagazineById);
router.post('/',validate(createMagazineSchema), MagazineController.createMagazine);
router.put('/:magazineId', validate(updateMagazineSchema),MagazineController.updateMagazineById);
router.delete('/:magazineId',validate(deleteMagazineSchema), MagazineController.deleteMagazineById);

export { router as magazineRouter };
