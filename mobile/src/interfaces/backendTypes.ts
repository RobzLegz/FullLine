import {
  User,
  Category,
  Image as ImageType,
} from "../../../server/node_modules/prisma/prisma-client";

export interface ExUser extends User {
  images?: ExImage[];
}

export interface ExCategory extends Category {
  images?: ExImage[];
  percentage?: number;
}

export interface ExImage extends ImageType {
  categories?: ExCategory[];
  user?: ExUser;
}
