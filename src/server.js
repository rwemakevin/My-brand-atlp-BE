import express from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/userroute.js";

const app = express();
connectDB;
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port ");
});
