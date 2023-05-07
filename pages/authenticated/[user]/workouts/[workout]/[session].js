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

import Navbar from "../../../../../components/Navbar";
import Title from "../../../../../components/Title";

const SessionEnd = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const userId = router.query.user;
  const workoutId = router.query.workout;
  const sessionId = router.query.session;

  const fetchData = async (sessionId) => {
    try {
      setLoading(true);
      const sessionResponse = await fetch(
        `http://localhost:3001/workouts/sessions/${sessionId}`
      );
      const sessionData = await sessionResponse.json();

      // console.log(sessionData);

      setSession({
        id: sessionData._id,
        date: sessionData.date,
        time: sessionData.time,
        exercises: sessionData.exercises,
        workout: sessionData.workout,
      });
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(sessionId);
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

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const handleDoneButton = async () => {
    router.push(`/authenticated/${userId}/workouts`);
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
        <Title content={`${session?.workout?.name} Session`} />

        <Text fontSize="30px" fontWeight="700" mt="20px">
          Time Elapsed
        </Text>
        <Text>{formatTime(session?.time)}</Text>
        <Text fontSize="30px" fontWeight="700" mt="20px">
          Date
        </Text>
        <Text>{formatDate(session?.date)}</Text>

        <Box display="flex" flexDirection="column" mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Notes
          </Text>
          <Text>{session?.workout?.notes}</Text>
        </Box>

        {/* make this an editable table with all text inputs for user to manually edit, fetched exercise data is only placeholder */}

        <Box overflowX="auto">
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
              {session &&
                session?.exercises &&
                session.exercises.map((exercise, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{exercise.name}</Td>
                      <Td>{exercise.sets}</Td>
                      <Td>{exercise.reps}</Td>
                      <Td>{exercise.weight}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </Box>

        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="30px"
          mb="30px"
        >
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleDoneButton}
            mt="10px"
            mb="10px"
          >
            Done
          </Button>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export default SessionEnd;
