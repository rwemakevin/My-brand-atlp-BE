import { Router } from "express";
import UserController from "../controller/usercontroller.js";

const router = Router();

router.post("/register", UserController.registerUser);
router.get("/users", UserController.viewUsers);
router.get("/users/:id", UserController.viewUserById);

export default router;
