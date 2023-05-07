import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import PRChart from "../../../components/PRChart";

const Stats = ({ dbPrs, error }) => {
  const [loading, setLoading] = useState(true);

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
      <Box
        minHeight="calc(100vh - 80px)"
        h="calc(100% - 80px)"
        pt="30px"
        pl="10px"
        pr="10px"
      >
        <Title content={"PR Progress"} />
        <Box mt="20px" display="flex" flexDirection="column">
          {dbPrs &&
            dbPrs.map((pr, index) => {
              return (
                <Box key={index} mt="20px">
                  <PRChart pr={pr} />
                </Box>
              );
            })}
        </Box>
      </Box>
      <Navbar userId={userId} currPage="stats" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { user } = context.params;

  try {
    const response = await fetch(`http://localhost:3001/stats/${user}`);
    const data = await response.json();

    return {
      props: {
        dbPrs: data,
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

export default Stats;
