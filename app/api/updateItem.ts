import axios from "axios";
import { server } from "./createCategory";

export const updateItem = async (
  id: string,
  name: string,
  description: string,
  initialStock: number,
  price: number,
  categories: string[]
) => {
  const response = await axios.patch(`${server}/api/items/${id}`, {
    name,
    description,
    initialStock,
    price,
    categories,
  });

  return response.data;
};
