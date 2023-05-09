import NextLink from "next/link";
import Image from "next/image";
import { Box, Link } from "@chakra-ui/react";
import Router from "next/router";

const GuestNavbar = () => {
  const handleLandingClick = () => {
    Router.push("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="10px 20px 10px 20px"
      backgroundColor="white"
      h="80px"
      fontSize="18px"
      fontWeight="700"
    >
      <Box
        display="flex"
        justifyContent="center"
        onClick={handleLandingClick}
        _hover={{ cursor: "pointer" }}
      >
        <Image src="/full-logo.png" width={100} height={50} alt="logo" />
      </Box>
      <Link as={NextLink} href="/sign-up">
        sign up
      </Link>
      <Link as={NextLink} href="/login">
        login
      </Link>
    </Box>
  );
};

export default GuestNavbar;
