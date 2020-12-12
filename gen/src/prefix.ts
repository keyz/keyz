import postcss from "postcss";
import autoprefixer from "autoprefixer";

export async function prefixCss(code: string): Promise<string> {
  const result = await postcss([
    autoprefixer({
      overrideBrowserslist: ["> 0.001%"],
    }),
  ]).process(code, {
    from: undefined,
  });

  result.warnings().forEach((warning) => {
    console.warn(String(warning));
  });

  return result.css;
}
