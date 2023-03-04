import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";

// import "@fontsource/inter/400.css";
// import "@fontsource/inter/700.css";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
