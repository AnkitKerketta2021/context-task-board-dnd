import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ThemeProvider>
  </StrictMode>,
);
