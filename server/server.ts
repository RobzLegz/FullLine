import cors from "cors";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";

dotenv.config();

const corsCredentials = {
  credentials: true,
  origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
};

const app = express();
app.use(express.json());
app.use(cors(corsCredentials));
app.use(helmet());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

import { userRouter } from "./api/user/router";
import { imageRouter } from "./api/image/router";
import { categoryRouter } from "./api/category/router";
import { uploadRouter } from "./api/upload/router";

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/category", categoryRouter);
app.use("/api/upload", uploadRouter);

import { categoryRouter as adminCategoryRouter } from "./api/admin/category/router";

app.use("/api/admin/category", adminCategoryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

export const API_VERSION: "V1" = "V1";