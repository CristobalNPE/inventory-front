import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  type LoaderFunctionArgs,
  json,
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  NavLink,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { IconCheck } from "@tabler/icons-react";
import invariant from "tiny-invariant";
import { getAllCategoriesSummary } from "~/api/getCategories";
import { getItem } from "~/api/getItem";
import { updateItem } from "~/api/updateItem";

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
    { title: "Inventory Manager - Create Item" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.id, "Missing Id param");
  const categories = await getAllCategoriesSummary();
  const itemToEdit = await getItem(params.id);

  if (!itemToEdit) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ itemToEdit, categories });
}

export default function EditItem() {
  const { itemToEdit, categories } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const categoryOptions = categories.map((categoryObj) => categoryObj.name);

  const currentItemCategories = itemToEdit.categories.map(
    (categoryObj) => categoryObj.name
  );

  const submit = useSubmit();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: itemToEdit.name,
      description: itemToEdit.description,
      stock: itemToEdit.stock,
      price: itemToEdit.price,
      categories: currentItemCategories,
    },
    validate: {
      name: (value) =>
        value.length < 3 || value.length > 20
          ? "Name must have at least 3 letters and no more than 20"
          : null,
      description: (value) =>
        value.length < 1 ? "Description cannot be empty" : null,
      stock: (value) => (value === "" ? "Must define initial stock" : null),
      price: (value) => (value === "" ? "Must define a price" : null),
      categories: (value) =>
        value.length < 1 ? "Select at least 1 category" : null,
    },
  });

  return (
    <>
      <Title mb={20} order={1}>
        Add new Item
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
            description="Name for the new Item"
            {...form.getInputProps("name")}
          />
          <TextInput
            size="md"
            variant="filled"
            label="Description"
            name="description"
            description="Description for the new Item"
            {...form.getInputProps("description")}
          />

          <NumberInput
            size="md"
            variant="filled"
            label="Initial Stock"
            name="stock"
            description="Initial Stock for the new Item"
            allowNegative={false}
            allowDecimal={false}
            {...form.getInputProps("stock")}
          />
          <NumberInput
            size="md"
            variant="filled"
            label="Price"
            name="price"
            description="Price for the new Item"
            allowNegative={false}
            decimalScale={2}
            {...form.getInputProps("price")}
          />
          <MultiSelect
            searchable
            hidePickedOptions
            maxDropdownHeight={200}
            size="md"
            label="Categories"
            description="Choose the categories for this item"
            placeholder="Pick category"
            name="categories"
            data={categoryOptions}
            {...form.getInputProps("categories")}
          />
        </SimpleGrid>

        <Group>
          <Button
            size="md"
            variant="subtle"
            component={NavLink}
            to={".."}
            relative="path"
          >
            Discard
          </Button>
          <Button size="md" leftSection={<IconCheck />} type="submit">
            Update
          </Button>
        </Group>
      </fetcher.Form>
    </>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.id, "Missing ID param");
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const stock = parseInt(formData.get("stock") as string);
  const price = parseFloat(formData.get("price") as string);
  const categories = (formData.get("categories") as string).split(",");

  updateItem(params.id, name, description, stock, price, categories);

  return redirect("/inventory");
}
