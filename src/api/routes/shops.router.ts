import { Router } from 'express';
import ShopController from '../controllers/shop.controller';
import SessionMiddleware from '../middlewares/session.middleware';

const ShopsRouter: Router = Router();
const session = new SessionMiddleware();
ShopsRouter.use(session.validate.bind(session));

const shopController = new ShopController();
ShopsRouter.get('/', shopController.get);
ShopsRouter.get('/:id', shopController.find);
ShopsRouter.post('/', shopController.store);
ShopsRouter.put('/:id', shopController.update);
ShopsRouter.delete('/:id', shopController.delete);

export default ShopsRouter;
