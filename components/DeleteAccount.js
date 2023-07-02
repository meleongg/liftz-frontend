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

const DeleteAccount = ({ userId, setMessage }) => {
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
                setMessage(null);

                const userData = {
                    userId: userId,
                    email: values.email,
                    password: values.password,
                };

                try {
                    const validateEmailResponse = await fetch(
                        "/api/validate-email",
                        {
                            method: "POST",
                            body: JSON.stringify(userData),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (!validateEmailResponse.ok) {
                        if (validateEmailResponse.status === 400) {
                            setErrors({
                                form: "Invalid email",
                            });
                            return;
                        }
                    }

                    const validateEmailData =
                        await validateEmailResponse.json();

                    if (validateEmailData.message === "no match") {
                        setErrors({
                            form: "Invalid email",
                        });
                        return;
                    }

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

                    const validatePasswordData =
                        await validatePasswordResponse.json();

                    if (validatePasswordData.message === "no match") {
                        setErrors({
                            form: "Invalid password",
                        });
                        return;
                    }

                    const deleteUserData = {
                        userId: userId,
                    };

                    const deleteUserResponse = await fetch("/api/delete-user", {
                        method: "POST",
                        body: JSON.stringify(deleteUserData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    await deleteUserResponse.json();

                    setSubmitting(false);
                    router.push("/");
                } catch (err) {
                    console.error(err);
                }
            }}
        >
            {(formik) => (
                <Form>
                    <Box
                        p="0 20px 20px 20px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="20px"
                        minWidth="350px"
                        maxWidth="400px"
                    >
                        {formik.errors.form && (
                            <Box
                                color="red.50"
                                fontWeight="700"
                                textAlign="center"
                                mb="10px"
                            >
                                {formik.errors.form}
                            </Box>
                        )}
                        <Field name="email" type="email">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.email && form.touched.email
                                    }
                                    w="300px"
                                    isRequired
                                >
                                    <FormLabel color="white">Email</FormLabel>
                                    <Input
                                        {...field}
                                        bgColor="white"
                                        placeholder="Email"
                                        type="email"
                                    />
                                    <FormErrorMessage
                                        color="red.50"
                                        fontWeight="700"
                                    >
                                        {form.errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" type="password">
                            {({ field, form }) => (
                                <FormControl
                                    mt="20px"
                                    isInvalid={
                                        form.errors.password &&
                                        form.touched.password
                                    }
                                    w="300px"
                                    isRequired
                                >
                                    <FormLabel color="white">
                                        Password
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        bgColor="white"
                                        placeholder="Password"
                                        type="password"
                                    />
                                    <FormErrorMessage
                                        color="red.50"
                                        fontWeight="700"
                                    >
                                        {form.errors.password}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Button
                            mt="20px"
                            bgColor="red.100"
                            color="white"
                            _hover={{ bg: "red.50" }}
                            isLoading={formik.isSubmitting}
                            type="submit"
                        >
                            Delete Account
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default DeleteAccount;
