import { createResponse } from "../../lib/utils";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const countries = formData.getAll("country");

  if (!name) {
    return createResponse("Please Enter a Project Name", 400);
  }

  const selectedCountries = new Set(countries);

  await pb.admins.authWithPassword(
    "eanna@thevelvetcell.com",
    "emiliaromagna00"
  );
  const printers = await pb.collection("printers").getFullList({
    sort: "-created",
  });

  const printersToEmail = printers.filter((printer) =>
    selectedCountries.has(printer.country)
  );

  printersToEmail.forEach(async (printer) => {
    const newSubmission = {
      name,
      printer: printer.name,
      country: printer.country,
    };

    await pb.collection("submissions").create(newSubmission);
  });

  return createResponse("Job Added", 200);
  return redirect(`/quotes`, 307);
};
