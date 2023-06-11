import { Box, Button, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import { DateTime } from "luxon";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";
import Head from "next/head";

const metadata = {
    title: "Calendar | liftz",
    description: "Session Calendar page",
    image: "https://liftz-workout-tracker.vercel.app/meta-image.png",
};

const CustomCalendar = ({ dbSessions, dbSessionDates, error }) => {
    const [sessions, setSessions] = useState(dbSessions);
    const [dates, setDates] = useState(null);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    const router = useRouter();
    const userId = router.query.user;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    useEffect(() => {
        const dbSessionDateObjs = dbSessionDates.map((dateStr) => {
            const date = DateTime.fromISO(dateStr).setZone(timezone).toJSDate();
            return date;
        });

        setDates(dbSessionDateObjs);

        setLoading(false);
    }, [dbSessionDates]);

    const handleDateClick = async (value) => {
        const clickedDate = DateTime.fromJSDate(new Date(value));
        const formattedDate = clickedDate.toFormat("MM/dd/yyyy");

        setSelectedDate(formattedDate);

        const fetchFormattedDate = clickedDate.toFormat("MM-dd-yyyy");

        try {
            setLoading(true);
            const response = await fetch(
                `/api/handle-date-click?userId=${userId}&date=${fetchFormattedDate}&timezone=${timezone}`
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

        router.push(
            `/authenticated/${userId}/workouts/${workoutId}/${sessionId}`
        );
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
                <meta
                    property="og:description"
                    content={metadata.description}
                />
                <meta property="og:image" content={metadata.image} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metadata.title} />
                <meta
                    name="twitter:description"
                    content={metadata.description}
                />
                <meta name="twitter:image" content={metadata.image} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* 80px is the navbar */}
            <Box
                minHeight="calc(100vh - 80px)"
                h="calc(100% - 80px)"
                pt="30px"
                pl={isLargerThan768 ? "100px" : "10px"}
                pr={isLargerThan768 ? "100px" : "10px"}
                pb="80px"
            >
                <Title userId={userId} content={"Session Calendar"} />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt="20px"
                    mb="30px"
                >
                    <Button
                        bgColor="blue.50"
                        color="white"
                        _hover={{ bg: "lightBlue.50" }}
                        onClick={handlePrevMonth}
                    >
                        Prev Month
                    </Button>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        w="40%"
                    >
                        <Text textAlign="center">
                            {format(date, "MMMM yyyy")}
                        </Text>
                    </Box>
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
                <Box mt="30px" mb="20px">
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
                                        _hover={{
                                            cursor: "pointer",
                                            backgroundColor: "lightBlue.50",
                                        }}
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
    const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { user } = context.params;

    try {
        const response = await fetch(`${BE_URL}/calendar/${user}`);
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
