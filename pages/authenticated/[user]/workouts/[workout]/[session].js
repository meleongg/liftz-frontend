import {
  Box,
  Button,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Head from "next/head";
import Navbar from "../../../../../components/Navbar";
import Title from "../../../../../components/Title";

const metadata = {
  description: "Workout Session page",
  image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const SessionEnd = ({ dbSession, error }) => {
  const [session] = useState(dbSession);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const isFromCalendar = router.query.isFromCalendar;
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const handleDoneButton = async () => {
    if (isFromCalendar) {
      router.push(`/authenticated/${userId}/calendar`);
    } else {
      router.push(`/authenticated/${userId}/workouts`);
    }
  };

  return (
    <Box minHeight="100vh">
      <Head>
        <title>{`${session?.workout?.name} Session | liftz`}</title>
        <meta name="description" content={metadata.description} />
        <meta name="image" content={metadata.image} />

        <meta
          property="og:url"
          content="https://liftz-workout-tracker.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 80px is the navbar */}
      <Box
        minHeight="calc(100vh - 80px)"
        h="calc(100% - 80px)"
        pt="30px"
        pl={["10px", "50px", "100px", "100px", "100px"]}
        pr={["10px", "50px", "100px", "100px", "100px"]}
        pb="80px"
      >
        <Title userId={userId} content={`${session?.workout?.name} Session`} />

        <Text fontSize="30px" fontWeight="700" mt="20px">
          Date
        </Text>
        <Text>{formatDate(session?.date)}</Text>

        <Box display="flex" flexDirection="column" mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Notes
          </Text>
          <Text>{session?.workout?.notes}</Text>
        </Box>

        <Box overflowX="auto">
          <Table>
            <Thead>
              <Tr>
                <Th>Exercise</Th>
                <Th>Sets</Th>
                <Th>Reps</Th>
                <Th>Weight</Th>
              </Tr>
            </Thead>
            <Tbody>
              {session &&
                session?.exercises &&
                session.exercises.map((exercise, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{exercise.name}</Td>
                      <Td>{exercise.sets}</Td>
                      <Td>{exercise.reps}</Td>
                      <Td>{exercise.weight}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </Box>

        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="30px"
          mb="30px"
        >
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleDoneButton}
            mt="10px"
            mb="10px"
          >
            Done
          </Button>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="workouts" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { session } = context.params;

  try {
    const response = await fetch(`${BE_URL}/workouts/sessions/${session}`);
    const data = await response.json();

    const dbSession = {
      id: data._id,
      date: data.date,
      exercises: data.exercises,
      workout: data.workout,
    };

    return {
      props: {
        dbSession: dbSession,
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

export default SessionEnd;
