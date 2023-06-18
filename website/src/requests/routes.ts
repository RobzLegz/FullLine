const SERVER_ROUTE = process.env.NEXT_PUBLIC_SERVER_URL
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "https://spotloc-api.herokuapp.com";

export const BASE_API_ROUTE = `${SERVER_ROUTE}/api/v1`;
export const BASE_API_ROUTE_V2 = `${SERVER_ROUTE}/api/v2`;
export const PUBLIC_API_BASE_ROUTE = `${SERVER_ROUTE}/api/public`;

export const USER_BASE = `${BASE_API_ROUTE}/user`;
export const SITEMAP_BASE = `${PUBLIC_API_BASE_ROUTE}/sitemap`;
export const PRODUCT_BASE = `${BASE_API_ROUTE_V2}/products`;
export const ADMIN_BASE = `${BASE_API_ROUTE}/partner`;
export const EVENT_BASE = `${BASE_API_ROUTE}/events`;
export const EVENT_BASE_V2 = `${BASE_API_ROUTE_V2}/events`;
export const CATEGORIES_BASE = `${BASE_API_ROUTE}/categories`;
export const UPLOAD_BASE = `${BASE_API_ROUTE}/upload`;
export const CONTACT_BASE = `${BASE_API_ROUTE}/contact`;
export const SPOT_BASE = `${BASE_API_ROUTE_V2}/spots/partner`;
export const COUNTRY_BASE = `${BASE_API_ROUTE_V2}/countries`;
export const PRODUCT_CATEGORIES_BASE = `${BASE_API_ROUTE_V2}/product_categories`;
export const CITY_BASE = `${BASE_API_ROUTE_V2}/cities`;

export const REGISTER_ADMIN_ROUTE = `${ADMIN_BASE}/register`;
export const LOGIN_ADMIN_ROUTE = `${ADMIN_BASE}/login`;
export const ADMIN_INFO_ROUTE = `${ADMIN_BASE}/info`;
export const ADMIN_CHART_ROUTE = `${ADMIN_BASE}/chart`;
export const ADMIN_SPOT_ROUTE = `${ADMIN_BASE}/spots`;
export const ADMIN_EVENT_ROUTE = `${ADMIN_BASE}/events`;
export const ADMIN_POPULAR_ROUTE = `${ADMIN_BASE}/popular`;

export const GET_CATEGORIES_ROUTE = `${CATEGORIES_BASE}/all`;
export const REGISTER_HACKATHON_ROUTE = `${USER_BASE}/hackathon`;

export const EVENT_ADMIN_ROUTE = `${EVENT_BASE}/partner`;
export const EVENT_ADMIN_ROUTE_V2 = `${EVENT_BASE_V2}/partner`;
export const EVENT_TITLE_ROUTE = `${EVENT_BASE}/title`;

export const GET_COUNTRIES_ROUTE = `${COUNTRY_BASE}/partner`;
export const GET_CITIES_ROUTE = `${CITY_BASE}/partner`;
