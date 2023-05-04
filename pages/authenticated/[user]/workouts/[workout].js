import {
  Box,
  Button,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GoalForm from "../../../../components/GoalForm";
import EditableGoal from "../../../../components/EditableGoal";
import Navbar from "../../../../components/Navbar";
import Title from "../../../../components/Title";

import { FaPlus } from "react-icons/fa";

const Workout = () => {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const userId = router.query.user;
  const workoutId = router.query.workout;

  const fetchData = async (workoutId) => {
    try {
      setLoading(true);
      const workoutResponse = await fetch(
        `http://localhost:3001/workouts/${workoutId}`
      );
      const workoutData = await workoutResponse.json();

      setWorkout({
        id: workoutData._id,
        name: workoutData.name,
        notes: workoutData.notes,
        sessions: workoutData.sessions,
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
    fetchData(workoutId);
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

  const handleBackButton = () => {
    router.push(`/authenticated/${userId}/workouts`);
  };

  const handleEditButton = () => {
    router.push(`/authenticated/${userId}/workouts/${workoutId}/edit`);
  };

  const handleDeleteButton = async () => {
    const data = {
      userId: userId,
    };

    const rawResponse = await fetch(
      `http://localhost:3001/workouts/${workoutId}/delete`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await rawResponse.json();

    console.log(res);

    // const filteredWorkouts = workouts.filter((workout) => workout._id !== deletedWorkoutId);
    // setWorkouts(filteredWorkouts);

    router.push(`/authenticated/${userId}/workouts`);
  };

  const handleStartButton = () => {
    router.push(`/authenticated/${userId}/workouts/${workoutId}/session`);
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
        <Title content={`${workout?.name}`} />
        <Box>
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

          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleEditButton}
            mt="10px"
            mb="10px"
            ml="10px"
          >
            Edit
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Notes
          </Text>
          <Text>{workout?.notes}</Text>
        </Box>

        <Table>
          <Thead>
            <Tr>
              <Th>Exercise</Th>
              <Th>Sets</Th>
              <Th>Reps</Th>
              <Th>Weight</Th>
            </Tr>
          </Thead>
          <Tbody>
            {workout &&
              workout.exercises &&
              workout.exercises.map((exercise) => {
                return (
                  <Tr key={exercise._id}>
                    <Td>{exercise.name}</Td>
                    <Td>{exercise.sets}</Td>
                    <Td>{exercise.reps}</Td>
                    <Td>{exercise.weight}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>

        <Box
          w="100%"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          mt="50px"
        >
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleDeleteButton}
            mt="10px"
            mb="10px"
          >
            Delete
          </Button>

          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleStartButton}
            mt="10px"
            mb="10px"
          >
            Start
          </Button>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export default Workout;
