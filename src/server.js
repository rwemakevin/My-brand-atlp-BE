import express from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
import dotenv from "dotenv";
import user from "./routes/userroute.js";
import message from "./routes/messageroute.js";

const app = express();
connectDB;
app.use(cors());
app.use(express.json());
app.use("/api", user);
app.use("/api", message);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port ");
});
