import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Box, Heading, Button } from "@chakra-ui/react";
import useSWR from "swr";

import { FaPlus } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const { data, error, isLoading } = useSWR("http://localhost:3001", fetcher);

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const quotesArr = [
    "Looking big jim bro",
    "Leg day everyday",
    "You don't need Alan...",
    "Birdcoop > Arc",
  ];

  let quoteIndex = getRandomNumber(quotesArr.length - 1);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  return (
    <Box h="100vh" className={inter.className}>
      <Heading>Hi {data.firstName}!</Heading>
      <Heading>{quotesArr[quoteIndex]}</Heading>
      <Box display="flex" justifyContent="space-between">
        <Heading>Goals</Heading>
        <Button
          bgColor="blue.50"
          color="white"
          rightIcon={<FaPlus />}
          _hover={{ bg: "lightBlue.50" }}
        >
          New Goal
        </Button>
      </Box>
      <Heading>Fun Stats</Heading>
    </Box>
  );
};

export default Home;
