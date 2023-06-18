// const SERVER_IP = "192.168.8.224";
// const PORT = 5000;
// const BASE_URL = `http://${SERVER_IP}:${PORT}`;
const BASE_URL = "https://api.spotloc.lv";

export const API_BASE = `${BASE_URL}/api/v1`;
export const API_BASE_V2 = `${BASE_URL}/api/v2`;

export const EVENT_BASE = `${API_BASE}/events`;
export const FEED_BASE = `${API_BASE_V2}/feed`;
export const CATEGORY_BASE = `${API_BASE}/categories`;
export const POST_BASE = `${API_BASE}/posts`;
export const ORGANIZER_BASE = `${API_BASE}/partners`;
export const USER_BASE = `${API_BASE}/user`;
export const CITY_BASE = `${API_BASE_V2}/cities`;
export const COUNTRY_BASE = `${API_BASE_V2}/countries`;
export const SPOT_BASE = `${API_BASE_V2}/spots`;
export const NEARBY_SEARCH_BASE = `${API_BASE_V2}/nearby`;

export const EVENT_BASE_V2 = `${API_BASE_V2}/events`;
export const USER_BASE_V2 = `${API_BASE_V2}/user`;

export const REGISTER_ROUTE = `${USER_BASE}/register`;
export const LOGIN_ROUTE = `${USER_BASE}/login`;
export const USER_INFO_ROUTE = `${USER_BASE_V2}/info`;
export const USER_FEED_ROUTE = `${USER_BASE_V2}/feed`;
export const CHANGE_COUNTRY_ROUTE = `${USER_BASE_V2}/change_country`;
export const CHANGE_CITY_ROUTE = `${USER_BASE_V2}/change_city`;
export const REGISTER_PUSH_NOTIFICATIONS_ROUTE = `${USER_BASE_V2}/notifications`;

export const EVENT_SEARCH_ROUTE = `${EVENT_BASE}/search`;
export const MAP_EVENT_ROUTE = `${EVENT_BASE_V2}/map_events`;
export const CLICK_TICKET_ROUTE = `${EVENT_BASE}/ticket_click`;
export const GET_MANY_FROM_IDS_ROUTE = `${EVENT_BASE}/event_list`;
export const SAVED_EVENT_ROUTE = `${EVENT_BASE}/saved`;
export const SAVE_EVENT_ROUTE = `${EVENT_BASE_V2}/save`;
export const UNSAVE_EVENT_ROUTE = `${EVENT_BASE_V2}/unsave`;

export const SEARCH_CATEGORIES_ROUTE = `${CATEGORY_BASE}/search`;
export const SPOT_CATEGORIES_ROUTE = `${CATEGORY_BASE}/spot`;

export const MAP_SPOT_ROUTE = `${SPOT_BASE}/map`;
export const CLICK_SPOT_WEBSITE_ROUTE = `${SPOT_BASE}/ticket_click`;

export const FEED_EVENT_ROUTE = `${FEED_BASE}/events`;
