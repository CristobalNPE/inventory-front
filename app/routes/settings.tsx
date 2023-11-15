import { Switch, Title, useMantineColorScheme } from "@mantine/core";
import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Inventory Manager - Settings" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Settings() {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <Title mb={20} order={1}>
        Settings
      </Title>
      <Switch
        onClick={toggleColorScheme}
        defaultChecked
        label="Dark Mode"
        size="xl"
      />
    </>
  );
}
