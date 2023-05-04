import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { Formik, Field, Form, FieldArray } from "formik";
import { FaEdit, FaCheck, FaPlus, FaTrash } from "react-icons/fa";

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

  console.log(userId);

  const [exercises, setExercises] = useState([
    {
      order: 1,
      name: "Bench",
      sets: 5,
      reps: 5,
      weight: 225,
    },
  ]);

  const handleCancel = (formik) => {
    formik.resetForm();
    router.push(`/authenticated/${userId}/workouts`);
  };

  const handleAddExercise = () => {
    // async POST req
  };

  // const handleEditExercise = () => {};

  const handleDeleteExercise = (e) => {
    const order = e.target.id;

    const filteredExercises = exercises.filter(
      (exercise) => exercise.order != order
    );
    setExercises(filteredExercises);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        notes: "",
        exercises: [{ name: "", sets: 1, reps: 1, weight: 1 }],
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
        notes: Yup.string().max(200, "Must be 200 characters or less"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);

        (async () => {
          const rawResponse = await fetch(
            `http://localhost:3001/workouts/${userId}/create-workout`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values, null, 2),
            }
          );

          const workoutId = await rawResponse.json();
          console.log(workoutId);

          setSubmitting(false);

          // change to view this new workout's page
          router.push(`/authenticated/${userId}/workouts/${workoutId}`);
        })();
      }}
    >
      {(formik) => (
        <Form>
          <Field name="name" type="text">
            {({ field, form }) => (
              <FormControl
                mt="20px"
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel>Workout Name</FormLabel>
                <Input {...field} placeholder="Workout Name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="notes" type="text">
            {({ field, form }) => (
              <FormControl
                mt="20px"
                isInvalid={form.errors.notes && form.touched.notes}
              >
                <FormLabel>Workout Notes</FormLabel>
                <Textarea {...field} placeholder="Workout Notes" />
                <FormErrorMessage>{form.errors.notes}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <FieldArray name="exercises">
            {({ insert, remove, push }) => (
              <Box mt="30px" mb="20px">
                {formik.values.exercises.length > 0 &&
                  formik.values.exercises.map((exercise, index) => (
                    <Box key={index} mt="30px">
                      <Text as="legend" htmlFor={null} fontSize="30px">
                        New Exercise
                      </Text>

                      <Box mt="20px" mb="20px">
                        <Text htmlFor={`exercises.${index}.name`}>
                          Exercise Name
                        </Text>
                        <Input
                          id={`exercises.${index}.name`}
                          name={`exercises.${index}.name`}
                          type="text"
                          onChange={formik.handleChange}
                          value={exercise.name}
                          placeholder="Exercise Name"
                          mt="10px"
                        />
                      </Box>

                      <Box mt="20px" mb="20px">
                        <Text htmlFor={`exercises.${index}.sets`}>
                          Exercise Sets
                        </Text>
                        <NumberInput
                          defaultValue={1}
                          min={1}
                          id={`exercises.${index}.sets`}
                          name={`exercises.${index}.sets`}
                          mt="10px"
                        >
                          <NumberInputField
                            onChange={formik.handleChange}
                            value={formik.values.exercises[index].sets}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={() =>
                                formik.setFieldValue(
                                  `exercises.${index}.sets`,
                                  formik.values.exercises[index].sets + 1
                                )
                              }
                            />
                            <NumberDecrementStepper
                              onClick={() =>
                                formik.setFieldValue(
                                  `exercises.${index}.sets`,
                                  formik.values.exercises[index].sets - 1
                                )
                              }
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>

                      <Box mt="20px" mb="20px">
                        <Text htmlFor={`exercises.${index}.reps`}>
                          Exercise Reps
                        </Text>
                        <NumberInput
                          defaultValue={1}
                          min={1}
                          id={`exercises.${index}.reps`}
                          name={`exercises.${index}.reps`}
                          mt="10px"
                        >
                          <NumberInputField
                            onChange={formik.handleChange}
                            value={formik.values.exercises[index].reps}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={() =>
                                formik.setFieldValue(
                                  `exercises.${index}.reps`,
                                  formik.values.exercises[index].reps + 1
                                )
                              }
                            />
                            <NumberDecrementStepper
                              onClick={() =>
                                formik.setFieldValue(
                                  `exercises.${index}.reps`,
                                  formik.values.exercises[index].reps - 1
                                )
                              }
                            />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>

                      <Box mt="20px" mb="20px">
                        <Text htmlFor={`exercises.${index}.weight`}>
                          Exercise Weight
                        </Text>
                        <NumberInput
                          defaultValue={1}
                          min={1}
                          id={`exercises.${index}.weight`}
                          name={`exercises.${index}.weight`}
                          mt="10px"
                        >
                          <NumberInputField
                            onChange={formik.handleChange}
                            value={formik.values.exercises[index].weight}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper
                              onClick={() =>
                                formik.setFieldValue(
                                  `exercises.${index}.weight`,
                                  formik.values.exercises[index].weight + 1
                                )
                              }
                            />
                            <NumberDecrementStepper
                              onClick={() =>
                                formik.setFieldValue(
                                  `exercises.${index}.weight`,
                                  formik.values.exercises[index].weight - 1
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
                        _hover={{ bg: "lightBlue.50" }}
                        onClick={() => remove(index)}
                        disabled={formik.values.exercises.length === 1}
                        mt="10px"
                      >
                        Remove Exercise
                      </Button>
                    </Box>
                  ))}

                <Button
                  bgColor="blue.50"
                  color="white"
                  rightIcon={<FaPlus />}
                  _hover={{ bg: "lightBlue.50" }}
                  onClick={() =>
                    push({ name: "", sets: "", reps: "", weight: "" })
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

// TABLE
// {/* <TableContainer mt="20px" mb="20px">
//   <Table variant="simple">
//     <Thead>
//       <Tr>
//         {/* fill in for ordered number */}
//         <Th></Th>
//         <Th>Exercise</Th>
//         <Th isNumeric>Sets</Th>
//         <Th isNumeric>Reps</Th>
//         <Th isNumeric>Weight</Th>
//         {/* fill in for edit and delete buttons */}
//         <Th></Th>
//       </Tr>
//     </Thead>
//     <Tbody>
//       {exercises.map((exercise) => {
//         return (
//           <Tr>
//             <Td>{exercise.order + "."}</Td>
//             <Td>{exercise.name}</Td>
//             <Td isNumeric>{exercise.sets}</Td>
//             <Td isNumeric>{exercise.reps}</Td>
//             <Td isNumeric>{exercise.weight}</Td>
//             <Td>
//               <Box display="flex" justifyContent="space-between" w="100px">
//                 {/* EDIT BUTTON -> if have time */}
//                 {/* <Button
//                           bgColor="blue.50"
//                           color="white"
//                           _hover={{ bg: "lightblue.50" }}
//                           onClick={handleEditExercise}
//                         >
//                           <FaEdit />
//                         </Button> */}
//                 <Button
//                   bgColor="blue.50"
//                   color="white"
//                   _hover={{ bg: "lightblue.50" }}
//                   onClick={handleDeleteExercise}
//                   id={exercise.order}
//                 >
//                   <FaTrash />
//                 </Button>
//               </Box>
//             </Td>
//           </Tr>
//         );
//       })}
//     </Tbody>
//   </Table>
// </TableContainer>; */}
