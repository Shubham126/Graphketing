import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const fetchUsers = async (params) => {
  try {
    const res = await axios.get(API_URL, { params });
    return res.data;
  } catch (error) {
    console.error("API error:", error);
    return { users: [], total: 0 };
  }
};