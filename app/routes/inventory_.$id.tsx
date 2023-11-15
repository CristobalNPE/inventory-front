import { Badge, Button, Card, Group, Space, Text, Title } from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  IconArrowLeft,
  IconEditCircle,
  IconTrashXFilled,
} from "@tabler/icons-react";
import invariant from "tiny-invariant";
import { getItem } from "~/api/getItem";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.id, "Missing id param");
  const item = await getItem(params.id);
  return json({ item });
}

function Item() {
  const { item } = useLoaderData<typeof loader>();

  const categoryBadges = item.categories.map((category) => (
    <Badge size="lg" key={category.id}>
      {category.name}
    </Badge>
  ));

  return (
    <>
      <Button
        leftSection={<IconArrowLeft />}
        mb={20}
        relative="path"
        component={Link}
        to={"/inventory"}
        variant="light"
      >
        Go Back
      </Button>

      <Card w={"fit-content"} mb={20}>
        <Title>{item.name}</Title>
        <Space h="xl" />
        <Text size="lg">{item.description}</Text>
        <Space h="md" />
        <Text size="lg">{item.stock} unit(s) in stock.</Text>
        <Space h="md" />
        <Text size="xl">$ {item.price}</Text>
        <Space h="md" />
        <Group mt={10}>{categoryBadges}</Group>
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
        <Form>
          <Button
            component={Link}
            to={"edit"}
            leftSection={<IconEditCircle />}
            variant="filled"
            type="submit"
          >
            Edit
          </Button>
        </Form>
      </Group>
    </>
  );
}

export default Item;
