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
  type LoaderFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/node";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { IconId, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getAllCategories } from "~/api/getCategories";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Manager - Categories" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || "0";
  const categoriesPage = await getAllCategories(currentPage);

  return json({ categoriesPage });
}

export default function Categories() {
  const { categoriesPage } = useLoaderData<typeof loader>();
  const [activePage, setPage] = useState(categoriesPage.number + 1);

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`?page=${activePage - 1}`);
  }, [activePage, navigate]);

  const pageContent = categoriesPage.content;

  const rows = pageContent.map((category) => (
    <Table.Tr key={category.id}>
      <Table.Td>
        <ActionIcon
          component={Link}
          to={`${category.id}?page=${activePage - 1}`}
          variant="subtle"
        >
          <IconId />
        </ActionIcon>
      </Table.Td>
      <Table.Td>{category.id}</Table.Td>
      <Table.Td>{category.name}</Table.Td>
      <Table.Td>{category.description}</Table.Td>
      <Table.Td>{category.items}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={1}>Categories</Title>

      <Group my={20}>
        <Button
          component={NavLink}
          to={`addCategory?page=${activePage - 1}?last=${
            categoriesPage.totalPages - 1
          }`}
          leftSection={<IconPlus />}
        >
          Add new Category
        </Button>
      </Group>
      <Table striped withTableBorder highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Total Items</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {categoriesPage.totalPages >= 2 && (
        <Center>
          <Pagination
            size={"lg"}
            mt={5}
            withEdges
            value={activePage}
            onChange={setPage}
            total={categoriesPage.totalPages}
          />
        </Center>
      )}
      <div>
        <Outlet />
      </div>
    </>
  );
}
