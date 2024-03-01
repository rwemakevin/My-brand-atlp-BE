import messageSchema from "../model/messageSchema.js";

export default class messageController {
  static async sendMessage(req, res) {
    try {
      const { fullname, email, message } = req.body;
      const insertMessage = await messageSchema.create({
        fullName: fullname,
        email: email,
        messageContent: message,
      });

      return res.status(200).json({
        status: "Success",
        message: "Message sent succesfully",
        data: insertMessage,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
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
        status: "Fail",
        message: "Something went wrong: " + error,
      });
    }
  }
}
