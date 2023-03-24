import React, { useState } from "react";

import { useRouter } from "next/router";

import {
  Editable,
  EditablePreview,
  EditableInput,
  Button,
  Box,
  Checkbox,
} from "@chakra-ui/react";

import { FaEdit, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const EditableGoal = ({ id, content, goals, setGoals }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goal, setGoal] = useState(content);
  const router = useRouter();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditCheck = async () => {
    console.log("edit check clicked");

    const data = {
      content: goal,
      goalId: id,
    };

    const rawResponse = await fetch("http://localhost:3001/update-goal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const goalId = await rawResponse.json();

    const updatedGoals = goals.map((goal) => {
      if (goal._id === goalId) {
        return { ...goal, content: goal };
      }
      return goal;
    });
    setGoals(updatedGoals);

    setIsEditing(false);

    router.push("/");
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleCheck = async () => {
    const data = {
      goalId: id,
    };

    const rawResponse = await fetch("http://localhost:3001/delete-goal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const goalId = await rawResponse.json();

    const filteredGoals = goals.filter((goal) => goal._id !== goalId);
    setGoals(filteredGoals);

    setIsEditing(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      h="50px"
    >
      {!isEditing && <Checkbox onChange={handleCheck}>{goal}</Checkbox>}
      {isEditing && (
        <Editable textAlign="center" defaultValue={goal} pr="8px" w="70%">
          <EditablePreview />
          <EditableInput onChange={(e) => setGoal(e.target.value)} />
        </Editable>
      )}
      {isEditing && (
        <Box display="flex" justifyContent="space-between" w="100px">
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightblue.50" }}
            onClick={handleEditCheck}
          >
            <FaCheck />
          </Button>
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightblue.50" }}
            onClick={handleEditCancel}
          >
            <IoClose />
          </Button>
        </Box>
      )}
      {!isEditing && (
        <Button
          bgColor="blue.50"
          color="white"
          _hover={{ bg: "lightblue.50" }}
          onClick={handleEditClick}
        >
          <FaEdit />
        </Button>
      )}
    </Box>
  );
};

export default EditableGoal;
