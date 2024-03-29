import { extendTheme } from "@chakra-ui/theme-utils";

const colors = {
    lightBlue: {
        0: "#ced8f0",
        25: "#9dc1f2",
        50: "#5ca1e6",
    },
    blue: {
        0: "#00799F",
        50: "#0076CC",
    },
    black: {
        50: "#333333",
    },
    gray: {
        50: "#d5d9de",
    },
    red: {
        50: "#FF4747",
        100: "#c92a0a",
    },
};

const customTheme = extendTheme({
    colors,
});

export default customTheme;
