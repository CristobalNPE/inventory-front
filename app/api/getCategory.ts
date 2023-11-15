import axios from "axios";

export const getCategory = async (id: string) => {
  try {
    const category = await axios.get(
      `http://localhost:8080/api/categories/${id}`
    );
    return category.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
