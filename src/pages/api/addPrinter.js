import { createResponse } from "../../lib/utils";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const country = formData.get("country");
  const email = formData.get("email");

  if (!name) {
    return createResponse("Please Enter a Name", 400);
  }

  const newPrinter = {
    name,
    email,
    country,
  };

  await pb.admins.authWithPassword(
    "eanna@thevelvetcell.com",
    "emiliaromagna00"
  );

  await pb.collection("printers").create(newPrinter);

  return createResponse("Printer Added", 200);
  //   return redirect(`/quotes`, 307);
};
