import { Router } from "express";

import messageController from "../controller/messagecontroller.js";

const message = Router();

message.post("/messages", messageController.sendMessage);
message.get("/messages", messageController.viewMessages);

export default message;
