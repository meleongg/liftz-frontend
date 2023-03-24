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
  Textarea
} from "@chakra-ui/react";

import * as Yup from "yup";

const NewWorkoutForm = () => {
  const router = useRouter();

  const handleCancel = (props) => {
    props.resetForm();
    router.push("/workouts");
  };

  return (
    <Formik
      initialValues={{ name: "", notes: "", exercises: [] }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
        notes: Yup.string().max(200, "Must be 200 characters or less"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          const rawResponse = await fetch(
            "http://localhost:3001/create-workout",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values, null, 2),
            }
          );
          const content = await rawResponse.json();

          setSubmitting(false);

          // change to view this new workout's page
          router.push("/workouts");
        })();
      }}
    >
      {(props) => (
        <Form>
          <Field name="name" type="text">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>Name</FormLabel>
                <Input {...field} placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="notes" type="text">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.notes && form.touched.notes}>
                <FormLabel>Notes</FormLabel>
                <Textarea {...field} placeholder="notes" />
                <FormErrorMessage>{form.errors.notes}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Box w="100%" display="flex" justifyContent="space-around" pt="10px">
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

export default NewWorkoutForm;
