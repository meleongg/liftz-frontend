import { Box, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import ChangeEmailForm from "../../../components/ChangeEmailForm";
import ChangePasswordForm from "../../../components/ChangePasswordForm";
import DeleteAccount from "../../../components/DeleteAccount";
import { FaCheckCircle } from "react-icons/fa";

const Settings = ({ user: dbUser, error }) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const userId = router.query.user;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
        color="blue.50"
      >
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
        color="#333"
      >
        <Text>Failed to load data</Text>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh">
      {/* 80px is the navbar */}
      {message && (
        <Box
          w="100%"
          textAlign="center"
          bgColor="blue.50"
          color="white"
          h="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl="20px"
          pr="20px"
        >
          <Text>{message}</Text>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="20px"
            _hover={{ cursor: "pointer" }}
            onClick={() => setMessage(null)}
          >
            <FaCheckCircle />
          </Box>
        </Box>
      )}
      <Box
        minHeight="calc(100vh - 80px)"
        pt="30px"
        pl={isLargerThan768 ? "100px" : "10px"}
        pr={isLargerThan768 ? "100px" : "10px"}
      >
        <Title userId={userId} content={"Settings"} />
        <Box
          mt="20px"
          mb="30px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box mt="20px">
            <Text fontSize="24px" fontWeight="700" mb="10px" textAlign="center">
              Change Email
            </Text>
            <ChangeEmailForm userId={userId} setMessage={setMessage} />
          </Box>
          <Box mt="40px" mb="40px">
            <Text fontSize="24px" fontWeight="700" mb="10px" textAlign="center">
              Change Password
            </Text>
            <ChangePasswordForm userId={userId} setMessage={setMessage} />
          </Box>
          <Box
            mb="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="24px" fontWeight="700" mb="10px" textAlign="center">
              Delete Account
            </Text>
            <Text
              color="red"
              fontSize="14px"
              fontWeight="700"
              mb="10px"
              textAlign="center"
            >
              WARNING: All information associated with this account will be
              deleted.
            </Text>
            <DeleteAccount userId={userId} setMessage={setMessage} />
          </Box>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="home" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { user } = context.params;

  try {
    const response = await fetch(`${BE_URL}/user/${user}`);
    const data = await response.json();

    return {
      props: {
        user: {
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: {
        error: true,
      },
    };
  }
}

export default Settings;
