import { createContext } from "react";
import { ColorSchemeContextProps } from "../types";

export const ColorSchemeContext = createContext<ColorSchemeContextProps>({
  mode: 'dark',
  setMode: () => {},
});
