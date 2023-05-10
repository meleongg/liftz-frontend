import Head from "next/head";
import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";

import { FaListAlt, FaCalendarAlt, FaDumbbell, FaSignal } from "react-icons/fa";

const LandingPage = () => {
  return (
    <Box backgroundColor="blue.50" minHeight="100vh">
      <Head>
        <title>liftz - Landing Page</title>
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
        pl="20px"
        pr="20px"
      >
        <Text fontSize="30px" fontWeight="700" pt="50px" pb="30px">
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
        <Text fontSize="18px" fontWeight="700" pt="20px" pb="50px">
          Transform your body and crush your fitness goals with liftz. Say
          goodbye to workout amnesia and hello to unstoppable progress!
        </Text>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt="30px" mb="30px">
        <Box
          w="80%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          mt="30px"
          p="10px 10px 10px 20px"
        >
          <Box fontSize="50px">
            <FaListAlt />
          </Box>
          <Text pl="20px">
            Revolutionize your fitness journey with our workout app’s
            comprehensive library and session tracker.
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" mt="30px" mb="30px">
        <Box
          w="80%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          p="10px 10px 10px 20px"
        >
          <Box fontSize="50px">
            <FaCalendarAlt />
          </Box>
          <Text pl="20px">
            Maximize your gains with our built-in calendar feature. Easily track
            your past workout sessions.
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt="30px" mb="30px">
        <Box
          w="80%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          p="10px 10px 10px 20px"
        >
          <Box fontSize="50px">
            <FaDumbbell />
          </Box>
          <Text pl="20px">
            Say goodbye to mental math at the gym! Our barbell plate calculator
            takes the guesswork out of weightlifting, giving you a clear visual
            of your plates.
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" mt="30px" mb="50px">
        <Box
          w="80%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="white"
          borderRadius="20px"
          p="10px 10px 10px 20px"
        >
          <Box fontSize="50px">
            <FaSignal />
          </Box>
          <Text pl="20px">
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
