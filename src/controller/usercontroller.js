import userSchema from "../model/userSchema.js";

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

      const user = await userSchema.create({
        name,
        email,
        password,
      });

      return res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  static async viewUsers(req, res) {
    try {
      const allUsers = await userSchema.find();
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
      const user = await userSchema.findById(id);
      if (!user) {
        return res.status(500).json({
          status: "fail",
          message: "User not found",
        });
      }

      return res.status(200).json({
        status: "Success",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "something went wrong " + error,
      });
    }
  }
}
