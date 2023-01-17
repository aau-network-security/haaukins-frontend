import axios from "axios";

export const BASE_URL = "http://localhost:8080/v1/event/"

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: "http://localhost:8080/v1/event"
});

export default apiClient;