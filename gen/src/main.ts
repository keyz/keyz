import { thonkAsset } from "./assetData";
import { formatSvg, html } from "./prettier";

const SVG_HEIGHT = 480;
const SVG_WIDTH = 720;

export async function generateSvgString(): Promise<string> {
  const expectedFullMoveDuration = 2.5;
  const assetDimension = 80;

  const rootDivBorderWidth = 1;
  const rootDivBorderStyle = "solid #777777";

  const rootDivHeight = SVG_HEIGHT - 2 * rootDivBorderWidth;
  const rootDivWidth = SVG_WIDTH - 2 * rootDivBorderWidth;

  const boundX = rootDivWidth - assetDimension;
  const boundY = rootDivHeight - assetDimension;

  const velocity = Math.min(
    boundX / expectedFullMoveDuration,
    boundY / expectedFullMoveDuration
  );

  const animationDurationX = boundX / velocity;
  const animationDurationY = boundY / velocity;

  // initial offset
  const animationDelayX = -animationDurationX / 6;
  const animationDelayY = -animationDurationY / 6;

  const code = html`
    <svg
      fill="none"
      viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            /* derived properties */

            #wrapper-0 {
              animation: flipX ${animationDurationX * 2}s step-end
                ${animationDelayX}s infinite;
            }

            #wrapper-1 {
              animation: moveX ${animationDurationX}s linear ${animationDelayX}s
                infinite;
            }

            #wrapper-2 {
              animation: moveY ${animationDurationY}s linear ${animationDelayY}s
                infinite alternate;
            }

            #wrapper-3 {
              animation: flipY ${animationDurationY * 2}s step-end
                ${animationDelayY}s infinite;
            }

            #wrapper-4 {
              animation: hueX ${animationDurationX * 2}s step-end
                ${animationDelayX}s infinite;
            }

            #wrapper-5 {
              animation: hueY ${animationDurationY * 2}s step-end
                ${animationDelayY}s infinite;
            }

            /* static properties */

            #root {
              width: ${rootDivWidth}px;
              height: ${rootDivHeight}px;
              overflow: hidden;
              border: ${rootDivBorderWidth}px ${rootDivBorderStyle};
            }

            #root * {
              margin: 0;
              padding: 0;
            }

            #thonk {
              width: ${assetDimension}px;
              height: ${assetDimension}px;
            }

            /* key frames */

            @keyframes moveX {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(${boundX}px);
              }
            }

            @keyframes moveY {
              0% {
                transform: translateY(0);
              }
              100% {
                transform: translateY(${boundY}px);
              }
            }

            @keyframes flipX {
              0% {
                transform: scale(1, 1);
              }
              50% {
                transform: scale(-1, 1);
              }
            }

            @keyframes flipY {
              0% {
                transform: scale(1, 1);
              }
              50% {
                transform: scale(1, -1);
              }
            }

            @keyframes hueX {
              0% {
                filter: hue-rotate(0deg);
              }
              50% {
                filter: hue-rotate(180deg);
              }
            }

            @keyframes hueY {
              0% {
                filter: hue-rotate(0deg);
              }
              50% {
                filter: hue-rotate(90deg);
              }
            }
          </style>

          <div id="root">
            <div id="wrapper-0">
              <div id="wrapper-1">
                <div id="wrapper-2">
                  <div id="wrapper-3">
                    <div id="wrapper-4">
                      <div id="wrapper-5">
                        <img id="thonk" alt="" src="${thonkAsset}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;

  return await formatSvg(code);
}

export async function devMain() {
  const $ = document.querySelector.bind(document);

  const appElement = $<HTMLDivElement>("#app")!;

  const formattedSvgString = await generateSvgString();
  appElement.innerHTML = generateReadmeHtmlString(formattedSvgString);

  const controlElement = $<HTMLDivElement>("#control")!;

  const buttonElement = document.createElement("button");
  controlElement.appendChild(buttonElement);

  buttonElement.innerText = "COPY";
  buttonElement.onclick = async () => {
    await navigator.clipboard.writeText(formattedSvgString);
    alert(`copied @ ${new Date()}`);
  };

  const preElement = document.createElement("pre");
  controlElement.appendChild(preElement);

  preElement.innerText = formattedSvgString;
}

function generateReadmeHtmlString(formattedSvgString: string): string {
  // GitHub adds `max-width: 100%`

  return html`
    <div align="center">
      <a href="https://github.com/keyz/keyz/blame/main/thonk.svg">
        <!-- <img src="thonk.svg" width="${SVG_WIDTH}" height="${SVG_HEIGHT}" style="max-width: 100%;"> -->
        <img
          src="data:image/svg+xml;base64,${btoa(
            formattedSvgString + " ".repeat((Math.random() * 1000) | 0) // bust cache
          )}"
          width="${SVG_WIDTH}"
          height="${SVG_HEIGHT}"
          style="max-width: 100%;"
        />
      </a>
    </div>
  `;
}
