import {
  User,
  Category,
  Event,
  City,
  Partner,
  View,
  WebsiteVisit,
  Spot,
  Product,
  ProductCategory,
} from "./backendSafe";

export interface ExProduct extends Product {
  category: ProductCategory;
}

export interface ExSpot extends Spot {
  partner?: ExPartner;
  products?: Product[];
  categories?: Category[];
  city?: ExCity;
  events?: ExEvent[];
}

export interface ExView extends View {
  event?: ExEvent;
  user?: ExUser;
}

export interface ExWebsiteVisit extends WebsiteVisit {
  event?: ExEvent;
  user?: ExUser;
}

export interface ExPartner extends Partner {
  events?: ExEvent[];
}

export interface ExUser extends User {
  saved_events?: ExEvent[];
  views?: ExView[];
  website_visits?: ExWebsiteVisit[];
}

export interface ExCategory extends Category {
  events?: ExEvent[];
}

export interface ExEvent extends Event {
  categories?: ExCategory[];
  liked_users?: ExUser[];
  event_views?: ExView[];
  website_visits?: ExWebsiteVisit[];
}

export interface ExCity extends City {
  events?: ExEvent[];
  _count?: {
    events?: number;
  };
}
