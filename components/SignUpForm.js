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

const SignUpForm = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypePassword: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("First Name Required"),
        lastName: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Last Name Required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email Required"),
        password: Yup.string()
          .required("Password Required")
          .min(8, "Password must be at least 8 characters"),
        // .matches(
        //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=,./<>?;':"[\]{}|~`]).{8,}$/,
        //   "Password must contain at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
        // ),
        retypePassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Retype Password Required"),
      })}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const checkEmailResponse = await fetch(`/api/check-email`, {
            method: "POST",
            body: JSON.stringify({ email: values.email }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const { message } = await checkEmailResponse.json();

          if (message === "duplicate") {
            setFieldError(
              "email",
              "Email already exists. Please enter a different email."
            );
            return;
          } else {
            setFieldError("email", undefined);
          }

          const rawResponse = await fetch(`/api/create-user`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const { userId } = await rawResponse.json();
          setSubmitting(false);

          router.push(`/authenticated/${userId}`);
        } catch (err) {
          console.log(err);
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
            <Field name="firstName" type="text">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.firstName && form.touched.firstName}
                  w="300px"
                  isRequired
                >
                  <FormLabel>First Name</FormLabel>
                  <Input {...field} placeholder="First Name" type="text" />
                  <FormErrorMessage color="red.50" fontWeight="700">
                    {form.errors.firstName}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName" type="text">
              {({ field, form }) => (
                <FormControl
                  mt="20px"
                  isInvalid={form.errors.lastName && form.touched.lastName}
                  w="300px"
                  isRequired
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input {...field} placeholder="Last Name" type="text" />
                  <FormErrorMessage color="red.50" fontWeight="700">
                    {form.errors.lastName}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
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
                  <FormErrorMessage color="red.50" fontWeight="700">
                    {form.errors.email}
                  </FormErrorMessage>
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
                  <FormErrorMessage color="red.50" fontWeight="700">
                    {form.errors.password}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="retypePassword" type="password">
              {({ field, form }) => (
                <FormControl
                  mt="20px"
                  isInvalid={
                    form.errors.retypePassword && form.touched.retypePassword
                  }
                  w="300px"
                  isRequired
                >
                  <FormLabel>Retype Password</FormLabel>
                  <Input
                    {...field}
                    placeholder="Retype Password"
                    type="password"
                  />
                  <FormErrorMessage color="red.50" fontWeight="700">
                    {form.errors.retypePassword}
                  </FormErrorMessage>
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
              Sign Up
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
