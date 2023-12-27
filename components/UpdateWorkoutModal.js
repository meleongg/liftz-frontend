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

export const UpdateWorkoutModal = ({
  isOpen,
  onClose,
  userId,
  workoutName,
  workoutId,
  exerciseChanges,
}) => {
  const [checked, setChecked] = useState([]);

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

  const handleCheck = (e, index) => {
    if (e.target.className.includes("session-exercise-sets")) {
      let newChecked = [...checked];
      newChecked[index].sets = e.target.checked;
      setChecked(newChecked);
    } else if (e.target.className.includes("session-exercise-reps")) {
      let newChecked = [...checked];
      newChecked[index].reps = e.target.checked;
      setChecked(newChecked);
    } else if (e.target.className.includes("session-exercise-weight")) {
      let newChecked = [...checked];
      newChecked[index].weight = e.target.checked;
      setChecked(newChecked);
    }
  };

  const handleContinueButton = async () => {
    // try {
    //   const rawResponse = await fetch("/api/session-end", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const { sessionId } = await rawResponse.json();
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
                      className={"session-exercise-sets"}
                      onChange={(e) => handleCheck(e, index)}
                    ></Checkbox>
                  </Box>
                  <Box display="flex" justifyContent={"space-around"}>
                    <Text>Reps:</Text>
                    <Text>
                      {exercise.reps[0]} {"->"} {exercise.reps[1]}
                    </Text>
                    <Checkbox
                      className={"session-exercise-reps"}
                      onChange={(e) => handleCheck(e, index)}
                    ></Checkbox>
                  </Box>
                  <Box display="flex" justifyContent={"space-around"}>
                    <Text>Weight:</Text>
                    <Text>
                      {exercise.weight[0]} {"->"} {exercise.weight[1]}
                    </Text>
                    <Checkbox
                      className={"session-exercise-weight"}
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
