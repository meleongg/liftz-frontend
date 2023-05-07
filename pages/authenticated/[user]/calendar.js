import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";

const CustomCalendar = ({ dbSessions, dbSessionDates, error }) => {
  const [sessions, setSessions] = useState(dbSessions);
  const [dates, setDates] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const userId = router.query.user;

  useEffect(() => {
    const dbSessionDateObjs = dbSessionDates.map(
      (dateStr) => new Date(dateStr)
    );
    setDates(dbSessionDateObjs);

    setLoading(false);
  }, []);

  const handleDateClick = async (value) => {
    console.log("Date clicked:", value);

    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setSelectedDate(formattedDate);

    const isoDate = format(value, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    try {
      setLoading(true);
      const response = await fetch(
        `/api/handle-date-click?userId=${userId}&isoDate=${isoDate}`
      );

      const sessionsData = await response.json();
      setSessions(sessionsData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSession = (e) => {
    const id = e.target.id;

    const splitIds = id.split("_");
    const workoutId = splitIds[0];
    const sessionId = splitIds[1];

    router.push(`/authenticated/${userId}/workouts/${workoutId}/${sessionId}`);
  };

  const handlePrevMonth = () => {
    setDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      return new Date(prevDate.getFullYear(), prevMonth, 1);
    });
  };

  const handleNextMonth = () => {
    setDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      return new Date(prevDate.getFullYear(), nextMonth, 1);
    });
  };

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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="20px"
          mb="10px"
        >
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handlePrevMonth}
          >
            Prev Month
          </Button>
          <Box>{format(date, "MMMM yyyy")}</Box>
          <Button
            bgColor="blue.50"
            color="white"
            _hover={{ bg: "lightBlue.50" }}
            onClick={handleNextMonth}
          >
            Next Month
          </Button>
        </Box>
        <Calendar
          value={date}
          onClickDay={handleDateClick}
          tileDisabled={({ activeStartDate, date, view }) => {
            // disable dates that are not in the `dates` array
            return !dates.some((d) => isSameDay(d, date));
          }}
          tileClassName={({ date, view }) => {
            // add a class name to dates in the `dates` array
            return dates.some((d) => isSameDay(d, date))
              ? "session-date"
              : null;
          }}
        />
        <Box mt="20px" mb="20px">
          <Text fontWeight="700" fontSize="20px">
            {selectedDate ||
              "Click on blue dates to check your sessions that day for your existing workouts!"}
          </Text>
          {selectedDate &&
            sessions.map((session, index) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt="10px"
                >
                  <Text>{session.workout.name}</Text>
                  <Button
                    id={`${session.workout._id}_${session._id}`}
                    bgColor="blue.50"
                    color="white"
                    _hover={{ bg: "lightBlue.50" }}
                    onClick={handleViewSession}
                  >
                    View
                  </Button>
                </Box>
              );
            })}
        </Box>
      </Box>
      <Navbar userId={userId} currPage="calendar" />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { user } = context.params;

  try {
    const response = await fetch(`http://localhost:3001/calendar/${user}`);
    const data = await response.json();

    const dates = data.map((session) => session.date);

    return {
      props: {
        dbSessions: data,
        dbSessionDates: dates,
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

export default CustomCalendar;
