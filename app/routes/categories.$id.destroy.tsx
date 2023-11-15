import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteCategory } from "~/api/deleteCategory";

export async function action({ params }: LoaderFunctionArgs) {
  invariant(params.id, "Missing id param");
  await deleteCategory(params.id);
  return redirect("/categories");
}
