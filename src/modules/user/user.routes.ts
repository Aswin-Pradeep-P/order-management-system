import express from 'express';
import { validate } from '../../middleware/validation';
import { CreateUserSchema } from './user.validation';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post("/users", validate(CreateUserSchema, 'body'), userController.createUser.bind(userController))
router.post("/users/login", userController.login.bind(userController))

export default router;