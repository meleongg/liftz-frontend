import { Box, Heading, Button, VStack, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GoalForm from "../../components/GoalForm";
import EditableGoal from "../../components/EditableGoal";
import Navbar from "../../components/Navbar";
import Title from "../../components/Title";

import { FaPlus } from "react-icons/fa";

const Home = ({ user: dbUser, goals: dbGoals, error }) => {
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goals, setGoals] = useState(dbGoals);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const userId = router.query.user;

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const quotesArr = [
    "Looking big jim bro",
    "Leg day everyday",
    "You don't need Alan...",
    "Birdcoop > Arc",
    "Platella, Dumbella, and Barbella will always be there for you",
    "No pain, no gain, no brain cells left.",
    "Sweat now, shine later.",
    "You can't flex fat, so keep grinding.",
    "The only bad workout is the one that didn't happen.",
    "Gym hair, don't care.",
    "Muscles are like a good joke - they're better when you don't have to explain them.",
    "You don't have to be great to start, but you have to start to be great.",
    "If it doesn't challenge you, it doesn't change you.",
    "Squat like nobody's watching.",
    "The only bad workout is the one you didn't log on Instagram.",
    "I don't always lift weights, but when I do, I prefer to grunt loudly.",
    "The gym is my therapy, and sweat is my sanity.",
    "Life is too short to skip leg day.",
    "Stronger every day, except for leg day - that's just pain.",
    "You can't spell legendary without leg day.",
    "The only time success comes before work is in the dictionary - so keep working!",
    "You don't need a six-pack to impress anyone, but it doesn't hurt to have one.",
    "Sweat is just your fat crying.",
    "The only limit is the one you set for yourself - so set the bar high and lift it higher.",
  ];

  useEffect(() => {
    let index = getRandomNumber(quotesArr.length - 1);
    setQuoteIndex(index);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
        color="blue.50"
      >
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
        color="#333"
      >
        <Text>Failed to load data</Text>
      </Box>
    );
  }

  const handleAddGoal = () => {
    setShowGoalForm(true);
  };

  return (
    <Box minHeight="100vh">
      {/* 80px is the navbar */}
      <Box
        minHeight="calc(100vh - 80px)"
        h="calc(100% - 80px)"
        pt="30px"
        pl="10px"
        pr="10px"
      >
        <Title content={`Hi ${dbUser.firstName}!`} />
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
              userId={userId}
              setShowGoalForm={setShowGoalForm}
              goals={goals}
              setGoals={setGoals}
            />
          )}
          <VStack spacing="10px" align="start" minHeight="150px">
            {goals?.map((goal) => {
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
                    userId={userId}
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
      <Navbar userId={userId} currPage="home" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { user } = context.params;

  try {
    const response = await fetch(`http://localhost:3001/user/${user}`);
    const data = await response.json();

    return {
      props: {
        user: {
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
        goals: data.goals,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: {
        error: true,
      },
    };
  }
}

export default Home;
