import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Head from "next/head";
import Navbar from "../../../../../components/Navbar";
import Title from "../../../../../components/Title";
import { useWorkoutSession } from "../../../../../contexts/workoutSessionContext";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";

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
  const { workoutSession, updateWorkoutSession, endWorkoutSession } =
    useWorkoutSession();
  const [sessionExercises, setSessionExercises] = useState(dbExercises);
  const [targetSets, setTargetSets] = useState(dbTargetSets);
  const [workout, setWorkout] = useState(dbWorkout);
  const [loading, setLoading] = useState(true);

  const handleEndSession = () => {
    // Logic to end the workout session
    endWorkoutSession();
  };

  const handleUpdateSession = () => {
    const workoutSessionData = {};
    workoutSessionData.workout = workout;
    workoutSessionData.sessionExercises = sessionExercises;
    workoutSessionData.targetSets = targetSets;

    console.log(
      "🚀 ~ file: session.js:77 ~ handleUpdateSession ~ workoutSessionData",
      workoutSessionData
    );
    updateWorkoutSession(workoutSessionData);
  };

  const router = useRouter();
  const userId = router.query.user;
  const workoutId = router.query.workout;

  useEffect(() => {
    const handleStartSession = (sessionData) => {
      // Logic to start the workout session
      updateWorkoutSession(sessionData);
    };

    setLoading(false);

    if (workoutSession) {
      // TODO: add this context check in the "Start" button in the workout page, a modal should popup informing the user that there is an existing workout session in progress and a link to go to that session
      // redirect user to correct workout session id
      if (workoutSession.workout.id !== workoutId) {
        router.push(
          `/authenticated/${userId}/workouts/${workoutSession.workout.id}/session`
        );
      }

      // an existing workout session is in progress
      console.log(
        "🚀 ~ file: session.js:76 ~ useEffect ~ workoutSession:",
        workoutSession
      );
      setSessionExercises(workoutSession.sessionExercises);
      setTargetSets(workoutSession.targetSets);
      setWorkout(workoutSession.workout);
      // set the workout session data to be workoutSession
    } else {
      setSessionExercises(dbExercises);
      setTargetSets(dbTargetSets);
      setWorkout(dbWorkout);

      console.log("created new workout session data");

      const workoutSessionData = {};
      workoutSessionData.workout = dbWorkout;
      workoutSessionData.sessionExercises = dbExercises;
      workoutSessionData.targetSets = dbTargetSets;

      handleStartSession(workoutSessionData);
    }
  }, [
    dbExercises,
    dbTargetSets,
    dbWorkout,
    workoutSession,
    updateWorkoutSession,
    router,
    userId,
    workoutId,
  ]);

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
    const data = {
      userId: userId,
      workout: workout,
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

      handleEndSession();

      router.push(
        `/authenticated/${userId}/workouts/${workoutId}/${sessionId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSessionExerciseChange = (index, field, newValue) => {
    if (newValue == "NaN") {
      return;
    }

    if (field === "weight" && newValue === "") {
      newValue = 0;
    }

    const updatedSessionExercises = [...sessionExercises];

    if (field !== "name" && typeof newValue === "string") {
      newValue = newValue.trim() === "" ? 0 : parseInt(newValue);
    }

    updatedSessionExercises[index][field] = newValue;
    setSessionExercises(updatedSessionExercises);
    handleUpdateSession();
  };

  const handleSessionExerciseClick = (index, field, newValue) => {
    if (newValue < 0) {
      return;
    }

    const updatedSessionExercises = [...sessionExercises];

    updatedSessionExercises[index][field] = parseInt(newValue);
    setSessionExercises(updatedSessionExercises);
    handleUpdateSession();
  };

  const handleAddSessionExercise = () => {
    const newSessionExercise = {
      temp_id: uuidv4(),
      name: "Exercise",
      sets: 0,
      reps: 0,
      weight: 0,
    };
    const newTargetSets = null;

    setSessionExercises([...sessionExercises, newSessionExercise]);
    setTargetSets([...targetSets, newTargetSets]);
    handleUpdateSession();
  };

  const handleDeleteSessionExercise = (index) => {
    const updatedSessionExercises = [...sessionExercises];
    updatedSessionExercises.splice(index, 1);

    const updatedTargetSets = [...targetSets];
    updatedTargetSets.splice(index, 1);

    setSessionExercises(updatedSessionExercises);
    setTargetSets(updatedTargetSets);
    handleUpdateSession();
  };

  const handleTextareaChange = (e) => {
    let inputValue = e.target.value;

    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      notes: inputValue,
    }));
    handleUpdateSession();
  };

  const switchExercisesWithBelow = (index) => {
    // Get a copy of the exercises array from state
    const updatedSessionExercises = [...sessionExercises];
    const updatedTargetSets = [...targetSets];

    // Check if the index is within valid bounds and there is a next exercise
    if (index < updatedSessionExercises.length - 1) {
      // Swap the exercises
      [updatedSessionExercises[index], updatedSessionExercises[index + 1]] = [
        updatedSessionExercises[index + 1],
        updatedSessionExercises[index],
      ];
      [updatedTargetSets[index], updatedTargetSets[index + 1]] = [
        updatedTargetSets[index + 1],
        updatedTargetSets[index],
      ];
    } else if (index === updatedSessionExercises.length - 1) {
      // Wrap-around case
      [updatedSessionExercises[index], updatedSessionExercises[0]] = [
        updatedSessionExercises[0],
        updatedSessionExercises[index],
      ];
      [updatedTargetSets[index], updatedTargetSets[0]] = [
        updatedTargetSets[0],
        updatedTargetSets[index],
      ];
    }

    setSessionExercises(updatedSessionExercises);
    setTargetSets(updatedTargetSets);
    handleUpdateSession();
  };

  const switchExercisesWithAbove = (index) => {
    // Get a copy of the exercises array from state
    const updatedSessionExercises = [...sessionExercises];
    const updatedTargetSets = [...targetSets];

    // Wrap-around case
    if (index === 0) {
      const lastIndex = updatedSessionExercises.length - 1;
      [updatedSessionExercises[lastIndex], updatedSessionExercises[index]] = [
        updatedSessionExercises[index],
        updatedSessionExercises[lastIndex],
      ];
      [updatedTargetSets[lastIndex], updatedTargetSets[index]] = [
        updatedTargetSets[index],
        updatedTargetSets[lastIndex],
      ];
    } else if (index > 0) {
      // Swap the exercises
      [updatedSessionExercises[index - 1], updatedSessionExercises[index]] = [
        updatedSessionExercises[index],
        updatedSessionExercises[index - 1],
      ];
      [updatedTargetSets[index - 1], updatedTargetSets[index]] = [
        updatedTargetSets[index],
        updatedTargetSets[index - 1],
      ];
    }

    setSessionExercises(updatedSessionExercises);
    setTargetSets(updatedTargetSets);
    handleUpdateSession();
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
        pl={["10px", "50px", "100px", "100px", "100px"]}
        pr={["10px", "50px", "100px", "100px", "100px"]}
        pb="80px"
      >
        <Title userId={userId} content={`${workout?.name}`} />

        <Box
          mt="20px"
          borderRadius="20px"
          p="14px"
          bgColor="blue.50"
          color="white"
        >
          <Text fontSize="18px" fontWeight="700" textAlign="center">
            Click/tap on each field to edit its value!
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Notes
          </Text>
          <Textarea
            value={workout?.notes}
            onChange={handleTextareaChange}
          ></Textarea>
        </Box>

        <Box overflowX="auto" mt="20px">
          <Table>
            <Thead>
              <Tr>
                <Th>Reorder</Th>
                <Th minWidth="200px">Exercise</Th>
                <Th minWidth="150px">Target Sets</Th>
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
                    <Tr key={exercise._id || exercise.temp_id}>
                      {/* Reorder */}
                      <Td>
                        <Box
                          display="flex"
                          justifyContent="start"
                          alignItems="center"
                          fontSize="24px"
                          fontWeight="700"
                        >
                          <Box
                            onClick={() => switchExercisesWithAbove(index)}
                            _hover={{
                              cursor: "pointer",
                            }}
                          >
                            <FaAngleUp />
                          </Box>
                          <Box
                            onClick={() => switchExercisesWithBelow(index)}
                            _hover={{
                              cursor: "pointer",
                            }}
                            ml="10px"
                          >
                            <FaAngleDown />
                          </Box>
                        </Box>
                      </Td>
                      {/* Exercise */}
                      <Td>
                        <EditableCell
                          w="150px"
                          value={exercise.name}
                          onChange={(newValue) =>
                            handleSessionExerciseChange(index, "name", newValue)
                          }
                        />
                      </Td>
                      {/* Target Sets */}
                      <Td>{targetSets[index] ? targetSets[index] : ""}</Td>
                      {/* Sets Done */}
                      <Td>
                        <NumberInput
                          minWidth="150px"
                          defaultValue={exercise.sets || 0}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                handleSessionExerciseClick(
                                  index,
                                  "sets",
                                  exercise.sets + 1
                                );
                              }}
                            />
                            <NumberDecrementStepper
                              onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                handleSessionExerciseClick(
                                  index,
                                  "sets",
                                  exercise.sets - 1
                                );
                              }}
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      {/* Reps */}
                      <Td>
                        <NumberInput
                          minWidth="150px"
                          defaultValue={exercise.reps || 0}
                          min={0}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={() =>
                                handleSessionExerciseClick(
                                  index,
                                  "reps",
                                  exercise.reps + 1
                                )
                              }
                            />
                            <NumberDecrementStepper
                              onClick={() =>
                                handleSessionExerciseClick(
                                  index,
                                  "reps",
                                  exercise.reps - 1
                                )
                              }
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      {/* Weight */}
                      <Td>
                        <NumberInput
                          minWidth="150px"
                          defaultValue={exercise.weight || 0}
                          min={0}
                          onChange={(newValue) =>
                            handleSessionExerciseChange(
                              index,
                              "weight",
                              newValue
                            )
                          }
                        >
                          <NumberInputField />
                        </NumberInput>
                      </Td>
                      <Td>
                        <Button
                          bgColor="blue.50"
                          color="white"
                          _hover={{
                            bg: "lightBlue.50",
                          }}
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
            w="100px"
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
            w="100px"
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

    // set each exercise's sets to 0 (SETS DONE)
    data.exercises = data.exercises.map((exercise) => {
      return { ...exercise, sets: 0 };
    });

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
