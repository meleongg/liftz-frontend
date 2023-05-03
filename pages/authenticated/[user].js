import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GoalForm from "../../components/GoalForm";
import EditableGoal from "../../components/EditableGoal";
import Navbar from "../../components/Navbar";
import Title from "../../components/Title";

import { FaPlus } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const [showGoalForm, setShowGoalForm] = useState(false);
  // const { data, error, isLoading } = useSWR("http://localhost:3001", fetcher);
  const [user, setUser] = useState({});
  const [goals, setGoals] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const router = useRouter();

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const quotesArr = [
    "Looking big jim bro",
    "Leg day everyday",
    "You don't need Alan...",
    "Birdcoop > Arc",
    "Platella, Dumbella, and Barbella will always be there for you",
  ];

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`);

      const data = await response.json();

      setGoals(data.goals);
      setUser({
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const userId = router.query.user;
    let index = getRandomNumber(quotesArr.length - 1);
    setQuoteIndex(index);

    fetchUserData(userId);
  }, []);

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  if (!goals) return <div>loading...</div>;

  const handleAddGoal = () => {
    setShowGoalForm(true);
  };

  // console.log(data);

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
        <Title content={`Hi ${user.firstName}!`} />
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
          {showGoalForm && (
            <GoalForm
              setShowGoalForm={setShowGoalForm}
              goals={goals}
              setGoals={setGoals}
            />
          )}
          <VStack spacing="10px" align="start" minHeight="150px">
            {goals.map((goal) => {
              return (
                <Box
                  w="100%"
                  display="flex"
                  justifyContent="space-between"
                  pt="5px"
                  pb="5px"
                  key={goal._id}
                >
                  <EditableGoal
                    id={goal._id}
                    content={goal.content}
                    goals={goals}
                    setGoals={setGoals}
                  />
                </Box>
              );
            })}
          </VStack>
        </Box>
        <Box pb="20px">
          <Heading fontSize="30px">Fun Stats</Heading>
          Coming Soon! :)
          <VStack minHeight="100px"></VStack>
        </Box>
      </Box>
      <Navbar currPage="home" />
    </Box>
  );
};

export default Home;
