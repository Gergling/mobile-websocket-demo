import { PropsWithChildren, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "../constants";
import { ColorSchemeContextProps } from "../types";
import { ColorSchemeContext } from "./Context";

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ColorSchemeContextProps['mode']>('system');
  const colorScheme = useMemo(
    () => mode === 'system' ? systemColorScheme : mode,
    [mode, systemColorScheme]
  );
  const paperTheme = useMemo(
    () => colorScheme === 'dark' ? darkTheme : lightTheme,
    [colorScheme]
  );
  const colorSchemeContextValue: ColorSchemeContextProps = useMemo(
    () => ({ mode, setMode }),
    [mode, setMode]
  );

  // useEffect(() => console.log('provider in use'), [])

  return (
    <ColorSchemeContext value={colorSchemeContextValue}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
    </ColorSchemeContext>
  );
}