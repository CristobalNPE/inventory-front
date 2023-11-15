import axios from "axios";

export const getItem = async (id: string) => {
  try {
    const item = await axios.get(`http://localhost:8080/api/items/${id}`);
    console.log(item.data); // Log the response to the console
    return item.data;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
