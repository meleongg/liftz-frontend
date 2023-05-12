import { useRouter } from "next/router";

import { Box, Heading, Button, useMediaQuery } from "@chakra-ui/react";

import Navbar from "../../../components/Navbar";
import NewWorkoutForm from "../../../components/NewWorkoutForm";

const NewWorkout = () => {
  const router = useRouter();
  const userId = router.query.user;

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handleBackButton = () => {
    router.push(`/authenticated/${userId}/workouts`);
  };

  return (
    <Box minHeight="100vh">
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
