import axios from "axios";

export const getInfo = async () => {
  try {
    const info = await axios.get(`http://localhost:8080/api/info`);
    return info.data;
  } catch (error) {
    console.error("Error fetching info:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
