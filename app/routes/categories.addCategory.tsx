import {
  Button,
  Divider,
  Group,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { NavLink, useFetcher, useSubmit } from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";
import { createCategory } from "~/api/createCategory";

// Move this from here
export type ItemResponse = {
  id: number;
  name: string;
  stock: number;
  price: number;
  url: string;
};
export type ItemRequest = {
  name: string;
  description: string;
  initialStock: number;
  price: number;
  categories: string[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Manager - Create Category" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function AddCategory() {
  const fetcher = useFetcher();

  const submit = useSubmit();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
      description: (value) =>
        value.length < 1 ? "Description cannot be empty" : null,
    },
  });

  return (
    <>
      <Divider my="xl" />
      <Title mt={10} mb={10} order={4}>
        Add new Category
      </Title>
      <fetcher.Form
        method="post"
        onSubmit={form.onSubmit((_v, e) => submit(e!.currentTarget))}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
          mb={20}
        >
          <TextInput
            size="md"
            variant="filled"
            label="Name"
            name="name"
            description="Name for the new Category"
            {...form.getInputProps("name")}
          />
          <TextInput
            size="md"
            variant="filled"
            label="Description"
            name="description"
            description="Description for the new Category"
            {...form.getInputProps("description")}
          />
        </SimpleGrid>

        <Group>
          <Button
            size="sm"
            variant="subtle"
            component={NavLink}
            to={".."}
            relative="path"
          >
            Discard
          </Button>

          <Button size="sm" leftSection={<IconCheck />} type="submit">
            Create
          </Button>
        </Group>
      </fetcher.Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const lastPage = url.searchParams.get("last") || "0";

  console.log(lastPage); //Good idea, not working
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  createCategory(name, description);

  return redirect(`/categories?page=${lastPage}`);
}
