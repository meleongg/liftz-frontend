import { extendTheme } from "@chakra-ui/theme-utils";

const colors = {
  lightBlue: {
    50: "#5ca1e6",
  },
  blue: {
    0: "#00799F",
    50: "#0076CC",
  },
  black: {
    50: "#333333",
  },
  red: {
    50: "#FF4747",
  },
};

const customTheme = extendTheme({
  colors,
});

export default customTheme;