import {
  ActionIcon,
  Button,
  Center,
  Group,
  Pagination,
  Table,
  Title,
} from "@mantine/core";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Link, NavLink, useLoaderData, useNavigate } from "@remix-run/react";
import { IconId, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getAllItems } from "~/api/getItems";
import { type ItemResponse } from "./inventory_.addItem";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || "0";
  const itemsPage = await getAllItems(currentPage);

  return json({ itemsPage });
}

export default function Inventory() {
  const { itemsPage } = useLoaderData<typeof loader>();

  const [activePage, setPage] = useState(itemsPage.number + 1);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?page=${activePage - 1}`);
  }, [activePage, navigate]);

  const pageContent = itemsPage.content;

  const rows = pageContent.map((item: ItemResponse) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {" "}
        <ActionIcon
          variant="subtle"
          component={Link}
          to={`/inventory/${item.id}`}
        >
          <IconId />
        </ActionIcon>
      </Table.Td>
      <Table.Td>{item.id}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.stock}</Table.Td>
      <Table.Td>$ {item.price}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={1}>Inventory</Title>
      <Group my={20}>
        <Button component={NavLink} to={"addItem"} leftSection={<IconPlus />}>
          Add new Item
        </Button>
      </Group>
      <Table striped withTableBorder highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Stock</Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {itemsPage.totalPages >= 2 && (
        <Center>
          <Pagination
            size={"lg"}
            mt={5}
            withEdges
            value={activePage}
            onChange={setPage}
            total={itemsPage.totalPages}
          />
        </Center>
      )}
    </>
  );
}
