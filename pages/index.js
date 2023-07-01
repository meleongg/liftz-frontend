import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { Box, Text, useMediaQuery, Link } from "@chakra-ui/react";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";

const metadata = {
    title: "liftz",
    description: "liftz landing page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

import {
    FaListAlt,
    FaCalendar,
    FaDumbbell,
    FaSignal,
    FaStar,
} from "react-icons/fa";

const LandingPage = () => {
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    return (
        <Box
            backgroundColor="blue.50"
            minHeight="100vh"
            background="linear-gradient(180deg, #0076FF, white)"
        >
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
            <GuestNavbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexDirection="column"
                minHeight={`calc(100vh - 80px - 50px)`}
                color="#333"
                mt="30px"
                borderRadius="20px"
                pl={["10px", "50px", "200px", "200px", "200px"]}
                pr={["10px", "50px", "200px", "200px", "200px"]}
            >
                <Text
                    fontSize={isLargerThan768 ? "50px" : "30px"}
                    fontWeight="700"
                    pt="50px"
                    pb="30px"
                    color="white"
                >
                    Level up your gainz.
                </Text>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="24px"
                    fontWeight="700"
                    mb="30px"
                >
                    <Box
                        p="8px 20px"
                        borderRadius="10px"
                        backgroundColor="blue.50"
                        color="white"
                        _hover={{
                            cursor: "pointer",
                        }}
                    >
                        <Link
                            as={NextLink}
                            href="/sign-up"
                            _hover={{
                                textDecoration: "none",
                            }}
                        >
                            Sign Up
                        </Link>
                    </Box>
                    <Box
                        ml="20px"
                        p="8px 20px"
                        borderRadius="10px"
                        backgroundColor="blue.50"
                        color="white"
                        _hover={{
                            cursor: "pointer",
                        }}
                    >
                        <Link
                            as={NextLink}
                            href="/login"
                            _hover={{
                                textDecoration: "none",
                            }}
                        >
                            Login
                        </Link>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    mt="10px"
                    mb="10px"
                    p="20px"
                    h="600px"
                    w="350px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="2xl"
                >
                    <Image
                        src="/landing/liftz-workouts.png"
                        width={350}
                        height={600}
                        alt="temp"
                    />
                </Box>
                <Box
                    backgroundColor="white"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt="30px"
                    p={[
                        "20px",
                        "20px 50px",
                        "20px 50px",
                        "20px 50px",
                        "20px 50px",
                    ]}
                    borderRadius="20px"
                    flexDirection={["column", "row"]}
                >
                    <Box fontSize="70px">
                        <FaStar />
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        textAlign={["center", "left"]}
                        ml={["0px", "50px"]}
                        flexDirection="column"
                    >
                        <Text
                            fontSize={["22px", "30px"]}
                            fontWeight="700"
                            color="black.50"
                            mt="10px"
                            mb="10px"
                        >
                            Change the way you workout
                        </Text>
                        <Text
                            fontSize={["18px", "26px"]}
                            color="black.50"
                            mt="10px"
                            mb="10px"
                        >
                            Have you ever forgotten how many sets you{"'"}ve
                            completed and how many more you have to complete?
                        </Text>
                        <Text fontSize={["18px", "26px"]} color="black.50">
                            Transform your body and crush your fitness goals
                            with liftz. Say goodbye to workout amnesia and hello
                            to unstoppable progress!
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                mt="50px"
                mb="50px"
                pl={["10px", "50px", "200px"]}
                pr={["10px", "50px", "200px"]}
            >
                <Box
                    maxWidth={{ base: "100%", md: "48%", lg: "48%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                >
                    <Box fontSize="70px">
                        <FaListAlt />
                    </Box>
                    <Text
                        fontSize={["18px", "22px", "26px"]}
                        textAlign="center"
                        mt="30px"
                        pl="20px"
                        pr="20px"
                    >
                        A comprehensive library and session tracker.
                    </Text>
                </Box>
                <Box
                    maxWidth={{ base: "100%", md: "48%", lg: "48%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                    mt={["30px", "0px"]}
                >
                    <Box fontSize="70px">
                        <FaCalendar />
                    </Box>
                    <Text
                        fontSize={["18px", "22px", "26px"]}
                        textAlign="center"
                        mt="30px"
                        pl="20px"
                        pr="20px"
                    >
                        A built-in calendar for past workout sessions.
                    </Text>
                </Box>
                <Box
                    maxWidth={{ base: "100%", md: "48%", lg: "48%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                    mt="30px"
                >
                    <Box fontSize="70px">
                        <FaDumbbell />
                    </Box>
                    <Text
                        fontSize={["18px", "22px", "26px"]}
                        textAlign="center"
                        mt="30px"
                        pl="20px"
                        pr="20px"
                    >
                        Visualize your weights with the plate calculator.
                    </Text>
                </Box>
                <Box
                    maxWidth={{ base: "100%", md: "48%", lg: "48%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                    mt="30px"
                >
                    <Box fontSize="70px">
                        <FaSignal />
                    </Box>
                    <Text
                        fontSize={["18px", "22px", "26px"]}
                        textAlign="center"
                        mt="30px"
                        pl="20px"
                        pr="20px"
                    >
                        Track and visualize your PRs with each workout session.
                    </Text>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default LandingPage;
