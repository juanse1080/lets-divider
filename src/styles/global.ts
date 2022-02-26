import { createGlobalStyle } from "styled-components";
import { darken } from "utils/colorManipulator";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  * {
    box-sizing: border-box;
    font-family: Montserrat, sans-serif;
    color: ${({ theme }) => darken(theme.common.white, 0.3)};
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  input[type=number] { 
    -moz-appearance:textfield;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @-webkit-keyframes auto-fill{
    from {
      display:block;
    }
  }
  
  @keyframes auto-fill {
    from {
      display: block;
    }
  }
  @-webkit-keyframes auto-fill-cancel {
    from {
      display: block;
    }
  }
  @keyframes auto-fill-cancel {
    from {
      display: block;
    }
  }

  #root {
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
    overflow: hidden;
    background-color: ${({ theme }) => theme.palette.background[theme.value]};
  }
`;

export default GlobalStyle;
