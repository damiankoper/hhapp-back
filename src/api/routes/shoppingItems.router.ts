import { Router } from 'express';
import ShoppingItemController from '../controllers/shoppingItem.controller';
import SessionMiddleware from '../middlewares/session.middleware';

const ShoppingItemsRouter: Router = Router();
const session = new SessionMiddleware();
ShoppingItemsRouter.use(session.validate.bind(session));

const shoppingItemController = new ShoppingItemController();
ShoppingItemsRouter.get('/', shoppingItemController.get);
ShoppingItemsRouter.get('/:id', shoppingItemController.find);
ShoppingItemsRouter.post(
  '/',
  shoppingItemController.store.bind(shoppingItemController)
);
ShoppingItemsRouter.put('/:id', shoppingItemController.update);
ShoppingItemsRouter.delete('/:id', shoppingItemController.delete);

export default ShoppingItemsRouter;
