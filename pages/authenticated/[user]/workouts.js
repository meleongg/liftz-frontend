import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Spinner, Text } from "@chakra-ui/react";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import WorkoutListItem from "../../../components/WorkoutListItem";

import { FaPlus } from "react-icons/fa";
import Head from "next/head";

const metadata = {
    title: "Workout Library | liftz",
    description: "Workout Library page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const WorkoutLibrary = ({ dbUser, dbWorkouts, error }) => {
    const [loading, setLoading] = useState(true);
    const [user] = useState(dbUser);
    const [workouts] = useState(dbWorkouts);

    const router = useRouter();
    const userId = router.query.user;

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

    const handleAddWorkout = () => {
        router.push(`/authenticated/${userId}/new-workout`);
    };

    return (
        <Box minHeight="100vh">
            <Head>
                <title>{metadata.title}</title>
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
                <Title userId={userId} content={"Workout Library"} />
                <Button
                    bgColor="blue.50"
                    color="white"
                    rightIcon={<FaPlus />}
                    _hover={{ bg: "lightBlue.50" }}
                    onClick={handleAddWorkout}
                    mt="20px"
                >
                    New Workout
                </Button>

                <Box mt="30px">
                    {workouts?.map((workout) => {
                        return (
                            <Box
                                w="100%"
                                display="flex"
                                justifyContent="space-between"
                                pt="5px"
                                pb="5px"
                                key={workout._id}
                            >
                                <WorkoutListItem
                                    user={user}
                                    workout={workout}
                                />
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            <Navbar userId={userId} currPage="workouts" />
        </Box>
    );
};

export async function getServerSideProps(context) {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { user } = context.params;

    try {
        const response = await fetch(`${BE_URL}/user/${user}`);
        const data = await response.json();

        const dbUser = {
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        };
        const dbWorkouts = data.workouts;

        return {
            props: {
                dbUser: dbUser,
                dbWorkouts: dbWorkouts,
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

export default WorkoutLibrary;
