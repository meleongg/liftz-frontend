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

const ChangePasswordForm = ({ userId, setMessage }) => {
    return (
        <Formik
            initialValues={{
                oldPassword: "",
                newPassword: "",
                retypePassword: "",
            }}
            validationSchema={Yup.object({
                oldPassword: Yup.string()
                    .required("Password Required")
                    .min(8, "Password must be at least 8 characters"),
                newPassword: Yup.string()
                    .required("Password Required")
                    .min(8, "Password must be at least 8 characters")
                    .matches(
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=,./<>?;':"[\]{}|~`]).{8,}$/,
                        "Password must contain at least 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character"
                    ),
                retypePassword: Yup.string()
                    .oneOf(
                        [Yup.ref("newPassword"), null],
                        "Passwords must match"
                    )
                    .required("Retype Password Required"),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                const validatePasswordUserData = {
                    userId: userId,
                    password: values.oldPassword,
                };

                try {
                    const validatePasswordResponse = await fetch(
                        "/api/validate-password",
                        {
                            method: "POST",
                            body: JSON.stringify(validatePasswordUserData),
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

                    const validatePasswordData =
                        await validatePasswordResponse.json();

                    if (validatePasswordData.message === "no match") {
                        setErrors({
                            form: "Invalid password",
                        });
                        return;
                    }

                    const updateUserData = {
                        userId: userId,
                        password: values.newPassword,
                    };

                    const updateUserResponse = await fetch("/api/update-user", {
                        method: "POST",
                        body: JSON.stringify(updateUserData),
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
                        <Field name="oldPassword" type="password">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.oldPassword &&
                                        form.touched.oldPassword
                                    }
                                    w="300px"
                                    isRequired
                                >
                                    <FormLabel color="white">
                                        Old Password
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        bgColor="white"
                                        placeholder="Old Password"
                                        type="password"
                                    />
                                    <FormErrorMessage
                                        color="red.50"
                                        fontWeight="700"
                                    >
                                        {form.errors.oldPassword}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="newPassword" type="password">
                            {({ field, form }) => (
                                <FormControl
                                    mt="20px"
                                    isInvalid={
                                        form.errors.newPassword &&
                                        form.touched.newPassword
                                    }
                                    w="300px"
                                    isRequired
                                >
                                    <FormLabel color="white">
                                        New Password
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        bgColor="white"
                                        placeholder="New Password"
                                        type="password"
                                    />
                                    <FormErrorMessage
                                        color="red.50"
                                        fontWeight="700"
                                    >
                                        {form.errors.newPassword}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="retypePassword" type="password">
                            {({ field, form }) => (
                                <FormControl
                                    mt="20px"
                                    isInvalid={
                                        form.errors.retypePassword &&
                                        form.touched.retypePassword
                                    }
                                    w="300px"
                                    isRequired
                                >
                                    <FormLabel color="white">
                                        Retype Password
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        bgColor="white"
                                        placeholder="Retype Password"
                                        type="password"
                                    />
                                    <FormErrorMessage
                                        color="red.50"
                                        fontWeight="700"
                                    >
                                        {form.errors.retypePassword}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Button
                            mt="20px"
                            bgColor="lightBlue.50"
                            color="white"
                            _hover={{ bg: "lightBlue.25" }}
                            isLoading={formik.isSubmitting}
                            type="submit"
                        >
                            Change Password
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default ChangePasswordForm;
