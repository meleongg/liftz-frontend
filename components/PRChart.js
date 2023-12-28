import { Box, Text } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { format, parseISO } from "date-fns";
import { Line } from "react-chartjs-2";

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
        pointRadius: 6,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (lbs)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        min: 0,
      },
    },
    ticks: {
      stepSize: 25,
    },
  };

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Text fontWeight="700" textAlign="center">
        {pr.exercise} PRs
      </Text>
      <Line data={data} options={options} />
    </Box>
  );
};

export default PRChart;
