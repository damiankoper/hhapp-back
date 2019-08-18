import { NextFunction } from "express";

export default jest.fn(() => {
  return function () {
      return { isValid: (req: any, res: any, next: NextFunction) => next() };
    }
  };
});
