import messageSchema from "../model/messageSchema.js";
import mongoose from "mongoose";

export default class messageController {
  static async sendMessage(req, res) {
    try {
      const { fullname, email, message } = req.body;
      const insertMessage = await messageSchema.create({
        fullName: fullname,
        email: email,
        messageContent: message,
      });

      return res.status(201).json({
        status: "created",
        message: "Message sent succesfully",
        data: insertMessage,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Internal server error",
        message: "Something went wrong, Please try again later " + error,
      });
    }
  }

  static async viewMessages(req, res) {
    try {
      const allMessages = await messageSchema.find();
      return res.status(200).json({
        status: "Success",
        totalMessages: allMessages.length,
        data: allMessages,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Internal server error",
        message: "Something went wrong: " + error,
      });
    }
  }

  static async viewMessageById(req, res) {
    try {
      const id = req.params.id;
      const message = await messageSchema.findById(id);
      if (!message) {
        return res.status(404).json({
          status: "Not found",
          message: "Message not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: message,
      });
    } catch (error) {
      return res.status(404).json({
        status: "not found",
        message: "Id not found",
      });
    }
  }

  static async deleteMessageById(req, res) {
    try {
      const id = req.params.id;
      const deletedMessage = await messageSchema.findByIdAndDelete(id);
      if (!deletedMessage) {
        throw new Error("id not found");
      }

      return res.status(200).json({
        status: "OK",
        data: deletedMessage,
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return res.status(404).json({
          status: "not found",
          message: "Blog not found",
        });
      }

      return res.status(404).json({
        status: "not found",
        message: "message not found",
      });
    }
  }
}
