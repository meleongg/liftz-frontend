import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { Inter } from "@next/font/google";
import { Box, Heading, Button } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "../components/Navbar";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

import { FaPlus } from "react-icons/fa";

const WorkoutLibrary = () => {
  const { data, error, isLoading } = useSWR("http://localhost:3001", fetcher);
  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(data);

  const handleAddWorkout = () => {
    router.push("/new-workout");
  };

  return (
    <Box minHeight="100vh">
      {/* 80px is the navbar */}
      <Box
        minHeight="calc(100vh - 80px)"
        h="calc(100% - 80px)"
        className={inter.className}
        pt="30px"
        pl="10px"
        pr="10px"
      >
        <Heading fontSize="50px">Workout Library</Heading>
        <Button
          bgColor="blue.50"
          color="white"
          rightIcon={<FaPlus />}
          _hover={{ bg: "lightBlue.50" }}
          onClick={handleAddWorkout}
        >
          New Workout
        </Button>
      </Box>
      <Navbar currPage="workouts" />
    </Box>
  );
};

export default WorkoutLibrary;
