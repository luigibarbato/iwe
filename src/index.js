import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Sinestezia } from "./Sinestezia";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Sinestezia />
  </StrictMode>
);
