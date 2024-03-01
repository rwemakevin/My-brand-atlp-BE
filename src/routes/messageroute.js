import { Router } from "express";

import messageController from "../controller/messagecontroller.js";

const message = Router();

message.post("/messages", messageController.sendMessage);

export default message;
