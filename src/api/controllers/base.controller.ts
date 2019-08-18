import { Router } from 'express';

export default class BaseController {
  public constructor(router?: Router) {
    if (router) {
      this.initMiddleware(router);
    }
  }

  protected initMiddleware(router: Router) {
    return;
  }
}
