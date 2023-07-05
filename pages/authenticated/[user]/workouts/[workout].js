import {
    Box,
    Button,
    Spinner,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../../components/Navbar";
import Title from "../../../../components/Title";
import Head from "next/head";

const metadata = {
    description: "Workout page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const Workout = ({ dbWorkout, error }) => {
    const [workout] = useState(dbWorkout);
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

    const handleEditButton = () => {
        router.push(`/authenticated/${userId}/workouts/${workoutId}/edit`);
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

    const handleStartButton = () => {
        router.push(`/authenticated/${userId}/workouts/${workoutId}/session`);
    };

    return (
        <Box minHeight="100vh">
            <Head>
                <title>{`${workout?.name} | liftz`}</title>
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
                pl={["10px", "50px", "100px", "100px", "100px"]}
                pr={["10px", "50px", "100px", "100px", "100px"]}
                pb="80px"
            >
                <Title user={userId} content={`${workout?.name}`} />
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

                    <Button
                        bgColor="blue.50"
                        color="white"
                        _hover={{ bg: "lightBlue.50" }}
                        onClick={handleEditButton}
                        mt="10px"
                        mb="10px"
                        ml="10px"
                    >
                        Edit
                    </Button>
                </Box>
                <Box display="flex" flexDirection="column" mt="20px" mb="20px">
                    <Text fontSize="30px" fontWeight="700">
                        Notes
                    </Text>
                    <Text>{workout?.notes}</Text>
                </Box>

                <Table>
                    <Thead>
                        <Tr>
                            <Th>Exercise</Th>
                            <Th>Sets</Th>
                            <Th>Reps</Th>
                            <Th>Weight</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {workout &&
                            workout.exercises &&
                            workout.exercises.map((exercise) => {
                                return (
                                    <Tr key={exercise._id}>
                                        <Td>{exercise.name}</Td>
                                        <Td>{exercise.sets}</Td>
                                        <Td>{exercise.reps}</Td>
                                        <Td>{exercise.weight}</Td>
                                    </Tr>
                                );
                            })}
                    </Tbody>
                </Table>

                <Box
                    w="100%"
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    mt="50px"
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
                        onClick={handleStartButton}
                        mt="10px"
                        mb="10px"
                    >
                        Start
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

export default Workout;
