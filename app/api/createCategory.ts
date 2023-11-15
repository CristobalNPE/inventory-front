import axios from "axios";

export const createCategory = async (name: string, description: string) => {
  const response = await axios.post("http://localhost:8080/api/categories", {
    name,
    description,
  });

  return response.data;
};
