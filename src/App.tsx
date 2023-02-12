import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import { ConfigProvider } from "antd";
import ThemeContext from "./context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
//theme
import "primereact/resources/themes/tailwind-light/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";

import { ToastContainer } from "react-toastify";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#AC2DFE",
        },
      }}
    >
      <ThemeContext>
        <ToastContainer />
        <AppRoutes />
      </ThemeContext>
    </ConfigProvider>
  );
}

export default App;
