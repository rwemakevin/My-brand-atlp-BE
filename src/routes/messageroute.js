import { Router } from "express";

import messageController from "../controller/messagecontroller.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const message = Router();

// Send message via contact form | Public endpoint
message.post("/messages", messageController.sendMessage);

// View all messages | private endpoint
message.get(
  "/messages",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level3Role,
  messageController.viewMessages
);

//view one message | private endpoint
message.get(
  "/messages/:id",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level3Role,
  messageController.viewMessageById
);

//Delete one message | private endpoint
message.delete(
  "/messages/:id",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level4Role,
  messageController.deleteMessageById
);

export default message;
