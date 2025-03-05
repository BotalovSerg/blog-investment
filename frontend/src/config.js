import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const API_URL_AUTH = `http://${process.env.REACT_APP_API_URL}/auth`;

export async function apiAuth() {
  const accessToken = window.localStorage.getItem("ACCESS");
  const decoded = jwtDecode(accessToken);
  const userId = decoded.user_id;
  try {
    const response = await axios.get(`${API_URL_AUTH}/users/${userId}/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error, "ERRORR");
    if (error.response && error.response.status === 401) {
      const responseRef = await axios.post(`${API_URL_AUTH}/token/refresh/`, {
        refresh: window.localStorage.getItem("REFRESH"),
      });
      const { access } = responseRef.data;
      window.localStorage.setItem("ACCESS", access);
    }
  }
}

export const API_URL = `http://${process.env.REACT_APP_API_URL}/api`;

export async function apiService(path, params) {
  const response = await fetch(`${API_URL}/${path}`, params);
  const data = await response.json();

  return data;
}
