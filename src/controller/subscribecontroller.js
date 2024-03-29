import subscribeSchema from "../model/subscribeSchema.js";
import mongoose from "mongoose";

export default class subscribeController {
  static async addSubscriber(req, res) {
    try {
      const { fullname, email } = req.body;

      //Check if user subscribed
      const isSubscribed = await subscribeSchema.findOne({
        email: email.toLowerCase(),
      });

      if (isSubscribed) {
        return res.status(409).json({
          status: "fail",
          message: "User already subscribed",
        });
      } else {
        const addNewSubscriber = await subscribeSchema.create({
          name: fullname,
          email: email.toLowerCase(),
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

  static async viewSubscribers(req, res) {
    try {
      const allSubscribers = await subscribeSchema.find();
      if (allSubscribers !== null) {
        return res.status(200).json({
          status: "success",
          totalSubscribers: allSubscribers.length,
          data: allSubscribers,
        });
      } else {
        return res.status(404).json({
          status: "not found",
          message: "Something went wrong",
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "fail",
        message: e,
      });
    }
  }

  static async getCountofAllSubscribers(req, res) {
    try {
      const count = await subscribeSchema.countDocuments();
      return res.status(200).json({
        status: "Ok",
        data: count,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
