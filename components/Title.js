import { Box, Heading } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const Title = ({ content }) => {
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

  return (
    <Box display="flex">
      <Heading fontSize="50px" w="80%">
        {content}
      </Heading>
      <Box
        fontSize="30px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={handleLogout}
        ml="10px"
      >
        <FaSignOutAlt />
      </Box>
    </Box>
  );
};

export default Title;
