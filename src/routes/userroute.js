import { Router } from "express";
import UserController from "../controller/usercontroller.js";

const router = Router();

router.post("/register", UserController.registerUser);

export default router;
