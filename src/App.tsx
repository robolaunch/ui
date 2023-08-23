import React, { ReactElement } from "react";
import VersionViewer from "./components/VersionViewer/VersionViewer";
import ThemeContext from "./contexts/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

export default function App(): ReactElement {
  return (
    <ThemeContext>
      <Toaster richColors position="top-center" />
      <AppRoutes />
      <VersionViewer />
    </ThemeContext>
  );
}
