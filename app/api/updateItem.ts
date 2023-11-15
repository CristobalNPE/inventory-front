import axios from "axios";

export const updateItem = async (
  id: string,
  name: string,
  description: string,
  initialStock: number,
  price: number,
  categories: string[]
) => {
  const response = await axios.patch(`http://localhost:8080/api/items/${id}`, {
    name,
    description,
    initialStock,
    price,
    categories,
  });

  return response.data;
};
