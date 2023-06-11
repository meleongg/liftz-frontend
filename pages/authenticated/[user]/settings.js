import { Box, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import ChangeEmailForm from "../../../components/ChangeEmailForm";
import ChangePasswordForm from "../../../components/ChangePasswordForm";
import DeleteAccount from "../../../components/DeleteAccount";
import { FaCheckCircle } from "react-icons/fa";
import Head from "next/head";

const metadata = {
    title: "Settings | liftz",
    description: "Settings page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

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
            {message && (
                <Box
                    w="100%"
                    textAlign="center"
                    bgColor="blue.50"
                    color="white"
                    h="40px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pl="20px"
                    pr="20px"
                >
                    <Text>{message}</Text>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="20px"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => setMessage(null)}
                    >
                        <FaCheckCircle />
                    </Box>
                </Box>
            )}
            <Box
                minHeight="calc(100vh - 80px)"
                pt="30px"
                pl={isLargerThan768 ? "100px" : "10px"}
                pr={isLargerThan768 ? "100px" : "10px"}
                pb="80px"
            >
                <Title userId={userId} content={"Settings"} />
                <Box
                    mt="20px"
                    mb="30px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box mt="20px">
                        <Text
                            fontSize="24px"
                            fontWeight="700"
                            mb="10px"
                            textAlign="center"
                        >
                            Change Email
                        </Text>
                        <ChangeEmailForm
                            userId={userId}
                            setMessage={setMessage}
                        />
                    </Box>
                    <Box mt="40px" mb="40px">
                        <Text
                            fontSize="24px"
                            fontWeight="700"
                            mb="10px"
                            textAlign="center"
                        >
                            Change Password
                        </Text>
                        <ChangePasswordForm
                            userId={userId}
                            setMessage={setMessage}
                        />
                    </Box>
                    <Box
                        mb="20px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text
                            fontSize="24px"
                            fontWeight="700"
                            mb="10px"
                            textAlign="center"
                        >
                            Delete Account
                        </Text>
                        <Text
                            color="red"
                            fontSize="14px"
                            fontWeight="700"
                            mb="10px"
                            textAlign="center"
                        >
                            WARNING: All information associated with this
                            account will be deleted.
                        </Text>
                        <DeleteAccount
                            userId={userId}
                            setMessage={setMessage}
                        />
                    </Box>
                </Box>
            </Box>
            <Navbar userId={userId} currPage="home" />
        </Box>
    );
};

export default Settings;
