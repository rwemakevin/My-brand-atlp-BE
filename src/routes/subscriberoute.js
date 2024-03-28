import { Router } from "express";
import subscribeController from "../controller/subscribecontroller.js";
import validation from "../middleware/validationMiddleware.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const subscribe = Router();

subscribe.post(
  "/subscribe",
  validation.validateAddSubscriber,
  subscribeController.addSubscriber
);

subscribe.get(
  "/subscribe",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level3Role,
  subscribeController.viewSubscribers
);

export default subscribe;
