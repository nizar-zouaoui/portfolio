import { Router, RouterOptions } from "express";

import middlewareWithTryCatch from "./middlewareWithTryCatch";
import { IMiddleware } from "./IMiddleware";

const CustomRouter = () => (options?: RouterOptions | undefined) => {
  const thisRouter: Router = Router(options);

  const { get, put, post, delete: deleter, patch } = thisRouter;

  function HOFCustomMethod<
    Method extends <U, A, R>(this: U, ...args: A[]) => R,
  >(method: Method) {
    return function customMethod(this: Method, ...args: Parameters<Method>) {
      const [path, ...middlewares] = args;
      const customMiddlewares = middlewares.map((middleware) =>
        middlewareWithTryCatch(middleware as IMiddleware)
      );

      return method.apply(this, [path, ...customMiddlewares]);
    };
  }

  thisRouter.get = HOFCustomMethod(get) as typeof get;
  thisRouter.put = HOFCustomMethod(put) as typeof put;
  thisRouter.post = HOFCustomMethod(post) as typeof post;
  thisRouter.patch = HOFCustomMethod(patch) as typeof patch;
  thisRouter.delete = HOFCustomMethod(deleter) as typeof deleter;

  return thisRouter as Router;
};

export default CustomRouter;
