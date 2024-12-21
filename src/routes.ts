import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Rest } from "./lib/Rest";
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

export const router = express.Router();

const userController = new UserController();

router.get("/users/:id/posts", userController.getAllPosts);

createRestRoutes("users", userController, ["name", "password"]);

createRestRoutes("posts", new PostController(), [
  "title",
  "description",
  "type",
  "user_id",
]);

function createRestRoutes(route: string, controller: Rest, fields: string[]) {
  const validationFields = fields.map((i) => body(i).notEmpty());

  const validationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ error: result.array() });
      return;
    }
    next();
  };

  router.get(`/${route}`, controller.getAll);
  router.get(`/${route}/:id`, controller.getOne);
  router.post(
    `/${route}`,
    validationFields,
    validationMiddleware,
    controller.insert
  );
  router.put(
    `/${route}/:id`,
    validationFields,
    validationMiddleware,
    controller.update
  );
  router.delete(`/${route}/:id`, controller.delete);
}
