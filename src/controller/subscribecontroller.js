import subscribeSchema from "../model/subscribeSchema.js";
import mongoose from "mongoose";

export default class subscribeController {
  static async addSubscriber(req, res) {
    try {
      const { fullname, email } = req.body;

      //Check if user subscribed
      const isSubscribed = await subscribeSchema.findOne({
        email: email,
      });

      if (isSubscribed) {
        return res.status(400).json({
          status: "fail",
          message: "User already subscribed",
        });
      } else {
        const addNewSubscriber = await subscribeSchema.create({
          name: fullname,
          email: email,
        });

        if (addNewSubscriber !== null) {
          return res.status(200).json({
            status: "Ok",
            data: await subscribeSchema.findById(addNewSubscriber._id),
          });
        }
      }
    } catch (e) {
      return res.status(500).json({
        status: "Error",
        message: e,
      });
    }
  }
}
