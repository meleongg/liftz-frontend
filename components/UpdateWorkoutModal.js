import {
  Box,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useWorkoutSession } from "../contexts/workoutSessionContext";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const UpdateWorkoutModal = ({
  isOpen,
  onClose,
  userId,
  workoutName,
  workoutId,
  workout,
  originalExercises,
  changedExercises,
  updatedData,
}) => {
  const [checked, setChecked] = useState([]);
  const { endWorkoutSession } = useWorkoutSession();
  const [exerciseChanges, setExerciseChanges] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const exerciseChanges = calculateSessionExerciseChanges(
      originalExercises,
      changedExercises
    );
    setExerciseChanges(exerciseChanges);

    setChecked(
      exerciseChanges.map((exercise) => {
        return {
          exerciseId: exercise._id,
          sets: false,
          reps: false,
          weight: false,
        };
      })
    );
  }, [changedExercises, originalExercises]);

  const calculateSessionExerciseChanges = (original, changes) => {
    const exerciseChanges = [];

    for (let i = 0; i < changes.length; i++) {
      const changedExercise = changes[i];

      for (let j = 0; j < original.length; j++) {
        const originalExercise = original[j];
        if (
          changedExercise._id &&
          changedExercise._id === originalExercise._id
        ) {
          // Exercise exists in original and changes
          // Check if the fields are different (except _id)
          const fieldChanges = {};

          for (const field in changedExercise) {
            if (changedExercise[field] !== originalExercise[field]) {
              fieldChanges[field] = [
                originalExercise[field],
                changedExercise[field],
              ];
            }
          }

          if (Object.keys(fieldChanges).length > 0) {
            fieldChanges["name"] = originalExercise["name"];
            fieldChanges["_id"] = changedExercise._id;

            exerciseChanges.push(fieldChanges);
          }
        }
      }
    }

    return exerciseChanges;
  };

  const handleEndSession = () => {
    // Logic to end the workout session
    endWorkoutSession();
  };

  const handleCheck = (e, index) => {
    if (e.target.id === "session-exercise-sets") {
      let newChecked = [...checked];
      newChecked[index].sets = e.target.checked;
      setChecked(newChecked);
    } else if (e.target.id === "session-exercise-reps") {
      let newChecked = [...checked];
      newChecked[index].reps = e.target.checked;
      setChecked(newChecked);
    } else if (e.target.id === "session-exercise-weight") {
      let newChecked = [...checked];
      newChecked[index].weight = e.target.checked;
      setChecked(newChecked);
    }
  };

  const updateWorkout = () => {
    let updatedWorkout = { ...workout };

    for (let i = 0; i < checked.length; i++) {
      for (let j = 0; j < workout.exercises.length; j++) {
        if (checked[i].exerciseId === workout.exercises[j]._id) {
          if (checked[i].sets) {
            updatedWorkout.exercises[j].sets = exerciseChanges[i].sets[1];
          }
          if (checked[i].reps) {
            updatedWorkout.exercises[j].reps = exerciseChanges[i].reps[1];
          }
          if (checked[i].weight) {
            updatedWorkout.exercises[j].weight = exerciseChanges[i].weight[1];
          }
        }
      }
    }

    return updatedWorkout;
  };

  const handleContinueButton = async () => {
    let workoutData = updateWorkout();
    workoutData = {
      workout: workoutData,
    };

    try {
      const rawSessionEndResponse = await fetch("/api/session-end", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      await fetch(`${BE_URL}/workouts/${workoutId}/update`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutData),
      });

      const { sessionId } = await rawSessionEndResponse.json();
      handleEndSession();
      router.push(
        `/authenticated/${userId}/workouts/${workoutId}/${sessionId}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{workoutName} Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Please check off any workout exercise changes you would like to
            keep!
          </Text>
          <Text mt={"5px"}>This will update your workout data.</Text>
          {exerciseChanges.length > 0 &&
            exerciseChanges?.map((exercise, index) => {
              return (
                <Box key={exercise?._id} mt={"10px"}>
                  <Text>{exercise?.name}</Text>
                  <Box>
                    {Object.keys(exercise).includes("sets") && (
                      <Box display="flex" justifyContent={"space-around"}>
                        <Text>Sets:</Text>
                        <Text>
                          {exercise?.sets[0]} {"->"} {exercise?.sets[1]}
                        </Text>
                        <Checkbox
                          id={"session-exercise-sets"}
                          onChange={(e) => handleCheck(e, index)}
                        ></Checkbox>
                      </Box>
                    )}
                    {Object.keys(exercise).includes("reps") && (
                      <Box display="flex" justifyContent={"space-around"}>
                        <Text>Reps:</Text>
                        <Text>
                          {exercise?.reps[0]} {"->"} {exercise?.reps[1]}
                        </Text>
                        <Checkbox
                          id={"session-exercise-reps"}
                          onChange={(e) => handleCheck(e, index)}
                        ></Checkbox>
                      </Box>
                    )}
                    {Object.keys(exercise).includes("weight") && (
                      <Box display="flex" justifyContent={"space-around"}>
                        <Text>Weight:</Text>
                        <Text>
                          {exercise?.weight[0]} {"->"} {exercise?.weight[1]}
                        </Text>
                        <Checkbox
                          id={"session-exercise-weight"}
                          onChange={(e) => handleCheck(e, index)}
                        ></Checkbox>
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{
              bg: "lightBlue.50",
            }}
            mt="10px"
            mb="10px"
            onClick={handleContinueButton}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
