const SERVER_IP = "192.168.8.224";
const PORT = 5000;
const BASE_URL = `http://${SERVER_IP}:${PORT}`;
// const BASE_URL = "https://api.spotloc.lv";

export const API_BASE = `${BASE_URL}/api`;

export const IMAGE_BASE = `${API_BASE}/image`;
export const CATEGORY_BASE = `${API_BASE}/category`;
export const USER_BASE = `${API_BASE}/user`;
export const UPLOAD_BASE = `${API_BASE}/upload`;

export const USER_INFO_ROUTE = `${USER_BASE}/info`;
