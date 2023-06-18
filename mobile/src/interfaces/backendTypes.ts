import {
  User,
  Category,
  Event,
  City,
  Partner,
  Product,
  ProductCategory,
  Country,
  Spot,
} from "../../../server/node_modules/prisma/prisma-client";

export interface ExPartner extends Partner {
  events?: ExEvent[];
  ticket_masters?: ExUser[];
}

export interface ExUser extends User {
  saved_events?: ExEvent[];
}

export interface ExCategory extends Category {
  events?: ExEvent[];
}

export interface ExSpot extends Spot {
  categories?: ExCategory[];
  products?: Product[];
  partner?: ExPartner;
  city?: ExCity;
  events?: ExEvent[];
  _count?: {
    spot_views?: number;
  };
}

export interface ExEvent extends Event {
  categories?: ExCategory[];
  liked_users?: ExUser[];
  partner?: ExPartner;
  city?: ExCity;
  _count?: {
    event_views?: number;
  };
}

export interface ExCountry extends Country {
  cities?: ExCity[];
}

export interface ExCity extends City {
  events?: ExEvent[];
  _count?: {
    events?: number;
  };
}
