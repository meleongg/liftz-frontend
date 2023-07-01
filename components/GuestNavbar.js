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
            p="10px 30px 10px 30px"
            backgroundColor="white"
            h="80px"
            fontSize="18px"
            fontWeight="700"
            boxShadow="lg"
        >
            <Box
                display="flex"
                justifyContent="center"
                onClick={handleLandingClick}
                _hover={{ cursor: "pointer" }}
            >
                <Image
                    src="/full-logo.png"
                    width={100}
                    height={50}
                    alt="logo"
                />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                    p="8px 20px"
                    borderRadius="10px"
                    _hover={{
                        cursor: "pointer",
                        backgroundColor: "lightBlue.0",
                    }}
                >
                    <Link
                        as={NextLink}
                        href="/sign-up"
                        _hover={{
                            textDecoration: "none",
                        }}
                    >
                        Sign Up
                    </Link>
                </Box>
                <Box
                    ml="6px"
                    p="8px 20px"
                    borderRadius="10px"
                    backgroundColor="blue.50"
                    color="white"
                    _hover={{
                        cursor: "pointer",
                    }}
                >
                    <Link
                        as={NextLink}
                        href="/login"
                        _hover={{
                            textDecoration: "none",
                        }}
                    >
                        Login
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default GuestNavbar;
