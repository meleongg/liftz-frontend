import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../components/Navbar";
import Title from "../../components/Title";

import { FaPlus } from "react-icons/fa";

// NOTE: some people might do multiple sessions a day

const Calendar = () => {
  const [sessions, setSessions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const userId = router.query.user;

  const fetchUserData = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/calendar/${userId}`);

      const data = await response.json();

      setSessions(data.sessions);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
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
      <Box
        minHeight="calc(100vh - 80px)"
        h="calc(100% - 80px)"
        pt="30px"
        pl="10px"
        pr="10px"
      >
        <Title content={"Session Calendar"} />
      </Box>
      <Navbar userId={userId} currPage="calendar" />
    </Box>
  );
};

export default Calendar;
