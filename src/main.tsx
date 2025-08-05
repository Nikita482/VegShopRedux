import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App.tsx";
import { Store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
