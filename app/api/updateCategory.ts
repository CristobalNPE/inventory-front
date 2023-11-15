import axios from "axios";

export const updateCategory = async (
  id: string,
  name: string,
  description: string
) => {
  const response = await axios.patch(
    `http://localhost:8080/api/categories/${id}`,
    {
      name,
      description,
    }
  );

  return response.data;
};
