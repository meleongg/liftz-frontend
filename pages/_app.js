import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
