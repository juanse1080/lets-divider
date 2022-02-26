import { ThemeProvider } from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";

import { defaultTheme } from "styles";
import { Client, Basic } from "pages";

import "react-perfect-scrollbar/dist/css/styles.css";

import "config";

import GlobalStyle from "styles/global";
import "styles/reset.css";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Routes>
        <Route path="/basic" element={<Basic />} />
        <Route path="/client" element={<Client />} />
        <Route path="*" element={<Navigate to="/basic" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
