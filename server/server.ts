import cors from "cors";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
import { cacheCategories } from "./src/scripts/cacheCategories";

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

import { userRouter as userRouterV2 } from "./api/v2/user/router";
import { eventRouter as eventRouterV2 } from "./api/v2/events/router";
import { countryRouter as countryRouterV2 } from "./api/v2/country/router";
import { cityRouter as cityRouterV2 } from "./api/v2/city/router";
import { spotRouter as spotRouterV2 } from "./api/v2/spot/router";
import { productRouter as productRouterV2 } from "./api/v2/product/router";
import { productCategoryRouter as productCategoryRouterV2 } from "./api/v2/productCategory/router";
import { nearbyRouter as nearbyRouterV2 } from "./api/v2/nearby/router";
import { feedRouter as feedRouterV2 } from "./api/v2/feed/router";

app.use("/api/v2/user", userRouterV2);
app.use("/api/v2/events", eventRouterV2);
app.use("/api/v2/cities", cityRouterV2);
app.use("/api/v2/countries", countryRouterV2);
app.use("/api/v2/spots", spotRouterV2);
app.use("/api/v2/products", productRouterV2);
app.use("/api/v2/feed", feedRouterV2);
app.use("/api/v2/nearby", nearbyRouterV2);
app.use("/api/v2/product_categories", productCategoryRouterV2);

import { userRouter as userRouterV1 } from "./api/v1/user/router";
import { eventRouter as eventRouterV1 } from "./api/v1/events/router";
import { categoryRouter as categoryRouterV1 } from "./api/v1/category/router";
import { cityRouter as cityRouterV1 } from "./api/v1/city/router";
import { partnerRouter as partnerRouterV1 } from "./api/v1/partner/router";
import { uploadRouter as uploadRouterV1 } from "./api/v1/upload/router";
import { contactRouter as contactRouterV1 } from "./api/v1/contact/router";

app.use("/api/v1/user", userRouterV1);
app.use("/api/v1/partner", partnerRouterV1);
app.use("/api/v1/cities", cityRouterV1);
app.use("/api/v1/events", eventRouterV1);
app.use("/api/v1/categories", categoryRouterV1);
app.use("/api/v1/upload", uploadRouterV1);
app.use("/api/v1/contact", contactRouterV1);

import { userRouter as userRouterV0 } from "./api/v0/user/router";
import { eventRouter as eventRouterV0 } from "./api/v0/events/router";
import { categoryRouter as categoryRouterV0 } from "./api/v0/category/router";
import { cityRouter as cityRouterV0 } from "./api/v0/city/router";

app.use("/api/user", userRouterV0);
app.use("/api/cities", cityRouterV0);
app.use("/api/events", eventRouterV0);
app.use("/api/categories", categoryRouterV0);

import { publicEventRouter } from "./api/public/events/router";
import { sitemapRouter } from "./api/public/sitemap/router";

app.use("/api/public/events", publicEventRouter);
app.use("/api/public/sitemap", sitemapRouter);

import { userRouter as userRouterAdmin } from "./api/admin/user/router";
import { cityRouter as cityRouterAdmin } from "./api/admin/city/router";
import { partnerRouter as partnerRouterAdmin } from "./api/admin/partner/router";
import { countryRouter as countryRouterAdmin } from "./api/admin/country/router";
import { categoryRouter as categoryRouterAdmin } from "./api/admin/category/router";
import { eventRouter as eventRouterAdmin } from "./api/admin/events/router";
import { spotRouter as spotRouterAdmin } from "./api/admin/spot/router";
import { notificationRouter as notificationRouterAdmin } from "./api/admin/notification/router";

app.use("/api/admin/user", userRouterAdmin);
app.use("/api/admin/city", cityRouterAdmin);
app.use("/api/admin/partner", partnerRouterAdmin);
app.use("/api/admin/country", countryRouterAdmin);
app.use("/api/admin/category", categoryRouterAdmin);
app.use("/api/admin/event", eventRouterAdmin);
app.use("/api/admin/spot", spotRouterAdmin);
app.use("/api/admin/notification", notificationRouterAdmin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

cacheCategories();
setInterval(cacheCategories, 8 * 60 * 1000);

// generateUrls();
// setInterval(generateUrls, 24 * 60 * 60 * 1000);
