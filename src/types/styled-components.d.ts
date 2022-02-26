import "styled-components";

interface IPalette {
  light: string;
  dark: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      keys: string[];
      values: {
        [index: string]: number;
      };
    };
    common: {
      black: string;
      white: string;
      lightGrey: string;      
    };
    palette: {
      primary: IPalette;
      secondary: IPalette;
      gradient: IPalette;
      error: IPalette;
      warning: IPalette;
      info: IPalette;
      success: IPalette;
      grey: IPalette;
      divider: IPalette;
      background: IPalette;
    };
    shape: {
      borderRadius: string;
    };
    zIndex: {
      appBar: number;
      modal: number;
      tooltip: number;
    };
    value: 'light' | 'dark',
  }
}
