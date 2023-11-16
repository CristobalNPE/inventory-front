import axios from "axios";
import { server } from "./createCategory";

export const updateCategory = async (
  id: string,
  name: string,
  description: string
) => {
  const response = await axios.patch(
    `${server}/api/categories/${id}`,
    {
      name,
      description,
    }
  );

  return response.data;
};
