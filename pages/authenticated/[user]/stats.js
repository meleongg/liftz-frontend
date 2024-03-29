import { Box, Button, Checkbox, Input, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PRChart from "../../../components/PRChart";

import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";

const metadata = {
  title: "PR Tracker | liftz",
  description: "PR Tracker page",
  image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const Stats = ({ dbPrs, error }) => {
  const [loading, setLoading] = useState(true);
  const [prs, setPrs] = useState([]);
  const [filteredPrs, setFilteredPrs] = useState([]);
  const [workoutsToDisplay, setWorkoutsToDisplay] = useState({}); // { workout_id: true/false, ...}
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const router = useRouter();
  const userId = router.query.user;

  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 20);

    return () => {
      // teardown
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const groupedPrs = dbPrs.reduce((acc, pr) => {
      const { name, _id } = pr.workout;
      const existingWorkout = acc.find((item) => item.name === name);

      if (!existingWorkout) {
        acc.push({ name, _id, prs: [pr] });
      } else {
        existingWorkout.prs.push(pr);
        existingWorkout.prs.sort((a, b) =>
          a.exercise.localeCompare(b.exercise)
        );
      }

      return acc;
    }, []);

    groupedPrs.sort((a, b) => a.name.localeCompare(b.name));

    let updatedWorkoutsToDisplay = { ...workoutsToDisplay };

    for (let i = 0; i < groupedPrs.length; i++) {
      const workout = groupedPrs[i];

      if (!updatedWorkoutsToDisplay[workout._id]) {
        updatedWorkoutsToDisplay[workout._id] = false;
      }
    }

    setWorkoutsToDisplay(updatedWorkoutsToDisplay);

    // [
    //   {
    //     name: "Chest Day",
    //     _id: "123",
    //     prs: [
    //       {
    //         _id: "123",
    //         exercise: "Bench Press",
    //         weight: 100,
    //         reps: 5,
    //         date: "2021-05-01",
    //       },
    //       {
    //         _id: "456",
    //         exercise: "Incline Bench Press",
    //         weight: 100,
    //         reps: 5,
    //         date: "2021-05-01",
    //       },
    //     ],
    //   },
    // ];

    setPrs(groupedPrs);
    setFilteredPrs(groupedPrs);
    setLoading(false);
  }, [dbPrs]);

  useEffect(() => {
    const filterPrs = () => {
      let filtered = prs;

      if (debouncedSearch) {
        filtered = filtered.map((workout) => ({
          ...workout,
          prs: workout.prs.filter((pr) =>
            pr.exercise.toLowerCase().includes(debouncedSearch.toLowerCase())
          ),
        }));

        filtered = filtered.filter((workout) => workout.prs.length > 0);
      }

      if (prs.some((workout) => workoutsToDisplay[workout._id])) {
        filtered = filtered.filter((workout) => workoutsToDisplay[workout._id]);
      }

      setFilteredPrs(filtered);
    };

    filterPrs();
  }, [prs, workoutsToDisplay, debouncedSearch]);

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

  const handleDeletePRClick = async (workoutName, prId) => {
    const updatedPrs = [...prs];

    // Find the index of the workout object in the prs array based on the workout name
    const workoutIndex = updatedPrs.findIndex(
      (workout) => workout.name === workoutName
    );

    if (workoutIndex !== -1) {
      // Find the PR index in the prs array of the specific workout based on the prId
      const prIndex = updatedPrs[workoutIndex].prs.findIndex(
        (pr) => pr._id === prId
      );

      if (prIndex !== -1) {
        // Remove the PR from the workout's prs array
        updatedPrs[workoutIndex].prs.splice(prIndex, 1);

        // If the prs array for the workout becomes empty, remove the entire object
        if (updatedPrs[workoutIndex].prs.length === 0) {
          updatedPrs.splice(workoutIndex, 1);
        }
      }
    }

    // Update the state with the modified prs array
    setPrs(updatedPrs);

    const data = {
      prId: prId,
    };

    try {
      const rawResponse = await fetch("/api/delete-pr", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await rawResponse.json();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (e, workoutId) => {
    const updatedWorkoutsToDisplay = { ...workoutsToDisplay };
    updatedWorkoutsToDisplay[workoutId] = e.target.checked;

    setWorkoutsToDisplay(updatedWorkoutsToDisplay);
  };

  return (
    <Box minHeight="100vh" mb={["80px", "80px", "0px", "0px", "0px"]}>
      <Head>
        <title>{metadata.title}</title>
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
        <Title userId={userId} content={"PR Progress"} />
        <Box mt="20px" display="flex" flexDirection="column" mb="20px">
          <Box
            borderRadius="20px"
            p="20px"
            bgColor="blue.50"
            color="white"
            mt="20px"
            mb="20px"
          >
            <Text fontSize="18px" fontWeight="700">
              PRs are created for each of your completed workout session
              exercises.
            </Text>
            <Text fontSize="18px" fontWeight="700" mt="16px">
              Each PR will automatically update every time you complete a
              workout session where you hit a new PR!
            </Text>
          </Box>

          <Box mt="20px" mb="10px">
            <Text fontWeight={"700"}>Search for a specific PR:</Text>
            <Input
              mt="5px"
              placeholder="Search for PR"
              size="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <Box mt="10px" mb="20px">
            <Text fontWeight={"700"}>
              Select the workout PRs you would like to see:
            </Text>
            <Box
              display="flex"
              flexDirection={"column"}
              flexWrap={true}
              mt="5px"
            >
              {prs.map((workout) => (
                <Checkbox
                  ml="10px"
                  key={workout._id}
                  onChange={(e) => handleCheck(e, workout._id)}
                >
                  {workout.name}
                </Checkbox>
              ))}
            </Box>
          </Box>

          {filteredPrs.map((workout) => (
            <Box key={workout._id} mt="20px" mb="20px">
              <Text fontSize={"20px"} fontWeight="700" textAlign="center">
                {workout.name}
              </Text>
              {workout.prs.map((pr) => (
                <Box key={pr._id} mt="20px" mb="20px">
                  <PRChart pr={pr} />
                  <Button
                    backgroundColor="blue.50"
                    color="white"
                    _hover={{
                      cursor: "pointer",
                      bg: "lightBlue.50",
                    }}
                    onClick={() => handleDeletePRClick(workout.name, pr._id)}
                  >{`Delete ${pr.exercise} PR`}</Button>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Navbar userId={userId} currPage="stats" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { user } = context.params;

  try {
    const response = await fetch(`${BE_URL}/stats/${user}`);
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
