import express from 'express';
import User_RoleController from '../../controller/user_role.controller';
import verifyToken from '../../middleware/authMiddleware';
import restrictTo from '../../middleware/restrictTo';

const router = express.Router();
router.use(verifyToken)
router.get('/',restrictTo(['superAdmin','admin','teacher']) ,User_RoleController.getAllUserRoles);
router.get('/:userRoleId', 
restrictTo(['superAdmin','admin']),
User_RoleController.getUserRoleById);
router.post('/',
restrictTo(['superAdmin','admin']),
 User_RoleController.createUserRole);
router.put('/:userRoleId',
restrictTo(['superAdmin','admin']),
 User_RoleController.updateUserRoleById);
router.delete('/:userRoleId',
restrictTo(['superAdmin','admin']),
 User_RoleController.deleteUserRoleById);
export { router as userRoleRouter };
