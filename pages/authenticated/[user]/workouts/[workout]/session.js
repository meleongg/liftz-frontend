import { Box, Heading, Button, VStack, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GoalForm from "../../../../components/GoalForm";
import EditableGoal from "../../../../components/EditableGoal";
import Navbar from "../../../../components/Navbar";
import Title from "../../../../components/Title";

import { FaPlus } from "react-icons/fa";

const Workout = () => {
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [user, setUser] = useState({});
  const [workout, setWorkout] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const userId = router.query.user;
  const workoutId = router.query.workout;

  const fetchData = async (userId, workoutId) => {
    try {
      setLoading(true);
      const userResponse = await fetch(`http://localhost:3001/user/${userId}`);
      const userData = await userResponse.json();

      const workoutResponse = await fetch(
        `http://localhost:3001/workouts/${workoutId}`
      );
      const workoutData = await workoutResponse.json();

      setUser({
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });

      setWorkout({
        id: workoutData._id,
        name: workoutData.name,
        sets: workoutData.sets,
        reps: workoutData.reps,
        weight: workoutData.weight,
        exercises: workoutData.exercises,
      });
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userId, workoutId);
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
        <Title content={`${workout.name}`} />
        {/* <Box pb="20px">
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
        </Box> */}
      </Box>
      <Navbar userId={userId} currPage="home" />
    </Box>
  );
};

export default Workout;
