import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import ThemeContext from "./contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import SidebarContext from "./contexts/SidebarContext";
import CreateRobotContext from "./contexts/CreateRobotContext";

function App() {
  return (
    <ThemeContext>
      <SidebarContext>
        <CreateRobotContext>
          <ToastContainer />
          <Toaster position="top-center" />
          <AppRoutes />
        </CreateRobotContext>
      </SidebarContext>
    </ThemeContext>
  );
}

export default App;
