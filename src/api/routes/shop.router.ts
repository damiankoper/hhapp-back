import { Router } from 'express';
import ShopController from '../controllers/shop.controller';
import SessionMiddleware from '../middlewares/session.middleware';

const ShopRouter: Router = Router();
const session = new SessionMiddleware();
ShopRouter.use(session.validate.bind(session));

const shopController = new ShopController();
ShopRouter.get('/', shopController.get);
ShopRouter.get('/:id', shopController.find);
ShopRouter.post('/', shopController.store);
ShopRouter.put('/:id', shopController.update);
ShopRouter.delete('/:id', shopController.delete);

export default ShopRouter;
