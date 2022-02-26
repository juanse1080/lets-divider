import { useContext } from 'react'
import { ThemeContext } from "styled-components";


import defaultTheme from "../styles/theme";

const useTheme = () => {
  return useContext(ThemeContext) || defaultTheme
}

export default useTheme