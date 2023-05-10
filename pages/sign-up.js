import { Box, Text } from "@chakra-ui/react";
import GuestNavbar from "../components/GuestNavbar";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";

const SignUpPage = () => {
  return (
    <Box backgroundColor="blue.50" minHeight="100vh">
      <GuestNavbar />
      <Box
        color="white"
        p="30px 20px 30px 20px"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        minHeight={`calc(100vh - 80px - 50px)`}
      >
        <Text fontSize="48px" fontWeight="700" mb="10px">
          Sign Up
        </Text>
        <SignUpForm />
      </Box>
      <Footer />
    </Box>
  );
};

export default SignUpPage;
