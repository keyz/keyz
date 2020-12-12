import * as fs from "fs";
import { generateSvgString } from "../src/main";

const OUTPUT_PATH = new URL("../../thonk.svg", import.meta.url).pathname;

async function main() {
  const output = await generateSvgString();

  await fs.promises.writeFile(OUTPUT_PATH, output, "utf-8");

  console.log(`Done! Wrote to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
