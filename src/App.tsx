import React, { ReactElement } from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import ThemeContext from "./contexts/ThemeContext";
import "animate.css";
import { Toaster } from "sonner";
import VersionViewer from "./components/VersionViewer/VersionViewer";

export default function App(): ReactElement {
  return (
    <ThemeContext>
      <Toaster richColors position="top-center" />
      <AppRoutes />
      <VersionViewer />
    </ThemeContext>
  );
}
