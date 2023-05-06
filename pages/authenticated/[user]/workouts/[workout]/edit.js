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

const EditWorkout = () => {
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

    router.push(`/authenticated/${userId}/workouts`);
  };

  const handleSubmitButton = async () => {
    const data = {
      workout: workout,
    };

    console.log(data);

    const rawResponse = await fetch(
      `http://localhost:3001/workouts/${workoutId}/update`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const resWorkoutId = await rawResponse.json();

    console.log(resWorkoutId);

    router.push(`/authenticated/${userId}/workouts/${resWorkoutId}`);
  };

  const handleWorkoutChange = (field, newValue) => {
    const updatedWorkout = workout;

    updatedWorkout[field] = newValue;
    setWorkout(updatedWorkout);
  };

  const handleExerciseChange = (index, field, newValue) => {
    const updatedExercises = [...workout.exercises];

    if (field !== "name") {
      newValue = parseInt(newValue);
    }

    updatedExercises[index][field] = newValue;

    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const handleAddExercise = () => {
    const newExercise = {
      name: "Exercise",
      sets: 1,
      reps: 1,
      weight: 45,
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
        </Box>
        <Box display="flex" flexDirection="column" mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Name
          </Text>
          <EditableCell
            value={workout?.name}
            onChange={(newValue) => handleWorkoutChange("name", newValue)}
          />
          <Text fontSize="30px" fontWeight="700">
            Notes
          </Text>
          <EditableCell
            value={workout?.notes}
            onChange={(newValue) => handleWorkoutChange("notes", newValue)}
          />
        </Box>

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
              {workout?.exercises &&
                workout.exercises.map((exercise, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <EditableCell
                          value={exercise.name}
                          onChange={(newValue) =>
                            handleExerciseChange(index, "name", newValue)
                          }
                        />
                      </Td>
                      <Td>
                        <EditableCell
                          value={exercise.sets}
                          onChange={(newValue) =>
                            handleExerciseChange(index, "sets", newValue)
                          }
                        />
                      </Td>
                      <Td>
                        <EditableCell
                          value={exercise.reps}
                          onChange={(newValue) =>
                            handleExerciseChange(index, "reps", newValue)
                          }
                        />
                      </Td>
                      <Td>
                        <EditableCell
                          value={exercise.weight}
                          onChange={(newValue) =>
                            handleExerciseChange(index, "weight", newValue)
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
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export default EditWorkout;
