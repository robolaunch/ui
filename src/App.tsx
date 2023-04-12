import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import ThemeContext from "./contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import SidebarContext from "./contexts/SidebarContext";

function App() {
  return (
    <ThemeContext>
      <SidebarContext>
        <ToastContainer />
        <Toaster position="top-center" />
        <AppRoutes />
      </SidebarContext>
    </ThemeContext>
  );
}

export default App;
