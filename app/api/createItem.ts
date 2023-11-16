import axios from "axios";
import { server } from "./createCategory";

export const createItem = async (
  name: string,
  description: string,
  initialStock: number,
  price: number,
  categories: string[]
) => {
  try {
    const response = await axios.post(`${server}/api/items`, {
      name,
      description,
      initialStock,
      price,
      categories,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
