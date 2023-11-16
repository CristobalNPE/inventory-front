import axios from "axios";
import { server } from "./createCategory";

export const getInfo = async () => {
  try {
    const info = await axios.get(`${server}/api/info`);
    return info.data;
  } catch (error) {
    console.error("Error fetching info:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
