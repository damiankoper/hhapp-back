import { NextFunction } from "express";

export default jest.fn().mockImplementation(() => ({
  validate(req: any, res: any, next: NextFunction) {
    next();
  }
}))
