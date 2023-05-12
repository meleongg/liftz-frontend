import Head from "next/head";
import Image from "next/image";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";

const metadata = {
  title: "liftz",
  description: "liftz landing page",
  image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

import { FaListAlt, FaCalendarAlt, FaDumbbell, FaSignal } from "react-icons/fa";

const LandingPage = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

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
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection="column"
        backgroundColor="white"
        minHeight={`calc(100vh - 80px - 50px)`}
        color="#333"
        mt="30px"
        borderRadius="20px"
        pl={isLargerThan768 ? "80px" : "20px"}
        pr={isLargerThan768 ? "80px" : "20px"}
      >
        <Text
          fontSize={isLargerThan768 ? "50px" : "30px"}
          fontWeight="700"
          pt="50px"
          pb="30px"
        >
          Level up your gainz.
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          mt="10px"
          mb="10px"
          p="20px"
          border="2px solid #333"
          borderRadius="20px"
        >
          <Image
            src="/landing/liftz-workouts.png"
            width={300}
            height={200}
            alt="temp"
          />
        </Box>
        <Text
          fontSize={isLargerThan768 ? "26px" : "18px"}
          fontWeight="700"
          pt="20px"
          pb="50px"
          w="75%"
        >
          Transform your body and crush your fitness goals with liftz. Say
          goodbye to workout amnesia and hello to unstoppable progress!
        </Text>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt="30px" mb="30px">
        <Box
          w={isLargerThan768 ? "70%" : "80%"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          mt="30px"
          p={isLargerThan768 ? "30px 30px 30px 40px" : "10px 10px 10px 20px"}
        >
          <Box fontSize={isLargerThan768 ? "80px" : "50px"}>
            <FaListAlt />
          </Box>
          <Text pl="30px" fontSize={isLargerThan768 ? "26px" : "16px"}>
            Revolutionize your fitness journey with our workout app’s
            comprehensive library and session tracker.
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" mt="30px" mb="30px">
        <Box
          w={isLargerThan768 ? "70%" : "80%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          p={isLargerThan768 ? "30px 30px 30px 40px" : "10px 10px 10px 20px"}
        >
          <Box fontSize={isLargerThan768 ? "80px" : "50px"}>
            <FaCalendarAlt />
          </Box>
          <Text pl="30px" fontSize={isLargerThan768 ? "26px" : "16px"}>
            Maximize your gains with our built-in calendar feature. Easily track
            your past workout sessions.
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt="30px" mb="30px">
        <Box
          w={isLargerThan768 ? "70%" : "80%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          p={isLargerThan768 ? "30px 30px 30px 40px" : "10px 10px 10px 20px"}
        >
          <Box fontSize={isLargerThan768 ? "80px" : "50px"}>
            <FaDumbbell />
          </Box>
          <Text pl="30px" fontSize={isLargerThan768 ? "26px" : "16px"}>
            Say goodbye to mental math at the gym! Our barbell plate calculator
            takes the guesswork out of weightlifting, giving you a clear visual
            of your plates.
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" mt="30px" mb="50px">
        <Box
          w={isLargerThan768 ? "70%" : "80%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          p={isLargerThan768 ? "30px 30px 30px 40px" : "10px 10px 10px 20px"}
        >
          <Box fontSize={isLargerThan768 ? "80px" : "50px"}>
            <FaSignal />
          </Box>
          <Text pl="30px" fontSize={isLargerThan768 ? "26px" : "16px"}>
            Easily track and visualize your personal records for each exercise
            with our metric collection system.
          </Text>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingPage;
