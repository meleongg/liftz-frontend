import {
    FaListAlt,
    FaCalendar,
    FaHome,
    FaDumbbell,
    FaSignal,
} from "react-icons/fa";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

const Navbar = ({ userId, currPage }) => {
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
            position="fixed"
            // position={["fixed", "fixed", "static", "static", "static"]}
            // bottom={["0", "0", "auto", "auto", "auto"]}
            bottom="0"
            zIndex="999"
        >
            <Link href={`/authenticated/${userId}/workouts`}>
                <Box color={currPage == "workouts" ? "black.50" : "white"}>
                    <FaListAlt />
                </Box>
            </Link>
            <Link href={`/authenticated/${userId}/calendar`}>
                <Box color={currPage == "calendar" ? "black.50" : "white"}>
                    <FaCalendar />
                </Box>
            </Link>
            <Link href={`/authenticated/${userId}`}>
                <Box color={currPage == "home" ? "black.50" : "white"}>
                    <FaHome />
                </Box>
            </Link>
            <Link href={`/authenticated/${userId}/weight-calculator`}>
                <Box
                    color={
                        currPage == "weight-calculator" ? "black.50" : "white"
                    }
                >
                    <FaDumbbell />
                </Box>
            </Link>
            <Link href={`/authenticated/${userId}/stats`}>
                <Box color={currPage == "stats" ? "black.50" : "white"}>
                    <FaSignal />
                </Box>
            </Link>
        </Box>
    );
};

export default Navbar;
