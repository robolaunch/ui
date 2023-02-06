import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#AC2DFE",
        },
      }}
    >
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
