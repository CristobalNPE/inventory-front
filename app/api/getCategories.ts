import axios from "axios";
import { server } from "./createCategory";

export const getAllCategories = async (currentPage: string) => {
  try {
    const categories = await axios.get(
      `${server}/api/categories?page=${currentPage}`
    );
    return categories.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const getAllCategoriesSummary = async () => {
  try {
    const categories = await axios.get(
      `${server}/api/categories/all`
    );
    return categories.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
