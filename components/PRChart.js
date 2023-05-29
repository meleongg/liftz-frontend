import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
} from "chart.js";
import { Box, Text } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
);

const PRChart = ({ pr }) => {
    const data = {
        labels: pr.dates.map((date) => {
            const formattedDate = parseISO(date);
            return format(formattedDate, "MMM d");
        }),
        datasets: [
            {
                data: pr.weights,
                label: `${pr.exercise} PRs`,
                borderColor: "#0076CC",
                fill: false,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Weight (lbs)",
                },
                min: 0,
            },
        },
        ticks: {
            stepSize: 25,
        },
    };

    return (
        <Box>
            <Text fontWeight="700" textAlign="center">
                {pr.exercise} PRs
            </Text>
            <Line data={data} options={options} />
        </Box>
    );
};

export default PRChart;
