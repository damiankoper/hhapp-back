import { Request, Response } from 'express';
import Shop from '../../entity/Shop';
import ShoppingCategory from '../../entity/ShoppingCategory';
import ShoppingItem from '../../entity/ShoppingItem';
import User from '../../entity/User';
import BaseController from './base.controller';
export default class ShoppingItemController extends BaseController {
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

  public async getForUser(req: Request, res: Response) {
    return res.send(
      await ShoppingItem.find({
        where: {
          boughtBy: {
            id: req.params.userId,
          },
        },
      })
    );
  }

  public async store(req: Request, res: Response) {
    req.body.userId = req.body.boughtById;
    return this._store(req, res);
  }

  public async storeForUser(req: Request, res: Response) {
    req.body.userId = req.params.userId;
    return this._store(req, res);
  }

  public async update(req: Request, res: Response) {
    const item = await ShoppingItem.findOne(req.params.id);
    try {
      if (!item) {
        throw new Error();
      }
      await ShoppingItem.merge(item, req.body);
      if (req.body.boughtById) {
        const user = await User.findOne(req.body.boughtById);
        if (!user) {
          throw new Error();
        } else {
          item.boughtBy = user;
        }
      }
      if (req.body.shopId) {
        const shop = await Shop.findOne(req.body.shopId);
        if (!shop) {
          throw new Error();
        } else {
          item.shop = shop;
        }
      }
      if (req.body.categoryId) {
        const category = await ShoppingCategory.findOne(req.body.categoryId);
        if (!category) {
          throw new Error();
        }
        item.category = category;
      }
      if (req.body.boughtForId) {
        const boughtFor = await User.findOne(req.body.boughtForId);
        if (!boughtFor) {
          throw new Error();
        } else {
          item.boughtFor = boughtFor;
        }
      }
      return res.send(await item.save());
    } catch (error) {
      return res.status(404).send();
    }
  }

  public async delete(req: Request, res: Response) {
    const item = await ShoppingItem.findOne(req.params.id);
    if (item) {
      await item.remove();
      return res.send(item);
    }
    return res.status(404).send();
  }

  private async _store(req: Request, res: Response) {
    const item = await ShoppingItem.create(req.body);
    const user = await User.findOne(req.body.userId);
    const shop = await Shop.findOne(req.body.shopId);
    const category = await ShoppingCategory.findOne(req.body.categoryId);
    const userBoughtFor = await User.findOne(req.body.boughtForId);

    if (user && shop && category && userBoughtFor) {
      item.boughtBy = user;
      item.shop = shop;
      item.boughtFor = userBoughtFor;
      item.category = category;
      return res.status(201).send(await item.save());
    }
    return res.status(400).send();
  }
}
