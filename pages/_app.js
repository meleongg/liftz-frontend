import { ChakraProvider } from "@chakra-ui/react";
import { WorkoutSessionProvider } from "../contexts/workoutSessionContext";
import "../styles/globals.css";
import customTheme from "../styles/theme";

const App = ({ Component, pageProps }) => {
  return (
    <WorkoutSessionProvider>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </WorkoutSessionProvider>
  );
};

export default App;
