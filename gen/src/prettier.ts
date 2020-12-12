import * as prettier from "prettier";
import pluginHtml from "prettier/plugins/html";

export async function formatSvg(input: string): Promise<string> {
  return await prettier.format(input, {
    parser: "html",
    plugins: [pluginHtml],
  });
}

// This is a noop, only for Prettier to enable embedded language formatting
function identity(
  template: TemplateStringsArray,
  ...argList: Array<any>
): string {
  let result = "";

  for (let i = 0; i < template.length; i++) {
    result += template[i];

    if (i < argList.length) {
      result += String(argList[i]);
    }
  }

  return result;
}

export const html = identity;
export const css = identity;
