import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const UpdateWorkoutModal = ({
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
        <ModalHeader>{workoutName} Session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Would you like to update the following exercises for {workoutName}?
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
