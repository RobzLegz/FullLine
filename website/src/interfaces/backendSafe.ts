/**
 * Model EventDate
 *
 */
export type EventDate = {
  date: Date;
  time: string | null;
};

/**
 * Model Location
 *
 */
export type Location = {
  city: string | null;
  country: string | null;
  address: string | null;
  location: string | null;
  lat: number | null;
  lng: number | null;
  geo: GeoPoint | null;
};

/**
 * Model GeoPoint
 *
 */
export type GeoPoint = {
  type: string;
  coordinates: number[];
};

/**
 * Model EventImage
 *
 */
export type EventImage = {
  src: string;
  alt: string | null;
};

/**
 * Model WorkingHours
 *
 */
export type WorkingHours = {
  monday: WorkingHour;
  tuesday: WorkingHour;
  wednesday: WorkingHour;
  thursday: WorkingHour;
  friday: WorkingHour;
  saturday: WorkingHour;
  sunday: WorkingHour;
};

/**
 * Model WorkingHour
 *
 */
export type WorkingHour = {
  start_time: string;
  end_time: string;
};

/**
 * Model Settings
 *
 */
export type Settings = {
  theme: string;
  push_notifications: boolean;
  language: string;
};

/**
 * Model Search
 *
 */
export type Search = {
  id: string;
  query: string | null;
  city: string | null;
  start_date: Date | null;
  end_date: Date | null;
  category_ids: string[];
  user_id: string;
  created_at: Date;
};

/**
 * Model Partner
 *
 */
export type Partner = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  website_url: string | null;
  password: string;
  description: string | null;
  logo: string | null;
  verified: boolean;
};

/**
 * Model User
 *
 */
export type User = {
  id: string;
  email: string | null;
  name: string | null;
  password: string | null;
  avatar: string | null;
  username: string | null;
  bio: string | null;
  last_login: Date;
  email_verified: boolean;
  phone_number_verified: boolean;
  subscribed_to_newsletter: boolean;
  phone_number: string | null;
  role: number;
  created_at: Date;
  updated_at: Date;
  saved_event_ids: string[];
  events: string[];
  cityId: string;
  countryId: string;
  school: string | null;
  grade: string | null;
  question: string | null;
  settings: Settings;
};

/**
 * Model View
 *
 */
export type View = {
  id: string;
  userId: string | null;
  eventId: string | null;
  spotId: string | null;
  partnerId: string | null;
  categoryId: string | null;
  created_at: Date;
};

/**
 * Model WebsiteVisit
 *
 */
export type WebsiteVisit = {
  id: string;
  userId: string | null;
  eventId: string | null;
  spotId: string | null;
  created_at: Date;
};

/**
 * Model Category
 *
 */
export type Category = {
  id: string;
  name: string;
  type: string;
  en_name: string | null;
  color: string;
  description: string | null;
  verified: boolean;
  keywords: string[];
  icon: string | null;
  spot_ids: string[];
  event_ids: string[];
  search_ids: string[];
};

/**
 * Model Spot
 *
 */
export type Spot = {
  id: string;
  name: string;
  description: string | null;
  category_ids: string[];
  cityId: string | null;
  website_url: string | null;
  email: string | null;
  phone_number: string | null;
  priority: number;
  partnerId: string | null;
  verified: boolean;
  spotloc_url: string | null;
  banner: EventImage | null;
  location: Location;
  working_hours: WorkingHours | null;
  cover: EventImage | null;
  images: EventImage[];
  created_at: Date;
  updated_at: Date;
};

/**
 * Model Event
 *
 */
export type Event = {
  id: string;
  title: string;
  price: number | null;
  start_date: Date | null;
  end_date: Date | null;
  start_time: string | null;
  end_time: string | null;
  ticket_url: string | null;
  website_urls: string[];
  info: string[];
  event_url: string | null;
  priority: number;
  all_dates: EventDate[];
  location: Location;
  images: EventImage[];
  cover: EventImage | null;
  created_at: Date;
  verified: boolean;
  updated_at: Date;
  category_ids: string[];
  saved_users_ids: string[];
  cityId: string | null;
  partnerId: string | null;
  countryId: string | null;
  view_count: number;
  spotId: string | null;
};

/**
 * Model Country
 *
 */
export type Country = {
  id: string;
  name: string;
  verified: boolean;
  en_name: string | null;
  short: string | null;
  flag: string | null;
};

/**
 * Model City
 *
 */
export type City = {
  id: string;
  name: string;
  priority: number;
  lat: number | null;
  lng: number | null;
  verified: boolean;
  countryId: string | null;
};

/**
 * Model Product
 *
 */
export type Product = {
  id: string;
  title: string;
  description: string;
  spotId: string | null;
  price: number;
  categoryId: string | null;
  cover: EventImage | null;
  images: EventImage[];
};

/**
 * Model ProductCategory
 *
 */
export type ProductCategory = {
  id: string;
  name: string;
  en_name: string | null;
  color: string;
  description: string | null;
  spotId: string | null;
};
