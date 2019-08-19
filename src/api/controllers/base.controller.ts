import { Router } from 'express';

export default abstract class BaseController {
  public constructor(router?: Router) {
    if (router) {
      this.initMiddleware(router);
    }
  }

  protected abstract initMiddleware(router: Router): void;
}
