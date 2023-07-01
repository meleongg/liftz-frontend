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
    Textarea,
    Editable,
    EditablePreview,
    EditableInput,
    useMediaQuery,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../../../components/Navbar";
import Title from "../../../../../components/Title";
import Head from "next/head";

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

        const rawResponse = await fetch(
            `${BE_URL}/workouts/${workoutId}/update`,
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

        router.push(`/authenticated/${userId}/workouts/${resWorkoutId}`);
    };

    const handleWorkoutChange = (field, newValue) => {
        const updatedWorkout = { ...workout };

        console.log(newValue);

        updatedWorkout[field] = newValue;
        setWorkout(updatedWorkout);
    };

    const handleExerciseClick = (index, field, newValue) => {
        const updatedExercises = [...workout.exercises];

        if (field !== "name") {
            newValue = parseInt(newValue);
        }

        updatedExercises[index][field] = newValue;
        setWorkout({ ...workout, exercises: updatedExercises });
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
                <meta
                    property="og:description"
                    content={metadata.description}
                />
                <meta property="og:image" content={metadata.image} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metadata.title} />
                <meta
                    name="twitter:description"
                    content={metadata.description}
                />
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
                        onChange={(newValue) =>
                            handleWorkoutChange("name", newValue)
                        }
                    />
                    <Text fontSize="30px" fontWeight="700" mt="20px">
                        Notes
                    </Text>
                    <Editable
                        defaultValue={
                            workout?.notes ||
                            "Please delete this text if you would like empty notes."
                        }
                        onChange={(newValue) =>
                            handleWorkoutChange("notes", newValue)
                        }
                    >
                        <EditablePreview>
                            <Textarea readOnly minHeight="200px" />
                        </EditablePreview>
                        <EditableInput as={Textarea} />
                    </Editable>
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
                                                        handleExerciseChange(
                                                            index,
                                                            "name",
                                                            newValue
                                                        )
                                                    }
                                                />
                                            </Td>
                                            <Td>
                                                <NumberInput
                                                    defaultValue={exercise.sets}
                                                    min={0}
                                                    onChange={(newValue) =>
                                                        handleExerciseChange(
                                                            index,
                                                            "sets",
                                                            newValue
                                                        )
                                                    }
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() =>
                                                                handleExerciseClick(
                                                                    index,
                                                                    "sets",
                                                                    exercise.sets +
                                                                        1
                                                                )
                                                            }
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() =>
                                                                handleExerciseClick(
                                                                    index,
                                                                    "sets",
                                                                    exercise.sets -
                                                                        1
                                                                )
                                                            }
                                                        />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td>
                                                <NumberInput
                                                    defaultValue={exercise.reps}
                                                    min={0}
                                                    onChange={(newValue) =>
                                                        handleExerciseChange(
                                                            index,
                                                            "reps",
                                                            newValue
                                                        )
                                                    }
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() =>
                                                                handleExerciseClick(
                                                                    index,
                                                                    "reps",
                                                                    exercise.reps +
                                                                        1
                                                                )
                                                            }
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() =>
                                                                handleExerciseClick(
                                                                    index,
                                                                    "reps",
                                                                    exercise.reps -
                                                                        1
                                                                )
                                                            }
                                                        />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Td>
                                            <Td>
                                                <NumberInput
                                                    defaultValue={
                                                        exercise.weight
                                                    }
                                                    min={0}
                                                    onChange={(newValue) =>
                                                        handleExerciseChange(
                                                            index,
                                                            "weight",
                                                            newValue
                                                        )
                                                    }
                                                >
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper
                                                            onClick={() =>
                                                                handleExerciseClick(
                                                                    index,
                                                                    "weight",
                                                                    exercise.weight +
                                                                        1
                                                                )
                                                            }
                                                        />
                                                        <NumberDecrementStepper
                                                            onClick={() =>
                                                                handleExerciseClick(
                                                                    index,
                                                                    "weight",
                                                                    exercise.weight -
                                                                        1
                                                                )
                                                            }
                                                        />
                                                    </NumberInputStepper>
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
                                                    onClick={() =>
                                                        handleDeleteExercise(
                                                            index
                                                        )
                                                    }
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
