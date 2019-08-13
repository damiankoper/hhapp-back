import { Request, Response } from 'express';
import User from '../../entity/User';
import BaseController from './base.controller';

export default class UserController extends BaseController {
  public constructor() {
    super();
  }

  public async get(req: Request, res: Response) {
    return res.send(await User.find());
  }

  public async find(req: Request, res: Response) {
    const user = await User.findOne(req.params.id);
    if (user) {
      return res.send(user);
    } else {
      return res.status(404).send();
    }
  }

  public async store(req: Request, res: Response) {
    const user = User.create(req.body);
    return res.status(201).send(await user.save());
  }

  public async update(req: Request, res: Response) {
    const user = await User.findOne(req.params.id);
    if (user) {
      await User.merge(user, req.body);
      return res.send(await user.save());
    }
    return res.status(404).send();
  }

  public async delete(req: Request, res: Response) {
    const user = await User.findOne(req.params.id);
    if (user) {
      user.remove();
      return res.send(user);
    }
    return res.status(404).send();
  }
}
