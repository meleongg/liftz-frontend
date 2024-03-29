import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  NumberInput,
  NumberInputField,
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

import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const metadata = {
  description: "Login page",
  image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const EditableCell = ({ value, onChange }) => {
  return (
    <Editable defaultValue={value} w="150px">
      <EditablePreview>{value}</EditablePreview>
      <EditableInput onChange={(e) => onChange(e.target.value)} />
    </Editable>
  );
};

const EditWorkout = ({ dbWorkout, error }) => {
  const [workout, setWorkout] = useState(dbWorkout);
  const [loading, setLoading] = useState(true);

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

  const handleBackButton = () => {
    router.push(`/authenticated/${userId}/workouts`);
  };

  const handleDeleteButton = async () => {
    const data = {
      userId: userId,
      workoutId: workoutId,
    };

    try {
      const rawResponse = await fetch("/api/delete-workout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await rawResponse.json();

      router.push(`/authenticated/${userId}/workouts`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitButton = async () => {
    const data = {
      workout: workout,
    };

    const rawResponse = await fetch(`${BE_URL}/workouts/${workoutId}/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resWorkoutId = await rawResponse.json();

    router.push(`/authenticated/${userId}/workouts/${resWorkoutId}`);
  };

  const handleWorkoutChange = (field, newValue) => {
    const updatedWorkout = { ...workout };

    updatedWorkout[field] = newValue;
    setWorkout(updatedWorkout);
  };

  const handleExerciseChange = (index, field, newValue) => {
    const updatedExercises = [...workout.exercises];

    if (field !== "name") {
      newValue = parseFloat(newValue);
    }

    updatedExercises[index][field] = newValue;

    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleAddExercise = () => {
    const newExercise = {
      temp_id: uuidv4(),
      position: workout.exercises.length + 1,
      name: "Exercise",
      sets: 0,
      reps: 0,
      weight: 0,
      workout: workoutId,
    };

    let updatedExercises = [...workout.exercises];
    updatedExercises = [...updatedExercises, newExercise];

    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleDeleteExercise = (index) => {
    let updatedExercises = [...workout.exercises];
    updatedExercises.splice(index, 1);
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleTextareaChange = (e) => {
    let inputValue = e.target.value;

    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      notes: inputValue,
    }));
  };

  const switchExercisesWithBelow = (index) => {
    // Get a copy of the exercises array from state
    const updatedExercises = [...workout.exercises];

    // Check if the index is within valid bounds and there is a next exercise
    if (index < updatedExercises.length - 1) {
      // Swap their positions
      let temp = updatedExercises[index].position;
      updatedExercises[index].position = updatedExercises[index + 1].position;
      updatedExercises[index + 1].position = temp;

      // Swap the exercises
      [updatedExercises[index], updatedExercises[index + 1]] = [
        updatedExercises[index + 1],
        updatedExercises[index],
      ];
    } else if (index === updatedExercises.length - 1) {
      // Swap their positions
      let temp = updatedExercises[index].position;
      updatedExercises[index].position = updatedExercises[0].position;
      updatedExercises[0].position = temp;

      // Wrap-around case
      [updatedExercises[index], updatedExercises[0]] = [
        updatedExercises[0],
        updatedExercises[index],
      ];
    }

    // Update the state with the modified exercises array
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const switchExercisesWithAbove = (index) => {
    // Get a copy of the exercises array from state
    const updatedExercises = [...workout.exercises];

    // Wrap-around case
    if (index === 0) {
      const lastIndex = updatedExercises.length - 1;

      // Swap their positions
      let temp = updatedExercises[index].position;
      updatedExercises[index].position = updatedExercises[lastIndex].position;
      updatedExercises[lastIndex].position = temp;

      [updatedExercises[lastIndex], updatedExercises[index]] = [
        updatedExercises[index],
        updatedExercises[lastIndex],
      ];
    } else if (index > 0) {
      // Swap their positions
      let temp = updatedExercises[index - 1].position;
      updatedExercises[index - 1].position = updatedExercises[index].position;
      updatedExercises[index].position = temp;

      // Swap the exercises
      [updatedExercises[index - 1], updatedExercises[index]] = [
        updatedExercises[index],
        updatedExercises[index - 1],
      ];
    }

    // Update the state with the modified exercises array
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  return (
    <Box minHeight="100vh">
      <Head>
        <title>{`Edit ${workout?.name} | liftz`}</title>
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
        </Box>
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
            Name
          </Text>
          <EditableCell
            value={workout?.name}
            onChange={(newValue) => handleWorkoutChange("name", newValue)}
          />
          <Box display="flex" flexDirection="column" mt="20px" mb="20px">
            <Text fontSize="30px" fontWeight="700">
              Notes
            </Text>
            <Textarea
              value={workout?.notes}
              onChange={handleTextareaChange}
            ></Textarea>
          </Box>
        </Box>

        <Box overflowX="auto">
          <Table>
            <Thead>
              <Tr>
                <Th>Reorder</Th>
                <Th>Exercise</Th>
                <Th>Sets</Th>
                <Th>Reps</Th>
                <Th>Weight</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {workout.exercises.map((exercise, index) => {
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
                        value={exercise.name}
                        onChange={(newValue) =>
                          handleExerciseChange(index, "name", newValue)
                        }
                      />
                    </Td>
                    {/* Sets */}
                    <Td>
                      <NumberInput
                        minWidth="80px"
                        defaultValue={exercise.sets || 0}
                        min={0}
                        onChange={(newValue) =>
                          handleExerciseChange(index, "sets", newValue)
                        }
                      >
                        <NumberInputField />
                      </NumberInput>
                    </Td>
                    {/* Reps */}
                    <Td>
                      <NumberInput
                        minWidth="80px"
                        defaultValue={exercise.reps || 0}
                        min={0}
                        onChange={(newValue) =>
                          handleExerciseChange(index, "reps", newValue)
                        }
                      >
                        <NumberInputField />
                      </NumberInput>
                    </Td>
                    <Td>
                      <NumberInput
                        minWidth="80px"
                        defaultValue={exercise.weight || 0}
                        min={0}
                        onChange={(newValue) =>
                          handleExerciseChange(index, "weight", newValue)
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
                        onClick={() => handleDeleteExercise(index)}
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
                    onClick={handleAddExercise}
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
            onClick={handleDeleteButton}
            mt="10px"
            mb="10px"
            w="100px"
          >
            Delete
          </Button>

          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleSubmitButton}
            mt="10px"
            mb="10px"
            w="100px"
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { workout } = context.params;
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

    return {
      props: {
        dbWorkout: dbWorkout,
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

export default EditWorkout;
