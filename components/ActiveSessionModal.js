import {
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const ActiveSessionModal = ({
  isOpen,
  onClose,
  userId,
  workoutName,
  workoutId,
}) => {
  return (
    <Modal
      blockScrollOnMount={true}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You have an active {workoutName} session!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please cancel or end this{" "}
          <Link
            fontWeight={600}
            textDecoration={"underline"}
            color="blue.50"
            as={NextLink}
            href={`/authenticated/${userId}/workouts/${workoutId}/session`}
          >
            session
          </Link>
          .
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
