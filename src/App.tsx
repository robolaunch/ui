import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
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
    <ThemeContext>
      <ToastContainer />
      <AppRoutes />
    </ThemeContext>
  );
}

export default App;
