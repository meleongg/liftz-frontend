import {
  Box,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Navbar from "../../../components/Navbar";
import Title from "../../../components/Title";

const WEIGHTS = [45, 35, 25, 10, 5, 2.5]; // Available plate weights in pounds

const WeightCalculator = () => {
  const [weight, setWeight] = useState(0);
  const [plates, setPlates] = useState([]);

  const calculatePlates = (weight) => {
    const plates = [];
    let remainingWeight = (weight - 45) / 2; // Subtract the weight of the barbell (45lbs) and divide by 2 to get the weight per side

    WEIGHTS.forEach((plate) => {
      const count = Math.floor(remainingWeight / plate); // Calculate the number of plates needed for this weight
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          plates.push(plate); // Add the plates to the array
          remainingWeight -= plate; // Subtract the weight of the plates from the remaining weight
        }
      }
    });

    setPlates(plates);
  };

  const router = useRouter();
  const userId = router.query.user;

  useEffect(() => {
    setWeight(weight);
    calculatePlates(weight);
  }, [weight]);

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
        <Title content={"Plate Calculator"} />
        <Box mt="20px" mb="20px">
          <Text fontSize="30px" fontWeight="700">
            Enter Weight
          </Text>
          <NumberInput min={0} mt="10px" value={weight}>
            <NumberInputField
              onChange={(e) => {
                setWeight(Number(e.target.value));
              }}
              value={weight}
            />
            <NumberInputStepper>
              <NumberIncrementStepper onClick={() => setWeight(weight + 1)} />
              <NumberDecrementStepper onClick={() => setWeight(weight - 1)} />
            </NumberInputStepper>
          </NumberInput>
          <Box display="flex" mt="20px">
            <Button
              bgColor="blue.50"
              color="white"
              _hover={{ bg: "lightBlue.50" }}
              onClick={() => {
                const newWeight = weight + 5;
                setWeight(newWeight);
              }}
              w="30%"
            >
              Add 5 lbs
            </Button>
            <Button
              bgColor="blue.50"
              color="white"
              _hover={{ bg: "lightBlue.50" }}
              onClick={() => {
                const newWeight = Math.floor(weight - weight * 0.1);
                setWeight(newWeight);
              }}
              ml="10px"
              w="30%"
            >
              Deload 10%
            </Button>
          </Box>
          <Text fontSize="30px" fontWeight="700" mt="20px">
            Diagram
          </Text>
          <Box
            display="flex"
            alignItems="center"
            mt="20px"
            justifyContent="center"
            fontSize="16px"
            fontWeight="700"
            minHeight="150px"
          >
            <Box display="flex" alignItems="center" flexDirection="row-reverse">
              {plates.map((plate, index) => {
                switch (plate) {
                  case 45:
                    return (
                      <Box
                        h="130px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-left`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 35:
                    return (
                      <Box
                        h="110px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-left`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 25:
                    return (
                      <Box
                        h="80px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-left`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 10:
                    return (
                      <Box
                        h="60px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-left`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 5:
                    return (
                      <Box
                        h="50px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-left`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 2.5:
                    return (
                      <Box
                        h="30px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-left`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                }
              })}
            </Box>
            <Box>
              <Box bgColor="black" w="150px" h="20px"></Box>
            </Box>
            <Box display="flex" alignItems="center">
              {plates.map((plate, index) => {
                switch (plate) {
                  case 45:
                    return (
                      <Box
                        h="130px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-right`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 35:
                    return (
                      <Box
                        h="110px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-right`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 25:
                    return (
                      <Box
                        h="80px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-right`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 10:
                    return (
                      <Box
                        h="60px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-right`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 5:
                    return (
                      <Box
                        h="50px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-right`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                  case 2.5:
                    return (
                      <Box
                        h="30px"
                        w="25px"
                        bgColor={index % 2 == 0 ? "red" : "blue.50"}
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={`${index}-right`}
                      >
                        <Text>{plate}</Text>
                      </Box>
                    );
                }
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Navbar userId={userId} currPage="weight-calculator" />
    </Box>
  );
};

export default WeightCalculator;
