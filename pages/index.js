import Head from "next/head";
import Image from "next/image";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";

const metadata = {
    title: "liftz",
    description: "liftz landing page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

import { FaListAlt, FaCalendar, FaDumbbell, FaSignal } from "react-icons/fa";

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
                pl={isLargerThan768 ? "80px" : "20px"}
                pr={isLargerThan768 ? "80px" : "20px"}
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
                    mt="10px"
                    mb="10px"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="2xl"
                >
                    <Image
                        src="/landing/liftz-workouts.png"
                        width={300}
                        height={200}
                        alt="temp"
                    />
                </Box>
                <Text
                    fontSize={isLargerThan768 ? "26px" : "18px"}
                    fontWeight="700"
                    mt="30px"
                    w="75%"
                    color="white"
                >
                    Transform your body and crush your fitness goals with liftz.
                    Say goodbye to workout amnesia and hello to unstoppable
                    progress!
                </Text>
            </Box>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                mt="50px"
                mb="50px"
                pl={isLargerThan768 ? "100px" : "50px"}
                pr={isLargerThan768 ? "100px" : "50px"}
            >
                <Box
                    maxWidth={{ base: "100%", md: "40%", lg: "40%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)" }}
                >
                    <Box fontSize={isLargerThan768 ? "80px" : "60px"}>
                        <FaListAlt />
                    </Box>
                    <Text
                        fontSize={isLargerThan768 ? "26px" : "20px"}
                        textAlign="center"
                        mt="30px"
                        pl="20px"
                        pr="20px"
                    >
                        A comprehensive library and session tracker.
                    </Text>
                </Box>
                <Box
                    maxWidth={{ base: "100%", md: "40%", lg: "40%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)" }}
                    mt={isLargerThan768 ? "0px" : "30px"}
                >
                    <Box fontSize={isLargerThan768 ? "80px" : "60px"}>
                        <FaCalendar />
                    </Box>
                    <Text
                        fontSize={isLargerThan768 ? "26px" : "20px"}
                        textAlign="center"
                        mt="30px"
                        pl="20px"
                        pr="20px"
                    >
                        A built-in calendar for past workout sessions.
                    </Text>
                </Box>
                <Box
                    maxWidth={{ base: "100%", md: "40%", lg: "40%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)" }}
                    mt={isLargerThan768 ? "60px" : "30px"}
                >
                    <Box fontSize={isLargerThan768 ? "80px" : "60px"}>
                        <FaDumbbell />
                    </Box>
                    <Text
                        fontSize={isLargerThan768 ? "26px" : "20px"}
                        textAlign="center"
                        mt="30px"
                        pl="20px"
                        pr="20px"
                    >
                        Visualize your weights with the plate calculator.
                    </Text>
                </Box>
                <Box
                    maxWidth={{ base: "100%", md: "40%", lg: "40%" }}
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p="20px"
                    borderRadius="20px"
                    bgColor="white"
                    boxShadow="md"
                    _hover={{ transform: "scale(1.1)" }}
                    mt={isLargerThan768 ? "60px" : "30px"}
                >
                    <Box fontSize={isLargerThan768 ? "80px" : "60px"}>
                        <FaSignal />
                    </Box>
                    <Text
                        fontSize={isLargerThan768 ? "26px" : "20px"}
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
