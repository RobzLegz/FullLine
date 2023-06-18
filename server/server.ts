import cors from "cors";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
import { userRouter } from "./api/user/router";
import { imageRouter } from "./api/image/router";
import { categoryRouter } from "./api/category/router";

dotenv.config();

const corsCredentials = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://spotloc.lv", "https://cms.spotloc.lv"]
      : ["http://localhost:3000"],
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

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/category", categoryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
