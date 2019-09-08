import { Router } from 'express';
import ShoppingItemController from '../controllers/shoppingItem.controller';
import UserController from '../controllers/user.controller';
// import SessionMiddleware from '../middlewares/session.middleware';

const UsersRouter: Router = Router();
// const session = new SessionMiddleware();
// UsersRouter.use(session.validate.bind(session));

const userController = new UserController();
UsersRouter.get('/', userController.get);
UsersRouter.get('/:id', userController.find);
UsersRouter.post('/', userController.store);
UsersRouter.put('/:id', userController.update);
UsersRouter.delete('/:id', userController.delete);

const shoppingItemController = new ShoppingItemController();
UsersRouter.post(
  '/:userId/shoppingItems',
  shoppingItemController.storeForUser.bind(shoppingItemController)
);
UsersRouter.get('/:userId/shoppingItems', shoppingItemController.getForUser);
export default UsersRouter;
