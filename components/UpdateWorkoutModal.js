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
import React, { useEffect, useState } from "react";
import { useWorkoutSession } from "../contexts/workoutSessionContext";

export const UpdateWorkoutModal = ({
  isOpen,
  onClose,
  userId,
  workoutName,
  workoutId,
  workout,
  exerciseChanges,
  updatedData,
}) => {
  const [checked, setChecked] = useState([]);
  const { endWorkoutSession } = useWorkoutSession();

  useEffect(() => {
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
  }, [exerciseChanges]);

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
    // console.log(updatedData);
    console.log(workout);
    const workoutData = updateWorkout();
    console.log(workoutData);

    // try {
    //   const sessionData = updatedData
    //   const rawSessionEndResponse = await fetch("/api/session-end", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updatedData),
    //   });

    //   await fetch(`${BE_URL}/workouts/${workoutId}/update`, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(workoutData),
    //   });

    //   const { sessionId } = await rawSessionEnd.json();
    //   handleEndSession();
    //   router.push(
    //     `/authenticated/${userId}/workouts/${workoutId}/${sessionId}`
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <Modal
      blockScrollOnMount={true}
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
          {exerciseChanges.map((exercise, index) => {
            return (
              <Box key={exercise._id} mt={"10px"}>
                <Text>{exercise.name}</Text>
                <Box>
                  <Box display="flex" justifyContent={"space-around"}>
                    <Text>Sets:</Text>
                    <Text>
                      {exercise.sets[0]} {"->"} {exercise.sets[1]}
                    </Text>
                    <Checkbox
                      id={"session-exercise-sets"}
                      onChange={(e) => handleCheck(e, index)}
                    ></Checkbox>
                  </Box>
                  <Box display="flex" justifyContent={"space-around"}>
                    <Text>Reps:</Text>
                    <Text>
                      {exercise.reps[0]} {"->"} {exercise.reps[1]}
                    </Text>
                    <Checkbox
                      id={"session-exercise-reps"}
                      onChange={(e) => handleCheck(e, index)}
                    ></Checkbox>
                  </Box>
                  <Box display="flex" justifyContent={"space-around"}>
                    <Text>Weight:</Text>
                    <Text>
                      {exercise.weight[0]} {"->"} {exercise.weight[1]}
                    </Text>
                    <Checkbox
                      id={"session-exercise-weight"}
                      onChange={(e) => handleCheck(e, index)}
                    ></Checkbox>
                  </Box>
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
