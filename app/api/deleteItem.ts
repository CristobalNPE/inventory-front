import axios from "axios";

export const deleteItem = async (id: string) => {
  try {
    await axios.delete(`http://localhost:8080/api/items/${id}`);
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
