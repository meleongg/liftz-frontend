import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Box, Heading, Button, VStack, Checkbox } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useSWR from "swr";
import React, { useState, useEffect } from 'react';
import GoalForm from "../components/GoalForm";

import Navbar from "../components/Navbar";

import { FaPlus } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const [showGoalForm, setShowGoalForm] = useState(false); 
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

  const handleAddGoal = () => {
    setShowGoalForm(true); 
  }

  console.log(data);

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
        <Heading fontSize="50px">Hi {data.firstName}!</Heading>
        <Heading fontSize="20px" pt="10px" pb="30px">
          {quotesArr[quoteIndex]}
        </Heading>
        <Box pb="20px">
          <Box display="flex" justifyContent="space-between" pb="10px">
            <Heading fontSize="30px">Goals</Heading>
            <Button
              bgColor="blue.50"
              color="white"
              rightIcon={<FaPlus />}
              _hover={{ bg: "lightBlue.50" }}
              onClick={handleAddGoal}
            >
              New Goal
            </Button>
          </Box>
          {
            showGoalForm &&
            <GoalForm setShowGoalForm={setShowGoalForm} />
          }
          <VStack spacing="10px" align="start" minHeight="150px">
            <Box w="100%" display="flex" justifyContent="space-between" pt="5px" pb="5px">
              <Checkbox>Test Goal</Checkbox>
              <Box display="flex" justifyContent="space-between" w="100px">
                <Button
                  bgColor="blue.50"
                  color="white"
                  _hover={{ bg: "lightblue.50" }}
                >
                  <FaEdit />
                </Button>
                <Button
                  bgColor="blue.50"
                  color="white"
                  _hover={{ bg: "lightblue.50" }}
                >
                  <FaTrash />
                </Button>
              </Box>
            </Box>
          </VStack>
        </Box>
        <Box pb="20px">
          <Heading fontSize="30px">Fun Stats</Heading>
          <VStack minHeight="100px"></VStack>
        </Box>
      </Box>
      <Navbar currPage="home" />
    </Box>
  );
};

export default Home;
