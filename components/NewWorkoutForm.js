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
  Box,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import * as Yup from "yup";

const NewWorkoutForm = () => {
  const router = useRouter();
  const [exercises, setExercises] = useState([
    {
      order: 1,
      name: "Bench",
      sets: 5,
      reps: 5,
      weight: 225,
    },
  ]);

  const handleCancel = (props) => {
    props.resetForm();
    router.push("/workouts");
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
        exercises: [{ name: "", sets: "", reps: "", weight: "" }],
      }}
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

          <FieldArray name="exercises">
            {({ insert, remove, push }) => (
              <Box pt="30px" pb="20px">
                {props.values.exercises.length > 0 &&
                  props.values.exercises.map((exercise, index) => (
                    <Form>
                      <FormLabel as="legend" htmlFor={null} fontSize="30px">
                        New Exercise
                      </FormLabel>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input {...field} placeholder="name" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="sets">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Sets</FormLabel>
                            <Input {...field} placeholder="name" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Reps</FormLabel>
                            <Input {...field} placeholder="reps" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Weight</FormLabel>
                            <Input {...field} placeholder="weight" />
                          </FormControl>
                        )}
                      </Field>

                      <Button
                        bgColor="blue.50"
                        color="white"
                        rightIcon={<FaTrash />}
                        _hover={{ bg: "lightBlue.50" }}
                        // onClick={handleAddExercise}
                        onClick={() => remove(index)}
                        mt="10px"
                        mb="10px"
                      >
                        Remove Exercise
                      </Button>
                    </Form>
                  ))}

                <Button
                  bgColor="blue.50"
                  color="white"
                  rightIcon={<FaPlus />}
                  _hover={{ bg: "lightBlue.50" }}
                  // onClick={handleAddExercise}
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
