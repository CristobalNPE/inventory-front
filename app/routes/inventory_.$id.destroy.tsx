import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteItem } from "~/api/deleteItem";

export async function action({ params }: LoaderFunctionArgs) {
  invariant(params.id, "Missing id param");
  await deleteItem(params.id);
  return redirect("/");
}
