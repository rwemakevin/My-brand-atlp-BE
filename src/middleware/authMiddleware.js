import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class authMiddleWare {
  static async isAuthenticated(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({
          status: "fail",
          message: "Missing authorization token",
        });
      }

      const token = authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          status: "fail",
          message: "unauthorized action",
        });
      }

      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (e) {
      return res.status(500).json({
        status: "error",
        message: "something went wrong " + e,
      });
    }
  }

  // User
  static async level1Role(req, res, next) {
    try {
      const user = req.user;
      if (user.role === "user") {
        return next();
      }

      return res.status(403).json({
        status: "fail",
        message: " Access denied",
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        message: "something went wrong " + error,
      });
    }
  }

  // blogger , Admin, super Admin
  static async level2Role(req, res, next) {
    try {
      const user = req.user;
      if (
        user.role === "blogger" ||
        user.role === "admin" ||
        user.role === "superadmin"
      ) {
        return next();
      }

      return res.status(403).json({
        status: "fail",
        message: " Access denied",
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        message: "something went wrong " + error,
      });
    }
  }

  //admin or superadmin
  static async level3Role(req, res, next) {
    try {
      const user = req.user;
      if (user.role === "superadmin" || user.role === "admin") {
        return next();
      }

      return res.status(403).json({
        status: "fail",
        message: " Access denied",
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        message: "something went wrong " + error,
      });
    }
  }

  //Super Admin
  static async level4Role(req, res, next) {
    try {
      const user = req.user;
      if (user.role === "superadmin") {
        return next();
      }

      return res.status(403).json({
        status: "fail",
        message: " Access denied",
      });
    } catch (e) {
      return res.status(500).json({
        status: "error",
        message: "something went wrong " + error,
      });
    }
  }
}
