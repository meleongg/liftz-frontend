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

const ChangeEmailForm = ({ userId, setMessage }) => {
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
        setMessage(null);

        const userData = {
          userId: userId,
          email: values.email,
          password: values.password,
        };

        try {
          const validatePasswordResponse = await fetch(
            "/api/validate-password",
            {
              method: "POST",
              body: JSON.stringify(userData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!validatePasswordResponse.ok) {
            if (validatePasswordResponse.status === 400) {
              setErrors({
                form: "Invalid password",
              });
              return;
            }
          }

          const validatePasswordData = await validatePasswordResponse.json();

          if (validatePasswordData.message === "no match") {
            setErrors({
              form: "Invalid password",
            });
            return;
          }

          const updateUserResponse = await fetch("/api/update-user", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!updateUserResponse.ok) {
            if (updateUserResponse.status === 400) {
              setErrors({
                form: "Unable to update account. Please try again",
              });
              return;
            }
          }

          await updateUserResponse.json();

          setSubmitting(false);
          setMessage("Account email updated!");
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {(formik) => (
        <Form>
          <Box
            backgroundColor="blue.50"
            color="#333"
            p="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="20px"
            minWidth="350px"
            maxWidth="400px"
          >
            {formik.errors.form && (
              <Box color="red.50" fontWeight="700" textAlign="center" mb="10px">
                {formik.errors.form}
              </Box>
            )}
            <Field name="email" type="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  w="300px"
                  isRequired
                >
                  <FormLabel color="white">New Email</FormLabel>
                  <Input
                    {...field}
                    bgColor="white"
                    placeholder="New Email"
                    type="email"
                  />
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
                  <FormLabel color="white">Password</FormLabel>
                  <Input
                    {...field}
                    bgColor="white"
                    placeholder="Password"
                    type="password"
                  />
                  <FormErrorMessage color="red.50" fontWeight="700">
                    {form.errors.password}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt="20px"
              bgColor="white"
              color="#333"
              _hover={{ bg: "lightBlue.50" }}
              isLoading={formik.isSubmitting}
              type="submit"
            >
              Change Email
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeEmailForm;
