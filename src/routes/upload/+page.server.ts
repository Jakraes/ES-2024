import { writeFile } from "node:fs/promises";
import { extname } from "path";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const uploadedFile = formData?.get("file");
    const filename = `uploads/${"temp"}${extname(uploadedFile?.name)}`;
    await writeFile(filename, Buffer.from(await uploadedFile?.arrayBuffer()));

    return { file: filename };
  },
};
