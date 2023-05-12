import { Box, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const WorkoutListItem = ({ user, workout }) => {
  const router = useRouter();

  const userId = user.id;
  const workoutId = workout._id;

  const handleViewClick = () => {
    router.push(`/authenticated/${userId}/workouts/${workoutId}`);
  };

  const handleStartClick = () => {
    router.push(`/authenticated/${userId}/workouts/${workoutId}/session`);
  };

  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="700">{workout.name}</Text>
      <Box>
        <Button
          bgColor="blue.50"
          color="white"
          _hover={{ bg: "lightBlue.50" }}
          onClick={handleViewClick}
        >
          View
        </Button>
        <Button
          bgColor="blue.50"
          color="white"
          _hover={{ bg: "lightBlue.50" }}
          onClick={handleStartClick}
          ml="30px"
        >
          Start
        </Button>
      </Box>
    </Box>
  );
};

export default WorkoutListItem;
