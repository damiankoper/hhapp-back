import { Router } from 'express';
import UserController from '../controllers/user.controller';

const UsersRouter: Router = Router();
const userController = new UserController();

UsersRouter.get('/', userController.get);
UsersRouter.get('/:id', userController.find);
UsersRouter.post('/', userController.store);
UsersRouter.put('/:id', userController.update);
UsersRouter.delete('/:id', userController.delete);

export default UsersRouter;
