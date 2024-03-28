import { Router } from "express";
import subscribeController from "../controller/subscribecontroller.js";
import validation from "../middleware/validationMiddleware.js";

const subscribe = Router();

subscribe.post(
  "/subscribe",
  validation.validateAddSubscriber,
  subscribeController.addSubscriber
);

export default subscribe;
