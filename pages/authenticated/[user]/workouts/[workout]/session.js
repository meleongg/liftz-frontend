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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../../../components/Navbar";
import Title from "../../../../../components/Title";
import Head from "next/head";

const metadata = {
  description: "Workout Session page",
  image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const EditableCell = ({ value, onChange }) => {
  return (
    <Editable value={value}>
      <EditablePreview>{value}</EditablePreview>
      <EditableInput onChange={(e) => onChange(e.target.value)} />
    </Editable>
  );
};

const Session = ({ dbWorkout, dbExercises, dbTargetSets, error }) => {
  const [sessionExercises, setSessionExercises] = useState(dbExercises);
  const [targetSets] = useState(dbTargetSets);
  const [workout] = useState(dbWorkout);
  const [loading, setLoading] = useState(true);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const userId = router.query.user;
  const workoutId = router.query.workout;

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

    if (field !== "name" && typeof newValue === "string") {
      newValue = newValue.trim() === "" ? 0 : parseInt(newValue);
    } else {
      newValue = newValue.target.value;
    }

    updatedSessionExercises[index][field] = newValue;
    setSessionExercises(updatedSessionExercises);
  };

  const handleSessionExerciseClick = (index, field, newValue) => {
    const updatedSessionExercises = [...sessionExercises];

    updatedSessionExercises[index][field] = newValue;
    setSessionExercises(updatedSessionExercises);
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
      <Head>
        <title>{`${workout?.name} Session | liftz`}</title>
        <meta name="description" content={metadata.description} />
        <meta name="image" content={metadata.image} />

        <meta
          property="og:url"
          content="https://liftz-workout-tracker.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 80px is the navbar */}
      <Box
        minHeight="calc(100vh - 80px)"
        h="calc(100% - 80px)"
        pt="30px"
        pl={isLargerThan768 ? "100px" : "10px"}
        pr={isLargerThan768 ? "100px" : "10px"}
      >
        <Title userId={userId} content={`${workout?.name}`} />

        <Box display="flex" flexDirection="column" mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Notes
          </Text>
          <Text>{workout?.notes}</Text>
        </Box>

        <Box
          mt="20px"
          borderRadius="20px"
          p="14px"
          bgColor="blue.50"
          color="white"
        >
          <Text fontSize="18px" fontWeight="700" textAlign="center">
            Click/tap on most cells to edit its value!
          </Text>
        </Box>

        <Box overflowX="auto" mt="20px">
          <Table>
            <Thead>
              <Tr>
                <Th>Exercise</Th>
                <Th>Sets</Th>
                <Th>Sets Done</Th>
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
                      <Td>{targetSets[index]}</Td>
                      <Td>
                        <NumberInput defaultValue={exercise.sets} min={0}>
                          <NumberInputField w="100px" />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={() =>
                                handleSessionExerciseClick(
                                  index,
                                  "sets",
                                  exercise.sets + 1
                                )
                              }
                            />
                            <NumberDecrementStepper
                              onClick={() =>
                                handleSessionExerciseClick(
                                  index,
                                  "sets",
                                  exercise.sets - 1
                                )
                              }
                            />
                          </NumberInputStepper>
                        </NumberInput>
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
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { workout } = context.params;

  try {
    const response = await fetch(`${BE_URL}/workouts/${workout}`);
    const data = await response.json();

    const dbWorkout = {
      id: data._id,
      name: data.name,
      notes: data.notes,
      sessions: data.sessions,
      exercises: data.exercises,
    };

    const dbTargetSets = data.exercises.map((exercise) => exercise.sets);

    // set all sessionExercise sets completed to 0
    data.exercises.map((exercise) => (exercise.sets = 0));

    return {
      props: {
        dbWorkout: dbWorkout,
        dbExercises: data.exercises,
        dbTargetSets: dbTargetSets,
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
