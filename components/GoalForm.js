import React from "react";

import { useRouter } from "next/router";

import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Box
} from "@chakra-ui/react";
import * as Yup from "yup";

const GoalForm = ({ setShowGoalForm, goals, setGoals }) => {
  const handleCancel = (props) => {
    props.resetForm();
    setShowGoalForm(false);
  };

  const router = useRouter(); 

  return (
    <Formik
      //   initialValues={{ firstName: "", lastName: "", email: "" }}
      initialValues={{ goal: "" }}
      validationSchema={Yup.object({
        goal: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
        // lastName: Yup.string()
        //   .max(20, "Must be 20 characters or less")
        //   .required("Required"),
        // email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
        (async () => {
          const rawResponse = await fetch("http://localhost:3001/create-goal", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          });

          console.log(values);

          // return the id of the goal
          const goalId = await rawResponse.json();

          // update goal array 
          console.log(goals);
          setGoals([...goals, { _id: goalId, content: values.goal }]); 
          console.log(goals);

          setSubmitting(false);
          
          setShowGoalForm(false);
          router.push("/");
        })();
      }}
    >
      {/* the Formik component takes the "render function" as a second arg */}
      {(props) => (
        <Form>
          <Field name="goal" type="text">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.goal && form.touched.goal}>
                <FormLabel>Goal</FormLabel>
                <Input {...field} placeholder="goal" />
                <FormErrorMessage>{form.errors.goal}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* <Field name="lastName" type="text">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                <FormLabel>Last name</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
              </FormControl>
            )}
          </Field> */}

          {/* <Field name="email" type="email">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel>Email</FormLabel>
                <Input {...field} placeholder="email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field> */}

          <Box w="100%">
            <Button
              mt="14px"
              bgColor="blue.50"
              color="white"
              _hover={{ bg: "lightBlue.50" }}
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
            <Button
              mt="14px"
              bgColor="blue.50"
              color="white"
              _hover={{ bg: "lightBlue.50" }}
              // isLoading={props.isSubmitting}
              type="reset"
              onClick={() => handleCancel(props)}
              ml="10px"
            >
              Cancel
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default GoalForm;
