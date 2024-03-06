import userSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import { JWT } from "../helper/jwt.js";

export default class UserController {
  static async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const isUserExist = await userSchema.findOne({ email: email });
      if (isUserExist) {
        return res.status(400).json({
          status: "fail",
          message: "user already exist",
        });
      }

      // for encrypting password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      //add user to our collection
      const user = await userSchema.create({
        name,
        email,
        password: encryptedPassword,
      });

      return res.status(200).json({
        status: "success",
        data: await userSchema.findById(user._id).select("-password"),
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      //check if user exist using email
      const user = await userSchema.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          status: "not found",
          message: "User not found",
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = JWT.generateJwt({
            userId: user._id,
            role: user.role,
            name: user.name,
          });
          return res.status(200).json({
            status: "OK",
            message: "Login successfully",
            role: user.role,
            token,
          });
        }

        return res.status(500).json({
          status: "fail",
          message: "Incorrect credentials",
        });
      });
    } catch (e) {
      res.status(404).json({
        status: "fail",
        message: "something went wrong " + e,
      });
    }
  }

  static async viewUsers(req, res) {
    try {
      const allUsers = await userSchema.find().select("-password");
      return res.status(200).json({
        status: "success",
        totalUsers: allUsers.length,
        data: allUsers,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong " + error,
      });
    }
  }

  static async viewUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await userSchema.findById(id).select("-password");
      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      return res.status(200).json({
        status: "Success",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        status: "not found",
        message: "user not found",
      });
    }
  }

  static async deleteUserById(req, res) {
    try {
      const id = req.params.id;
      const deletedUser = await userSchema
        .findByIdAndDelete(id)
        .select("-password");

      if (!deletedUser) {
        return res.status(404).json({
          status: "fail",
          message: "user not found",
        });
      }
      //delete deletedUser.password;
      return res.status(200).json({
        status: "success",
        message: "user deleted",
        data: deletedUser,
      });
    } catch (error) {
      return res.status(404).json({
        status: "not found",
        message: "user not found",
      });
    }
  }

  static async editUserById(req, res) {
    try {
      const id = req.params.id;
      const { name, password, role } = req.body;

      // for encrypting password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      //Query for Updating the user
      const updateUser = await userSchema.findByIdAndUpdate(
        { _id: id },
        {
          name,
          password: encryptedPassword,
          role,
          updatedAt: Date.now(),
        }
      );

      if (!updateUser) {
        return res.status(404).json({
          status: "fail",
          message: "user not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: await userSchema.findById(id).select("-password"),
      });
    } catch (error) {
      return res.status(404).json({
        status: "fail",
        message: "user not found",
      });
    }
  }
}
