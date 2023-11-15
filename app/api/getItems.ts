import axios from "axios";

export const getAllItems = async (currentPage: string) => {
  try {
    const items = await axios.get(
      `http://localhost:8080/api/items?page=${currentPage}`
    );
    console.log(items.data); // Log the response to the console
    return items.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
