import { Request, Response, Router } from 'express';
import ShoppingItem from '../../entity/ShoppingItem';
import SessionMiddleware from '../middlewares/session.middleware';
import BaseController from './base.controller';
export default class ShoppingItemController extends BaseController {
  public constructor(router?: Router) {
    super(router);
  }

  public async get(req: Request, res: Response) {
    return res.send(await ShoppingItem.find());
  }

  public async find(req: Request, res: Response) {
    const item = await ShoppingItem.findOne(req.params.id);
    if (item) {
      return res.send(item);
    } else {
      return res.status(404).send();
    }
  }

  public async store(req: Request, res: Response) {
    const item = await ShoppingItem.create(req.body).save();
    return res.status(201).send(item);
  }

  public async update(req: Request, res: Response) {
    const item = await ShoppingItem.findOne(req.params.id);
    if (item) {
      await ShoppingItem.merge(item, req.body);
      return res.send(await item.save());
    }
    return res.status(404).send();
  }

  public async delete(req: Request, res: Response) {
    const item = await ShoppingItem.findOne(req.params.id);
    if (item) {
      item.remove();
      return res.send(item);
    }
    return res.status(404).send();
  }

  protected initMiddleware(router: Router) {
    const session = new SessionMiddleware();
    router.use(session.validate.bind(session));
  }
}
