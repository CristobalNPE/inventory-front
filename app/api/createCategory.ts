import axios from "axios";


export const server = "https://inventory-app-api-final.fly.dev"

export const createCategory = async (name: string, description: string) => {
  const response = await axios.post(`${server}/api/categories`, {
    name,
    description,
  });

  return response.data;
};
