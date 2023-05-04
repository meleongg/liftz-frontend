import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import WorkoutListItem from "../../../components/WorkoutListItem";

import { FaPlus } from "react-icons/fa";

const WorkoutLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  const [workouts, setWorkouts] = useState([]);

  const router = useRouter();
  const userId = router.query.user;

  const fetchUserData = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/user/${userId}`);

      const data = await response.json();

      setWorkouts(data.workouts);
      setUser({
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
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

  const handleAddWorkout = () => {
    router.push(`/authenticated/${userId}/new-workout`);
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
        <Title content={"Workout Library"} />
        <Button
          bgColor="blue.50"
          color="white"
          rightIcon={<FaPlus />}
          _hover={{ bg: "lightBlue.50" }}
          onClick={handleAddWorkout}
          mt="20px"
        >
          New Workout
        </Button>

        <Box mt="30px">
          {workouts?.map((workout) => {
            return (
              <Box
                w="100%"
                display="flex"
                justifyContent="space-between"
                pt="5px"
                pb="5px"
                key={workout._id}
              >
                <WorkoutListItem
                  user={user}
                  workout={workout}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export default WorkoutLibrary;
