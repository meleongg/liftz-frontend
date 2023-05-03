import { Box, Heading } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const Title = ({ content }) => {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3001/log-out");

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
      >
        <FaSignOutAlt />
      </Box>
    </Box>
  );
};

export default Title;
