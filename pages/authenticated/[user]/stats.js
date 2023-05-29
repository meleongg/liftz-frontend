import { Box, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import PRChart from "../../../components/PRChart";
import Head from "next/head";

const metadata = {
    title: "PR Tracker | liftz",
    description: "PR Tracker page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const Stats = ({ dbPrs, error }) => {
    const [loading, setLoading] = useState(true);

    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

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
                pl={isLargerThan768 ? "100px" : "10px"}
                pr={isLargerThan768 ? "100px" : "10px"}
            >
                <Title userId={userId} content={"PR Progress"} />
                <Box mt="20px" display="flex" flexDirection="column" mb="20px">
                    <Box
                        borderRadius="20px"
                        p="14px"
                        bgColor="blue.50"
                        color="white"
                        mt="20px"
                        mb="20px"
                    >
                        <Text>
                            PRs are automatically created for each of your
                            exercises. Each PR will update every time you
                            complete a session where you hit a new PR!
                        </Text>
                    </Box>
                    {dbPrs &&
                        dbPrs.map((pr, index) => {
                            return (
                                <Box key={index} mt="20px">
                                    <PRChart pr={pr} />
                                </Box>
                            );
                        })}
                </Box>
            </Box>
            <Navbar userId={userId} currPage="stats" />
        </Box>
    );
};

export async function getServerSideProps(context) {
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { user } = context.params;

    try {
        const response = await fetch(`${BE_URL}/stats/${user}`);
        const data = await response.json();

        return {
            props: {
                dbPrs: data,
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

export default Stats;
