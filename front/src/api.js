// src/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
<<<<<<< HEAD

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`); // Ajusta la ruta según tu backend
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
=======
>>>>>>> 16b7cee11c837688b9310dd3470549e967640c19
