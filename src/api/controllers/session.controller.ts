import * as bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../../entity/User';
import BaseController from './base.controller';

export default class SessionController extends BaseController {
  public constructor() {
    super();
  }

  public async create(req: Request, res: Response) {
    if (req.body.password && req.body.username) {
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ username: req.body.username })
        .getOne();

      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = await jwt.sign(
          { user: user.id },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '1w' }
        );
        return res.status(201).send(token);
      }
      return res.status(401).send();
    }
    return res.status(400).send();
  }

  /* public async delete(req: Request, res: Response) {
    return res.send();
  } */

  protected initMiddleware(router: Router) {
    return;
  }
}
