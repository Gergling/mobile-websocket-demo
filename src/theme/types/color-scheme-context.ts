import { ColorSchemeName } from "react-native";

type ColorSchemeMode = keyof ({
  [key in Extract<ColorSchemeName, 'dark' | 'light'>]: string;
} & {
  system: string;
})

export type ColorSchemeContextProps = {
  mode: ColorSchemeMode;
  setMode: (mode: ColorSchemeMode) => void;
};
