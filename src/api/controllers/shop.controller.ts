import { Request, Response } from 'express';
import Shop from '../../entity/Shop';
import BaseController from './base.controller';
export default class ShopController extends BaseController {
  public async get(req: Request, res: Response) {
    return res.send(await Shop.find());
  }

  public async find(req: Request, res: Response) {
    const shop = await Shop.findOne(req.params.id);
    if (shop) {
      return res.send(shop);
    } else {
      return res.status(404).send();
    }
  }

  public async store(req: Request, res: Response) {
    const shop = await Shop.create(req.body).save();
    return res.status(201).send(shop);
  }

  public async update(req: Request, res: Response) {
    const shop = await Shop.findOne(req.params.id);
    if (shop) {
      await Shop.merge(shop, req.body);
      return res.send(await shop.save());
    }
    return res.status(404).send();
  }

  public async delete(req: Request, res: Response) {
    const shop = await Shop.findOne(req.params.id);
    if (shop) {
      await shop.remove();
      return res.send(shop);
    }
    return res.status(404).send();
  }
}
