import { devMain } from "./main";
import "./dev.css";

devMain().catch((error) => {
  console.error(error);
  throw error;
});
