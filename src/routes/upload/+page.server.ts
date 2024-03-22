import { writeFile } from "node:fs/promises";
import { extname } from "path";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const filename = `uploads/${"temp.csv"}`;

    if (formData.get("file") != null) {
      const uploadedFile = formData?.get("file");
      await writeFile(filename, Buffer.from(await uploadedFile?.arrayBuffer()));
    } else if (formData.get("text") != null) {
      /*
      fetch(formData.get("text"))
        .then((response) => response.text())
        .then(async (data) => await writeFile(filename, data));
      */
    }
  },
};
