import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Link, Text } from "@chakra-ui/react";

import { FaListAlt, FaCalendarAlt, FaDumbbell, FaSignal } from "react-icons/fa";

const LandingPage = () => {
  return (
    <Box backgroundColor="blue.50" minHeight="100vh" pb="30px">
      <Head>
        <title>liftz - Landing Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="10px 20px 10px 20px"
        backgroundColor="white"
        h="80px"
      >
        <Box display="flex" justifyContent="center">
          <Image src="/full-logo.png" width={100} height={50} alt="logo" />
        </Box>
        <Link as={NextLink} href="/sign-up">
          sign up
        </Link>
        <Link as={NextLink} href="/login">
          login
        </Link>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection="column"
        backgroundColor="white"
        color="#333"
        mt="30px"
        borderRadius="20px"
        p="20px"
      >
        <Text>Level up your gainz</Text>
        <Box display="flex" justifyContent="center">
          <Image src="/full-logo.png" width={300} height={200} alt="temp" />
        </Box>
        <Text>
          Keep track of your workouts and your progress. Never lose gym
          motivation again.
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
          p="10px 10px 10px 20px"
        >
          <Box fontSize="50px">
            <FaListAlt />
          </Box>
          <Text pl="20px">
            Keep track of your workouts and your progress. Never lose gym
            motivation again.
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
            Keep track of your workouts and your progress. Never lose gym
            motivation again.
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
            Keep track of your workouts and your progress. Never lose gym
            motivation again.
          </Text>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-start" mt="30px">
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
            Keep track of your workouts and your progress. Never lose gym
            motivation again.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
