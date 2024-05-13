import axios from "axios";
// set API endpoint for the daemon
export const BASE_URL = "http://dev01.haaukins.com:8080/v1/event/"

const apiClient = axios.create({
// set API endpoint for the daemon 
  baseURL: "http://dev01.haaukins.com:8080/v1/event"
});

export default apiClient;