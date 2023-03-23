import axios from "axios";

export const BASE_URL = "http://dev01.haaukins.com:8080/v1/event/"

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: "http://dev01.haaukins.com:8080/v1/event"
});

export default apiClient;