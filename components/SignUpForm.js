import {
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3001/create-user", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      router.push(`/authenticated/${res._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const isValidEmail = (email) => {
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      setError("Email is invalid. Please try again.");
    } else {
      setError("");
    }
  }, [email]);

  useEffect(() => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=,./<>?;':"[\]{}|~`]).{8,}$/;

    const isStrongPassword = (password) => {
      return true;
      //   return passwordRegex.test(password);
    };

    if (!isStrongPassword(password)) {
      setError("Password does not meet requirements.");
    } else {
      setError("");
    }
  }, [password]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        backgroundColor="white"
        color="#333"
        p="20px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="20px"
      >
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl pt="10px" pb="10px" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl pt="10px" pb="10px" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl pt="10px" pb="10px" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormHelperText>
            Password must contain at least 8 characters, at least 1 digit, at
            least 1 uppercase letter, at least 1 lowercase letter, and at least
            1 special character
          </FormHelperText>
        </FormControl>
        <FormControl pt="10px" pb="10px" isRequired>
          <FormLabel>Retype Password</FormLabel>
          <Input
            type="password"
            value={retypePassword}
            onChange={(e) => {
              setRetypePassword(e.target.value);
            }}
          />
        </FormControl>

        {error && (
          <Box mt="10px" color="red.500" w="100%" textAlign="center">
            <Text>{error}</Text>
          </Box>
        )}

        <Button
          mt="10px"
          type="submit"
          _hover={{ backgroundColor: "blue.0" }}
          color="white"
          backgroundColor="blue.50"
          w="30%"
        >
          Sign up
        </Button>
      </Box>
    </form>
  );
};

export default SignUpForm;
