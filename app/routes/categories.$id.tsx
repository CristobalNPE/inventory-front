import {
  Button,
  Card,
  Divider,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { IconEditCircle, IconTrashXFilled, IconX } from "@tabler/icons-react";
import invariant from "tiny-invariant";
import { getCategory } from "~/api/getCategory";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.id, "Missing id param");
  const category = await getCategory(params.id);
  return json({ category });
}

function Category() {
  const { category } = useLoaderData<typeof loader>();

  return (
    <>
      <Divider my="xl" />
      <Button
        leftSection={<IconX />}
        mb={20}
        relative="path"
        component={Link}
        to={".."}
        variant="transparent"
      >
        Close details
      </Button>

      <Card w={"fit-content"} mb={20}>
        <Title order={2}>{category.name}</Title>
        <Space h="lg" />
        <Text size="lg">{category.description}</Text>
        <Space h="md" />
        <Text size="lg">{category.items} items under this category.</Text>
      </Card>

      <Group>
        <Form action="destroy" method="post">
          <Button
            leftSection={<IconTrashXFilled />}
            variant="subtle"
            type="submit"
          >
            Delete
          </Button>
        </Form>

        <Button
          component={Link}
          to={"edit"}
          leftSection={<IconEditCircle />}
          variant="filled"
          type="submit"
        >
          Update
        </Button>
      </Group>
    </>
  );
}

export default Category;
