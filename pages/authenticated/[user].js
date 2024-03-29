import { Box, Button, VStack, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GoalForm from "../../components/GoalForm";
import EditableGoal from "../../components/EditableGoal";
import Navbar from "../../components/Navbar";
import Title from "../../components/Title";

import { FaPlus } from "react-icons/fa";
import Head from "next/head";

const metadata = {
    title: "Home | liftz",
    description: "Home page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const Home = ({ dbUser, dbGoals, error }) => {
    const [user] = useState(dbUser);
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [goals, setGoals] = useState(dbGoals);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const userId = router.query.user;

    const getRandomNumber = (max) => {
        return Math.floor(Math.random() * (max + 1));
    };

    const quotesArr = [
        "Leg day everyday.",
        "Platella, Dumbella, and Barbella will always be there for you.",
        "Sweat now, shine later.",
        "The only bad workout is the one that didn't happen.",
        "Gym hair, don't care.",
        "Muscles are like a good joke - they're better when you don't have to explain them.",
        "You don't have to be great to start, but you have to start to be great.",
        "If it doesn't challenge you, it doesn't change you.",
        "Squat like nobody's watching.",
        "The only bad workout is the one you didn't log on Instagram.",
        "The gym is my therapy, and sweat is my sanity.",
        "Life is too short to skip leg day.",
        "Stronger every day, except for leg day - that's just pain.",
        "You can't spell legendary without leg day.",
        "The only time success comes before work is in the dictionary - so keep working!",
        "You don't need a six-pack to impress anyone, but it doesn't hurt to have one.",
        "Sweat is just your fat crying.",
        "The only limit is the one you set for yourself - so set the bar high and lift it higher.",
        "Your only competition is the person you were yesterday.",
        "Embrace the pain, and let it fuel your determination.",
        "Keep going, because you didn't come this far to only come this far.",
        "Every step counts, no matter how small. Progress is progress.",
        "Push yourself because no one else is going to do it for you.",
        "Make your body the strongest and healthiest it's ever been.",
        "The harder you work, the stronger you become.",
        "Believe in yourself and all that you are capable of achieving.",
        "Success is earned, not given. Keep putting in the effort.",
        "Your body can stand almost anything. It's your mind you have to convince.",
    ];

    useEffect(() => {
        let index = getRandomNumber(quotesArr.length - 1);
        setQuoteIndex(index);

        setLoading(false);
    }, [quotesArr.length]);

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

    const handleAddGoal = () => {
        setShowGoalForm(true);
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
                <Title userId={userId} content={`Hi ${user.firstName}!`} />
                <Text fontSize="18px" mt="20px" pb="30px">
                    {quotesArr[quoteIndex]}
                </Text>
                <Box pb="20px">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        pb="10px"
                    >
                        <Text fontSize="30px" fontWeight="700">
                            Goals
                        </Text>
                        <Button
                            bgColor="blue.50"
                            color="white"
                            _hover={{ bg: "lightBlue.50" }}
                            rightIcon={<FaPlus />}
                            onClick={handleAddGoal}
                        >
                            New Goal
                        </Button>
                    </Box>
                    {showGoalForm && (
                        <GoalForm
                            userId={userId}
                            setShowGoalForm={setShowGoalForm}
                            goals={goals}
                            setGoals={setGoals}
                        />
                    )}
                    <VStack spacing="10px" align="start" minHeight="150px">
                        {goals?.map((goal) => {
                            return (
                                <Box
                                    w="100%"
                                    display="flex"
                                    justifyContent="space-between"
                                    pt="5px"
                                    pb="5px"
                                    key={goal._id}
                                >
                                    <EditableGoal
                                        userId={userId}
                                        id={goal._id}
                                        content={goal.content}
                                        goals={goals}
                                        setGoals={setGoals}
                                    />
                                </Box>
                            );
                        })}
                    </VStack>
                </Box>
            </Box>
            <Navbar userId={userId} currPage="home" />
        </Box>
    );
};

export async function getServerSideProps(context) {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const { user } = context.params;

    try {
        const response = await fetch(`${BE_URL}/user/${user}`);
        const data = await response.json();

        return {
            props: {
                dbUser: {
                    id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                },
                dbGoals: data.goals,
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

export default Home;
