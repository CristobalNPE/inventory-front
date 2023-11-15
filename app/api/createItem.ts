import axios from "axios";

export const createItem = async (
  name: string,
  description: string,
  initialStock: number,
  price: number,
  categories: string[]
) => {
  try {
    const response = await axios.post("http://localhost:8080/api/items", {
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
