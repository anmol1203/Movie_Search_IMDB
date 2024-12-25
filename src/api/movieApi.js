import axios from "axios";
import { BASE_URL, API_KEY } from "./config";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const fetchMovieDetails = async (id) => {
  try {
    const response = await apiClient.get("", {
      params: {
        i: id,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID: ${id}`, error);
    throw error;
  }
};

export const fetchMoviesBySearch = async (query) => {
  try {
    const response = await apiClient.get("", {
      params: {
        s: query,
        apikey: API_KEY,
      },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
