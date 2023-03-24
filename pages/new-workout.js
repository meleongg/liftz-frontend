import React, { useState } from "react";
import { useRouter } from "next/router";

import { Inter } from "@next/font/google";
import { Box, Heading, Button } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

import Navbar from "../components/Navbar";
import NewWorkoutForm from "../components/NewWorkoutForm";

import { FaPlus } from "react-icons/fa";

const NewWorkout = () => {
  const router = useRouter(); 

  const handleBackButton = () => {
      router.push("workouts");
  }

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
        <Heading fontSize="50px">New Workout</Heading>
        <Button
          bgColor="blue.50"
          color="white"
          _hover={{ bg: "lightBlue.50" }}
          onClick={handleBackButton}
          mt="10px"
          mb="10px"
        >
          Back
        </Button>
        <NewWorkoutForm />
      </Box>
      <Navbar currPage="workouts" />
    </Box>
  );
};

export default NewWorkout;
