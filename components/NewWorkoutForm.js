import { useRouter } from "next/router";

import { Formik, Field, Form, FieldArray } from "formik";
import { FaPlus, FaTrash } from "react-icons/fa";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Box,
    Textarea,
    Text,
} from "@chakra-ui/react";

import * as Yup from "yup";

const NewWorkoutForm = ({ userId }) => {
    const router = useRouter();

    const handleCancel = (formik) => {
        formik.resetForm();
        router.push(`/authenticated/${userId}/workouts`);
    };

    return (
        <Formik
            initialValues={{
                name: "",
                notes: "",
                exercises: [
                    {
                        position: 1,
                        name: "Exercise",
                        sets: 0,
                        reps: 0,
                        weight: 0,
                    },
                ],
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(100, "Workout name must be 100 characters or less")
                    .required("Required"),
                notes: Yup.string().max(
                    1000,
                    "Workout notes must be 1000 characters or less"
                ),
            })}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                const handleSubmit = async () => {
                    try {
                        const rawResponse = await fetch(
                            `/api/create-workout?userId=${userId}`,
                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ values }),
                            }
                        );

                        if (!rawResponse.ok) {
                            if (rawResponse.status === 400) {
                                setErrors({
                                    form: "Unable to create workout. Please try again",
                                });
                                return;
                            }
                        }

                        const { workoutId } = await rawResponse.json();

                        setSubmitting(false);

                        // change to view this new workout's page
                        router.push(
                            `/authenticated/${userId}/workouts/${workoutId}`
                        );
                    } catch (err) {
                        console.log(err);
                    }
                };

                handleSubmit();
            }}
        >
            {(formik) => (
                <Form>
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
                    <Field name="name" type="text">
                        {({ field, form }) => (
                            <FormControl
                                mt="20px"
                                isInvalid={
                                    form.errors.name && form.touched.name
                                }
                            >
                                <FormLabel>Workout Name</FormLabel>
                                <Input {...field} placeholder="Workout Name" />
                                <FormErrorMessage
                                    color="red.50"
                                    fontWeight="700"
                                >
                                    {form.errors.name}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name="notes" type="text">
                        {({ field, form }) => (
                            <FormControl
                                mt="20px"
                                isInvalid={
                                    form.errors.notes && form.touched.notes
                                }
                            >
                                <FormLabel>Workout Notes</FormLabel>
                                <Textarea
                                    {...field}
                                    placeholder="Workout Notes"
                                />
                                <FormErrorMessage
                                    color="red.50"
                                    fontWeight="700"
                                >
                                    {form.errors.notes}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <FieldArray name="exercises">
                        {({ insert, remove, push }) => (
                            <Box mt="30px" mb="20px">
                                {formik.values.exercises.length > 0 &&
                                    formik.values.exercises.map(
                                        (exercise, index) => (
                                            <Box key={index} mt="30px">
                                                <Text
                                                    as="legend"
                                                    htmlFor={null}
                                                    fontSize="30px"
                                                    fontWeight="700"
                                                >
                                                    New Exercise
                                                </Text>

                                                <Box mt="20px" mb="20px">
                                                    <Text
                                                        htmlFor={`exercises.${index}.name`}
                                                    >
                                                        Exercise Name
                                                    </Text>
                                                    <Input
                                                        id={`exercises.${index}.name`}
                                                        name={`exercises.${index}.name`}
                                                        type="text"
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={exercise.name}
                                                        placeholder="Exercise Name"
                                                        mt="10px"
                                                    />
                                                </Box>

                                                <Box mt="20px" mb="20px">
                                                    <Text
                                                        htmlFor={`exercises.${index}.sets`}
                                                    >
                                                        Exercise Sets
                                                    </Text>
                                                    <NumberInput
                                                        defaultValue={0}
                                                        min={0}
                                                        id={`exercises.${index}.sets`}
                                                        name={`exercises.${index}.sets`}
                                                        mt="10px"
                                                    >
                                                        <NumberInputField
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            value={
                                                                formik.values
                                                                    .exercises[
                                                                    index
                                                                ].sets
                                                            }
                                                        />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper
                                                                onClick={() =>
                                                                    formik.setFieldValue(
                                                                        `exercises.${index}.sets`,
                                                                        formik
                                                                            .values
                                                                            .exercises[
                                                                            index
                                                                        ].sets +
                                                                            1
                                                                    )
                                                                }
                                                            />
                                                            <NumberDecrementStepper
                                                                onClick={() =>
                                                                    formik.setFieldValue(
                                                                        `exercises.${index}.sets`,
                                                                        formik
                                                                            .values
                                                                            .exercises[
                                                                            index
                                                                        ].sets -
                                                                            1
                                                                    )
                                                                }
                                                            />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Box>

                                                <Box mt="20px" mb="20px">
                                                    <Text
                                                        htmlFor={`exercises.${index}.reps`}
                                                    >
                                                        Exercise Reps
                                                    </Text>
                                                    <NumberInput
                                                        defaultValue={0}
                                                        min={0}
                                                        id={`exercises.${index}.reps`}
                                                        name={`exercises.${index}.reps`}
                                                        mt="10px"
                                                    >
                                                        <NumberInputField
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            value={
                                                                formik.values
                                                                    .exercises[
                                                                    index
                                                                ].reps
                                                            }
                                                        />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper
                                                                onClick={() =>
                                                                    formik.setFieldValue(
                                                                        `exercises.${index}.reps`,
                                                                        formik
                                                                            .values
                                                                            .exercises[
                                                                            index
                                                                        ].reps +
                                                                            1
                                                                    )
                                                                }
                                                            />
                                                            <NumberDecrementStepper
                                                                onClick={() =>
                                                                    formik.setFieldValue(
                                                                        `exercises.${index}.reps`,
                                                                        formik
                                                                            .values
                                                                            .exercises[
                                                                            index
                                                                        ].reps -
                                                                            1
                                                                    )
                                                                }
                                                            />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Box>

                                                <Box mt="20px" mb="20px">
                                                    <Text
                                                        htmlFor={`exercises.${index}.weight`}
                                                    >
                                                        Exercise Weight
                                                    </Text>
                                                    <NumberInput
                                                        defaultValue={0}
                                                        min={0}
                                                        id={`exercises.${index}.weight`}
                                                        name={`exercises.${index}.weight`}
                                                        mt="10px"
                                                    >
                                                        <NumberInputField
                                                            onChange={
                                                                formik.handleChange
                                                            }
                                                            value={
                                                                formik.values
                                                                    .exercises[
                                                                    index
                                                                ].weight
                                                            }
                                                        />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper
                                                                onClick={() =>
                                                                    formik.setFieldValue(
                                                                        `exercises.${index}.weight`,
                                                                        formik
                                                                            .values
                                                                            .exercises[
                                                                            index
                                                                        ]
                                                                            .weight +
                                                                            1
                                                                    )
                                                                }
                                                            />
                                                            <NumberDecrementStepper
                                                                onClick={() =>
                                                                    formik.setFieldValue(
                                                                        `exercises.${index}.weight`,
                                                                        formik
                                                                            .values
                                                                            .exercises[
                                                                            index
                                                                        ]
                                                                            .weight -
                                                                            1
                                                                    )
                                                                }
                                                            />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </Box>

                                                <Button
                                                    bgColor="blue.50"
                                                    color="white"
                                                    rightIcon={<FaTrash />}
                                                    _hover={{
                                                        bg: "lightBlue.50",
                                                    }}
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    disabled={
                                                        formik.values.exercises
                                                            .length === 1
                                                    }
                                                    mt="10px"
                                                >
                                                    Remove Exercise
                                                </Button>
                                            </Box>
                                        )
                                    )}

                                <Button
                                    bgColor="blue.50"
                                    color="white"
                                    rightIcon={<FaPlus />}
                                    _hover={{ bg: "lightBlue.50" }}
                                    onClick={() =>
                                        push({
                                            position:
                                                formik.values.exercises.length +
                                                1,
                                            name: "Exercise",
                                            sets: 0,
                                            reps: 0,
                                            weight: 0,
                                        })
                                    }
                                    mt="30px"
                                >
                                    New Exercise
                                </Button>
                            </Box>
                        )}
                    </FieldArray>

                    <Box
                        w="100%"
                        display="flex"
                        justifyContent="space-around"
                        pt="10px"
                        pb="10px"
                    >
                        <Button
                            mt="14px"
                            bgColor="blue.50"
                            color="white"
                            _hover={{ bg: "lightBlue.50" }}
                            isLoading={formik.isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            mt="14px"
                            bgColor="blue.50"
                            color="white"
                            _hover={{ bg: "lightBlue.50" }}
                            type="reset"
                            onClick={() => handleCancel(formik)}
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
