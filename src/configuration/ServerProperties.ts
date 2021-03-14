const HOST = "192.168.31.92";
//const HOST = "http://androidchatbotserver.herokuapp.com";
const PORT = 8080;

//Server links
export const SERVER_LINK = `http://${HOST}:${PORT}`;
//export const SERVER_LINK = `${HOST}`;
export const API_LINK = `${SERVER_LINK}/api`;
export const USERS_API_LINK = `${API_LINK}/user`;
export const MESSAGES_API_LINK = `${API_LINK}/message`;
export const CHATS_API_LINK = `${API_LINK}/chat`;
export const HEALTH_CHECK_API_LINK = `${API_LINK}/hc`;
export const TOPICS_API_LINK = `${API_LINK}/topic`;
export const CONFIGS_API_LINK = `${API_LINK}/config`;
