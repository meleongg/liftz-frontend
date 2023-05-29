import { Box, Heading } from "@chakra-ui/react";
import { FaSignOutAlt, FaCog } from "react-icons/fa";
import { useRouter } from "next/router";

const Title = ({ userId, content }) => {
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await fetch("/api/logout");

            router.push("/");
        } catch (err) {
            console.error(err);
        }
    };

    const handleSettingsClick = () => {
        router.push(`/authenticated/${userId}/settings`);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Heading fontSize="50px" w="80%" textAlign="left">
                {content}
            </Heading>
            <Box
                fontSize="30px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                mr="30px"
            >
                <Box
                    onClick={handleLogout}
                    _hover={{ cursor: "pointer" }}
                    mb="10px"
                >
                    <FaSignOutAlt />
                </Box>
                <Box
                    onClick={handleSettingsClick}
                    _hover={{ cursor: "pointer" }}
                >
                    <FaCog />
                </Box>
            </Box>
        </Box>
    );
};

export default Title;
