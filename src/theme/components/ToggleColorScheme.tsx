import { useContext } from "react";
import { ToggleButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { ColorSchemeContext } from "../context/Context";
import { ColorSchemeContextProps } from "../types";

type Option = {
  icon: IconSource;
  value: ColorSchemeContextProps['mode'];
};

const options: Option[] = [
  {
    icon: 'cog',
    value: 'system',
  },
  {
    icon: 'brightness-1',
    value: 'dark',
  },
  {
    icon: 'brightness-5',
    value: 'light',
  },
];

const isValidOption = (string: any): string is ColorSchemeContextProps['mode'] =>
  options.map(({ value }) => value).includes(string);

export const ToggleColorScheme = () => {
  const { mode, setMode } = useContext(ColorSchemeContext);
  const handleModeChange = (value: string) => {
    if (isValidOption(value)) {
      return setMode(value);
    }

    throw new Error(`Mode value is '${value}'. This should not be able to happen.`)
  };
  return (
    <ToggleButton.Row onValueChange={handleModeChange} value={mode}>
      {options.map(({ icon, value }) => <ToggleButton key={value} icon={icon} value={value} />)}
      {/* <ToggleButton icon="cog" value="system" />
      <ToggleButton icon="brightness-1" value="left" />
      <ToggleButton icon="brightness-5" value="right" /> */}
    </ToggleButton.Row>
    // <ToggleButton
    //   icon="theme-light-dark"
    //   value="bluetooth"
    //   status={"checked"}
    //   onPress={console.log}
    // />
  )
}