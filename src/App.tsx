import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "animate.css";
import ThemeContext from "./contexts/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeContext>
      <ToastContainer />
      <Toaster position="top-center" />
      <AppRoutes />
    </ThemeContext>
  );
}

export default App;
