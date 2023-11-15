import axios from "axios";

export const getAllCategories = async (currentPage: string) => {
  try {
    const categories = await axios.get(
      `http://localhost:8080/api/categories?page=${currentPage}`
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
      `http://localhost:8080/api/categories/all`
    );
    return categories.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
