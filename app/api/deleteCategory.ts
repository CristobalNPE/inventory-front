import axios from "axios";
import { server } from "./createCategory";

export const deleteCategory = async (id: string) => {
  try {
    await axios.delete(`${server}/api/categories/${id}`);
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
