import React, { Component, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import "./custom.css";

import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme"; // Import your themes
import CssBaseline from "@mui/material/CssBaseline"; // Ensures proper baseline styles

export default function App() {
  const [themeMode, setThemeMode] = useState("dark"); // State to track current theme

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light")); // Toggle between light and dark mode
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
