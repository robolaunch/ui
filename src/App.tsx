import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import ThemeContext from "./contexts/ThemeContext";
import "animate.css";
import { Toaster } from "sonner";
import VersionViewer from "./components/VersionViewer/VersionViewer";

function App() {
  return (
    <ThemeContext>
      <Toaster richColors position="top-center" />
      <AppRoutes />
      <VersionViewer />
    </ThemeContext>
  );
}

export default App;
