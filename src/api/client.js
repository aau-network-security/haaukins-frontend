import axios from "axios";
// set API endpoint for the daemon
export const BASE_URL = "https://api.haaukins.dk/v1/event/"

const apiClient = axios.create({
// set API endpoint for the daemon 
  baseURL: "https://api.haaukins.dk/v1/event"
});

export default apiClient;