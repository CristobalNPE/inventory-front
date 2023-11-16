import axios from "axios";
import { server } from "./createCategory";

export const getCategory = async (id: string) => {
  try {
    const category = await axios.get(
      `${server}/api/categories/${id}`
    );
    return category.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
