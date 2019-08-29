import * as bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import User from '../../entity/User';
import BaseController from './base.controller';
export default class UserController extends BaseController {
  public constructor(router?: Router) {
    super(router);
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
    // TODO handle errors everywhere 500 by default
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await User.create(req.body).save();
    (user.password as any) = undefined;
    return res.status(201).send(user);
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
