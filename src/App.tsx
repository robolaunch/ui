import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import ThemeContext from "./contexts/ThemeContext";
import "animate.css";
import { Toaster } from "sonner";
import VersionViewer from "./components/VersionViewer/VersionViewer";
import TrialRoutes from "./routes/TrialRoutes";
import { envTrialApp } from "./helpers/envProvider";

export default function App() {
  return (
    <ThemeContext>
      <Toaster richColors position="top-center" />

      {envTrialApp ? <TrialRoutes /> : <AppRoutes />}

      <VersionViewer />
    </ThemeContext>
  );
}
