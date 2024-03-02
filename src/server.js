import express from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
import user from "./routes/userroute.js";
import message from "./routes/messageroute.js";
import blog from "./routes/blogroute.js";

const app = express();
connectDB;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", user);
app.use("/api", message);
app.use("/api", blog);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port ");
});
