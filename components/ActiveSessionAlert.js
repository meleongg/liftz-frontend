import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const ActiveSessionAlert = ({ userId, workoutName, workoutId }) => {
  return (
    <Alert status="warning" variant="subtle">
      <AlertIcon />
      <AlertTitle>You have an active {workoutName} session!</AlertTitle>
      <AlertDescription>
        Please cancel or end this{" "}
        <Link
          fontWeight={600}
          textDecoration={"underline"}
          color="blue.50"
          as={NextLink}
          href={`/authenticated/${userId}/workouts/${workoutId}/session`}
        >
          session
        </Link>{" "}
        before starting a new one.
      </AlertDescription>
    </Alert>
  );
};
