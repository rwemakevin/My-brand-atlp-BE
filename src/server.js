import express from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
import user from "./routes/userroute.js";
import message from "./routes/messageroute.js";
import blog from "./routes/blogroute.js";
import subscribe from "./routes/subscriberoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../transform.js";

const app = express();
connectDB;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI setup
const swaggerUiOptions = {
  customCss: ".authorize-btn { display: inline !important; }",
  customSiteTitle: "Your API Documentation",
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", user);
app.use("/api", message);
app.use("/api", blog);
app.use("/api", subscribe);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server listening on port " + process.env.PORT);
});

export { app, server };
