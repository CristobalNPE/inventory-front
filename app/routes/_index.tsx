import { Card, Popover, SimpleGrid, Title } from "@mantine/core";
import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getInfo } from "~/api/getInfo";
import styles from "~/styles/dashboard.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Manager - Home" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const info = await getInfo();

  return json({ info });
}

export default function Index() {
  const { info } = useLoaderData<typeof loader>();

  return (
    <>
      <Title order={1}>Dashboard</Title>
      <SimpleGrid
        cols={{ base: 1, lg: 2, xl: 3 }}
        spacing={{ base: "md", sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
        className={styles.container}
      >
        <Card className={styles.card}>
          <span className={styles.number}>{info.numberOfItems}</span>
          <h1 className={styles.description}>Items currently on inventory</h1>
        </Card>
        <Card className={styles.card}>
          <span className={styles.number}>{info.totalStock}</span>
          <h1 className={styles.description}>Items currently on stock</h1>
        </Card>
        <Card className={styles.card}>
          <span className={styles.number}>$ {info.totalInventoryValue}</span>
          <h1 className={styles.description}>of Total Inventory Value</h1>
        </Card>
        <Card
          component={Link}
          to={`inventory/${info.itemWithMostStock.id}`}
          className={styles.card}
        >
          <span className={styles.number}>{info.itemWithMostStock.name}</span>
          <h1 className={styles.description}>is the Item with most Stock</h1>
        </Card>
        <Popover width={"fit-content"} position="right" withArrow shadow="md">
          <Popover.Target>
            <Card className={styles.card}>
              <span className={styles.number}>
                {info.itemsOnLowStock.length}
              </span>
              <h1 className={styles.description}>
                {info.itemsOnLowStock.length > 1 ? "Items" : "Item"} low on
                stock
              </h1>
            </Card>
          </Popover.Target>
          <Popover.Dropdown>
            {info.itemsOnLowStock.map((item) => (
              <Link className={styles.popoverLink} to={`inventory/${item.id}`}>
                {item.name} ({item.stock})
              </Link>
            ))}
          </Popover.Dropdown>
        </Popover>
        <Popover width={"fit-content"} position="right" withArrow shadow="md">
          <Popover.Target>
            <Card className={styles.card}>
              <span className={styles.number}>
                {info.categoriesWithNoItems.length}
              </span>
              <h1 className={styles.description}>Categories have no items</h1>
            </Card>
          </Popover.Target>
          <Popover.Dropdown>
            {info.categoriesWithNoItems.map((category) => (
              <Link
                className={styles.popoverLink}
                to={`categories/${category.id}`}
              >
                {category.name}
              </Link>
            ))}
          </Popover.Dropdown>
        </Popover>
      </SimpleGrid>
    </>
  );
}
