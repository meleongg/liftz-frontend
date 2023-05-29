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

import { FaEdit, FaCheck, FaBan } from "react-icons/fa";

const EditableGoal = ({ userId, id, content, goals, setGoals }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [goal, setGoal] = useState(content);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditCheck = async () => {
        const data = {
            content: goal,
            goalId: id,
        };

        try {
            const rawResponse = await fetch(
                `/api/update-goal?userId=${userId}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!rawResponse.ok) {
                if (rawResponse.status === 400) {
                    setError({
                        message: "Goal can't be empty!",
                    });
                    return;
                }
            }

            const { updatedGoal } = await rawResponse.json();

            const updatedGoals = goals.map((goal) => {
                if (goal._id === updatedGoal._id) {
                    return { ...goal, content: updatedGoal.content };
                }
                return goal;
            });
            setGoals(updatedGoals);

            setIsEditing(false);

            router.push(`/authenticated/${userId}`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditCancel = () => {
        setIsEditing(false);
    };

    const handleCheck = async () => {
        const data = {
            goalId: id,
        };

        try {
            const rawResponse = await fetch(
                `/api/delete-goal?userId=${userId}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!rawResponse.ok) {
                if (rawResponse.status === 400) {
                    setError({
                        message: "Couldn't delete goal. Please try again",
                    });
                    return;
                }
            }

            const { deletedGoalId } = await rawResponse.json();

            const filteredGoals = goals.filter(
                (goal) => goal._id !== deletedGoalId
            );
            setGoals(filteredGoals);

            setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            h="50px"
        >
            {error && (
                <Box
                    color="red.50"
                    fontWeight="700"
                    textAlign="center"
                    mb="10px"
                >
                    {error}
                </Box>
            )}
            {!isEditing && <Checkbox onChange={handleCheck}>{goal}</Checkbox>}
            {isEditing && (
                <Editable
                    textAlign="center"
                    defaultValue={goal}
                    pr="8px"
                    w="70%"
                >
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
                        w="50%"
                    >
                        <FaCheck />
                    </Button>
                    <Button
                        bgColor="blue.50"
                        color="white"
                        _hover={{ bg: "lightblue.50" }}
                        onClick={handleEditCancel}
                        w="50%"
                        ml="5px"
                    >
                        <FaBan />
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
