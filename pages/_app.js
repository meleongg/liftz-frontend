import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./theme";
import Layout from "../components/layout";

// import "@fontsource/inter/400.css";
// import "@fontsource/inter/700.css";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </ChakraProvider>
  );
};

export default App;
