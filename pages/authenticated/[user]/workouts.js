import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import WorkoutListItem from "../../../components/WorkoutListItem";

import { FaPlus } from "react-icons/fa";

const WorkoutLibrary = ({ dbUser, dbWorkouts, error }) => {
  const [loading, setLoading] = useState(true);
  const [user] = useState(dbUser);
  const [workouts] = useState(dbWorkouts);

  const router = useRouter();
  const userId = router.query.user;

  useEffect(() => {
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
        <Title userId={userId} content={"Workout Library"} />
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
                <WorkoutListItem user={user} workout={workout} />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { user } = context.params;

  try {
    const response = await fetch(`http://localhost:3001/user/${user}`);
    const data = await response.json();

    const dbUser = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
    const dbWorkouts = data.workouts;

    return {
      props: {
        dbUser: dbUser,
        dbWorkouts: dbWorkouts,
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

export default WorkoutLibrary;
