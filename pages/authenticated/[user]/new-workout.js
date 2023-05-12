import { useRouter } from "next/router";

import { Box, Heading, Button, useMediaQuery } from "@chakra-ui/react";

import Navbar from "../../../components/Navbar";
import NewWorkoutForm from "../../../components/NewWorkoutForm";
import Head from "next/head";

const metadata = {
  title: "New Workout | liftz",
  description: "New Workout page",
  image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const NewWorkout = () => {
  const router = useRouter();
  const userId = router.query.user;

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handleBackButton = () => {
    router.push(`/authenticated/${userId}/workouts`);
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
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
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
        mb="30px"
      >
        <Heading fontSize="50px">New Workout</Heading>
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
        <NewWorkoutForm userId={userId} />
      </Box>
      <Navbar currPage="workouts" />
    </Box>
  );
};

export default NewWorkout;
