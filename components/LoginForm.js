import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email Required"),
        password: Yup.string()
          .required("Password Required")
          .min(8, "Password must be at least 8 characters"),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const userData = {
          email: values.email,
          password: values.password,
        };

        try {
          const response = await fetch("/api/login-user", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            if (response.status == 401) {
              setErrors({
                form: "Invalid email or password",
              });
              return;
            }
          }

          const loginResponse = await response.json();
          setSubmitting(false);

          router.push(`/authenticated/${loginResponse.userId}`);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {(formik) => (
        <Form>
          <Box
            backgroundColor="white"
            color="#333"
            p="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="20px"
            minWidth="350px"
          >
            {formik.errors.form && (
              <Box color="red" textAlign="center">
                {formik.errors.form}
              </Box>
            )}
            <Field name="email" type="email">
              {({ field, form }) => (
                <FormControl
                  mt="20px"
                  isInvalid={form.errors.email && form.touched.email}
                  w="300px"
                  isRequired
                >
                  <FormLabel>Email</FormLabel>
                  <Input {...field} placeholder="Email" type="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password" type="password">
              {({ field, form }) => (
                <FormControl
                  mt="20px"
                  isInvalid={form.errors.password && form.touched.password}
                  w="300px"
                  isRequired
                >
                  <FormLabel>Password</FormLabel>
                  <Input {...field} placeholder="Password" type="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt="20px"
              bgColor="blue.50"
              color="white"
              _hover={{ bg: "lightBlue.50" }}
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Log in
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
