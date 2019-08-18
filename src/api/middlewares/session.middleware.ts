import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default class SessionMiddleware {
  public async validate(req: Request, res: Response, next: NextFunction) {
    const token = this.getToken(req);
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET || 'secret');
        return next();
      } catch {
        res
          .status(401)
          .send()
          .end();
      }
    }
    res
      .status(401)
      .send()
      .end();
  }

  private getToken(req: Request): string | false {
    if (req.headers.authorization) {
      const authorization = req.headers.authorization
        .split(' ')
        .map(s => s.trim())
        .filter(s => s.length);
      if (authorization.length === 2 && authorization[0] === 'Bearer') {
        return authorization[1];
      }
    }
    return false;
  }
}
