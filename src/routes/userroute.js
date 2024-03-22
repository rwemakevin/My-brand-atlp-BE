import { Router } from "express";
import UserController from "../controller/usercontroller.js";
import authMiddleWare from "../middleware/authMiddleware.js";
import validation from "../middleware/validationMiddleware.js";
const router = Router();

//User login | Public endpoint
router.post("/login", validation.validateLogin, UserController.loginUser);

// create user account (Signup) | Public endpoint
router.post(
  "/register",
  validation.validateRegister,
  UserController.registerUser
);

//List all users | Private endpoint (level3)
router.get(
  "/users",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level3Role,
  UserController.viewUsers
);

//view one user (By Id) | Private endpoint (level3)
router.get(
  "/users/:id",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level3Role,
  UserController.viewUserById
);

//Delete one user (By Id) | Private endpoint (level4)
router.delete(
  "/users/:id",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level4Role,
  UserController.deleteUserById
);

//Edit one user (By Edit) Private endpoint (level4)
router.put(
  "/users/:id",
  authMiddleWare.isAuthenticated,
  authMiddleWare.level4Role,
  validation.validateEditUser,
  UserController.editUserById
);

router.get("/userCount", UserController.getCountofAllUsers);
export default router;
