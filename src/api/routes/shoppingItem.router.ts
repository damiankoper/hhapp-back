import { Router } from 'express';
import ShoppingItemController from '../controllers/shoppingItem.controller';
import SessionMiddleware from '../middlewares/session.middleware';

const ShoppingItemRouter: Router = Router();
const session = new SessionMiddleware();
ShoppingItemRouter.use(session.validate.bind(session));

const shoppingItemController = new ShoppingItemController();
ShoppingItemRouter.get('/', shoppingItemController.get);
ShoppingItemRouter.get('/:id', shoppingItemController.find);
ShoppingItemRouter.post(
  '/',
  shoppingItemController.store.bind(shoppingItemController)
);
ShoppingItemRouter.put('/:id', shoppingItemController.update);
ShoppingItemRouter.delete('/:id', shoppingItemController.delete);

export default ShoppingItemRouter;
