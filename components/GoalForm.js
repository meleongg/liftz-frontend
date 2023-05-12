import React from "react";

import { useRouter } from "next/router";

import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import * as Yup from "yup";

const BE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const GoalForm = ({ userId, setShowGoalForm, goals, setGoals }) => {
  const handleCancel = (props) => {
    props.resetForm();
    setShowGoalForm(false);
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={{ goal: "" }}
      validationSchema={Yup.object({
        goal: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          const rawResponse = await fetch(`${BE_URL}/${userId}/create-goal`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          });

          // return the id of the goal
          const goalId = await rawResponse.json();

          // update goal array
          setGoals([...goals, { _id: goalId, content: values.goal }]);

          setSubmitting(false);

          setShowGoalForm(false);
          router.push(`/authenticated/${userId}`);
        })();
      }}
    >
      {/* the Formik component takes the "render function" as a second arg */}
      {/* props is an provided object that include errors, values, touched, etc. */}
      {(props) => (
        <Form>
          <Field name="goal" type="text">
            {/* this is the render props pattern */}
            {/* child render props contains fields (name, value, onChange, etc.) and form has errors, values, touched, etc. */}
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.goal && form.touched.goal}>
                <FormLabel>Goal</FormLabel>
                <Input {...field} placeholder="Goal" />
                <FormErrorMessage color="red.50" fontWeight="700">
                  {form.errors.goal}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>

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
