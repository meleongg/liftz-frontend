import { Box, Text } from "@chakra-ui/react";
import GuestNavbar from "../components/GuestNavbar";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import Head from "next/head";

const metadata = {
  title: "Login | liftz",
  description: "Login page",
  image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const LoginPage = () => {
  return (
    <Box backgroundColor="blue.50" minHeight="100vh">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="image" content={metadata.image} />

        <meta
          property="og:url"
          content="https://liftz-workout-tracker.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          Login
        </Text>
        <LoginForm />
      </Box>
      <Footer />
    </Box>
  );
};

export default LoginPage;
