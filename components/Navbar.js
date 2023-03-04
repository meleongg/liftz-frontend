import {
  FaBook,
  FaCalendar,
  FaHome,
  FaDumbbell,
  FaSignal,
} from "react-icons/fa";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

const Navbar = ({ currPage }) => {
  console.log(currPage);

  return (
    <Box
      w="100vw"
      h="80px"
      color="white"
      fontSize="30px"
      bgColor="blue.50"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Link href="/workouts">
        <Box color={currPage == "workouts" ? "black.50" : "white"}>
          <FaBook />
        </Box>
      </Link>
      <Link href="/calendar">
        <Box color={currPage == "calendar" ? "black.50" : "white"}>
          <FaCalendar />
        </Box>
      </Link>
      <Link href="/">
        <Box color={currPage == "home" ? "black.50" : "white"}>
          <FaHome />
        </Box>
      </Link>
      <Link href="/weightCalculator">
        <Box color={currPage == "calculator" ? "black.50" : "white"}>
          <FaDumbbell />
        </Box>
      </Link>
      <Link href="/stats">
        <Box color={currPage == "stats" ? "black.50" : "white"}>
          <FaSignal />
        </Box>
      </Link>
    </Box>
  );
};

export default Navbar;
