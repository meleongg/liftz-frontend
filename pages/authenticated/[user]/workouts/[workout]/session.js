import {
  Box,
  Button,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../../../components/Navbar";
import Title from "../../../../../components/Title";

const EditableCell = ({ value, onChange }) => {
  return (
    <Editable defaultValue={value}>
      <EditablePreview>{value}</EditablePreview>
      <EditableInput onChange={(e) => onChange(e.target.value)} />
    </Editable>
  );
};

const Session = ({ dbWorkout, dbExercises, error }) => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [sessionExercises, setSessionExercises] = useState(dbExercises);
  const [workout, setWorkout] = useState(dbWorkout);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const userId = router.query.user;
  const workoutId = router.query.workout;

  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const handleStart = () => {
    setTimerOn(true);
  };

  const handleStop = () => {
    setTimerOn(false);
  };

  const handleReset = () => {
    setTime(0);
    setTimerOn(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

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

  const handleCancelButton = async () => {
    router.push(`/authenticated/${userId}/workouts/${workoutId}`);
  };

  const handleEndButton = async () => {
    handleStop();

    const data = {
      userId: userId,
      workoutId: workoutId,
      time: time,
      sessionExercises: sessionExercises,
    };

    try {
      const rawResponse = await fetch("/api/session-end", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const { sessionId } = await rawResponse.json();

      router.push(
        `/authenticated/${userId}/workouts/${workoutId}/${sessionId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSessionExerciseChange = (index, field, newValue) => {
    const updatedSessionExercises = [...sessionExercises];

    if (field !== "name") {
      newValue = parseInt(newValue);
    }

    updatedSessionExercises[index][field] = newValue;
    setSessionExercises(updatedSessionExercises);

    console.log(sessionExercises);
  };

  const handleAddSessionExercise = () => {
    const newSessionExercise = {
      name: "Exercise",
      sets: 1,
      reps: 1,
      weight: 45,
    };
    setSessionExercises([...sessionExercises, newSessionExercise]);
  };

  const handleDeleteSessionExercise = (index) => {
    const updatedSessionExercises = [...sessionExercises];
    updatedSessionExercises.splice(index, 1);
    setSessionExercises(updatedSessionExercises);
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
        <Box mt="20px">
          <Text fontSize="30px" fontWeight="700">
            Time Elapsed
          </Text>
          <Text mb="10px" fontSize="20px">
            {formatTime(time)}
          </Text>
          {!timerOn ? (
            <Button
              bgColor="blue.50"
              color="white"
              _hover={{ bg: "lightBlue.50" }}
              onClick={handleStart}
            >
              Start
            </Button>
          ) : (
            <Button
              bgColor="blue.50"
              color="white"
              _hover={{ bg: "lightBlue.50" }}
              onClick={handleStop}
            >
              Stop
            </Button>
          )}
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleReset}
            ml="4"
          >
            Reset
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Notes
          </Text>
          <Text>{workout?.notes}</Text>
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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sessionExercises &&
                sessionExercises.map((exercise, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <EditableCell
                          value={exercise.name}
                          onChange={(newValue) =>
                            handleSessionExerciseChange(index, "name", newValue)
                          }
                        />
                      </Td>
                      <Td>
                        <EditableCell
                          value={exercise.sets}
                          onChange={(newValue) =>
                            handleSessionExerciseChange(index, "sets", newValue)
                          }
                        />
                      </Td>
                      <Td>
                        <EditableCell
                          value={exercise.reps}
                          onChange={(newValue) =>
                            handleSessionExerciseChange(index, "reps", newValue)
                          }
                        />
                      </Td>
                      <Td>
                        <EditableCell
                          value={exercise.weight}
                          onChange={(newValue) =>
                            handleSessionExerciseChange(
                              index,
                              "weight",
                              newValue
                            )
                          }
                        />
                      </Td>
                      <Td>
                        <Button
                          bgColor="blue.50"
                          color="white"
                          _hover={{ bg: "lightBlue.50" }}
                          onClick={handleCancelButton}
                          mt="10px"
                          mb="10px"
                          onClick={() => handleDeleteSessionExercise(index)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>
                  <Button
                    bgColor="blue.50"
                    color="white"
                    _hover={{ bg: "lightBlue.50" }}
                    onClick={handleCancelButton}
                    mt="10px"
                    mb="10px"
                    onClick={handleAddSessionExercise}
                  >
                    Add Exercise
                  </Button>
                </Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tfoot>
          </Table>
        </Box>

        <Box
          w="100%"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          mt="30px"
          mb="30px"
        >
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleCancelButton}
            mt="10px"
            mb="10px"
          >
            Cancel
          </Button>

          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleEndButton}
            mt="10px"
            mb="10px"
          >
            End
          </Button>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { workout } = context.params;

  try {
    const response = await fetch(`http://localhost:3001/workouts/${workout}`);
    const data = await response.json();

    const dbWorkout = {
      id: data._id,
      name: data.name,
      notes: data.notes,
      sessions: data.sessions,
      exercises: data.exercises,
    };

    return {
      props: {
        dbWorkout: dbWorkout,
        dbExercises: data.exercises,
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

export default Session;
