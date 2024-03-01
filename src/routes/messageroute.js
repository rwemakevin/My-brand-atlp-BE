import { Router } from "express";

import messageController from "../controller/messagecontroller.js";

const message = Router();

message.post("/messages", messageController.sendMessage);
message.get("/messages", messageController.viewMessages);
message.get("/messages/:id", messageController.viewMessageById);

export default message;
