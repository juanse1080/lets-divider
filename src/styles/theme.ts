import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  common: {
    black: "#3F3F3F",
    white: "#ffffff",
    lightGrey: "#EDEDED",
  },
  palette: {
    primary: {
      light: "#0e101c",
      dark: "#0e101c",
    },
    secondary: {
      light: "#bf1650",
      dark: "#bf1650",
    },
    gradient: {
      light: "linear-gradient(180deg, #002859 0%, #bf1650 100%)",
      dark: "linear-gradient(180deg, #002859 0%, #bf1650 100%)",
    },
    error: {
      light: "#ff3333",
      dark: "#ff3333",
    },
    warning: {
      light: "#FFC43D",
      dark: "#FFC43D",
    },
    info: {
      light: "#64b5f6",
      dark: "#64b5f6",
    },
    success: {
      light: "#219653",
      dark: "#219653",
    },
    grey: {
      light: "#97AAC0",
      dark: "#97AAC0",
    },
    divider: {
      light: "rgba(0, 0, 0, 0.12)",
      dark: "rgba(0, 0, 0, 0.12)",
    },
    background: {
      light: "#1e2a4a",
      dark: "#1e2a4a",
    },
  },
  shape: {
    borderRadius: "6px",
  },
  zIndex: {
    appBar: 1100,
    modal: 1300,
    tooltip: 1500,
  },
  value: "light",
};

export default defaultTheme;
