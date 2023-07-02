import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaAngleRight, FaKey, FaTrash, FaEnvelope } from "react-icons/fa";

const SettingsMenu = ({ showLeftIcons, currPage }) => {
    const router = useRouter();
    const userId = router.query.user;

    return (
        <Box w="300px" fontSize="18px">
            <Box
                onClick={() =>
                    router.push(
                        `/authenticated/${userId}/settings/change-email`
                    )
                }
                bgColor={currPage === "change-email" ? "blue.50" : "white"}
                color={currPage === "change-email" ? "white" : "black.50"}
                _hover={{
                    cursor: "pointer",
                    bgColor:
                        currPage !== "change-email" ? "lightBlue.50" : "none",
                    color: currPage !== "change-email" ? "black.50" : "white",
                    borderColor:
                        currPage !== "change-email"
                            ? "lightBlue.50"
                            : "blue.50",
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="12px"
                borderTopLeftRadius="10px"
                borderTopRightRadius="10px"
                borderWidth="1px"
                borderColor={
                    currPage === "change-email" ? "blue.50" : "gray.50"
                }
            >
                {showLeftIcons ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FaEnvelope />
                        <Text ml="10px">Change Email</Text>
                    </Box>
                ) : (
                    <Text>Change Email</Text>
                )}
                <Box>
                    <FaAngleRight />
                </Box>
            </Box>
            <Box
                onClick={() =>
                    router.push(
                        `/authenticated/${userId}/settings/change-password`
                    )
                }
                bgColor={currPage === "change-password" ? "blue.50" : "white"}
                color={currPage === "change-password" ? "white" : "black.50"}
                _hover={{
                    cursor: "pointer",
                    bgColor:
                        currPage !== "change-password"
                            ? "lightBlue.50"
                            : "none",
                    color:
                        currPage !== "change-password" ? "black.50" : "white",
                    borderLeftColor:
                        currPage !== "change-password"
                            ? "lightBlue.50"
                            : "blue.50",
                    borderRightColor:
                        currPage !== "change-password"
                            ? "lightBlue.50"
                            : "blue.50",
                    borderBottomColor:
                        currPage !== "change-password"
                            ? "lightBlue.50"
                            : "blue.50",
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="12px"
                borderLeftColor={
                    currPage === "change-password" ? "blue.50" : "gray.50"
                }
                borderLeftStyle="solid"
                borderLeftWidth="1px"
                borderRightColor={
                    currPage === "change-password" ? "blue.50" : "gray.50"
                }
                borderRightStyle="solid"
                borderRightWidth="1px"
                borderBottomColor={
                    currPage === "change-password" ? "blue.50" : "gray.50"
                }
                borderBottomStyle="solid"
                borderBottomWidth="1px"
            >
                {showLeftIcons ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FaKey />
                        <Text ml="10px">Change Password</Text>
                    </Box>
                ) : (
                    <Text>Change Password</Text>
                )}

                <Box>
                    <FaAngleRight />
                </Box>
            </Box>
            <Box
                onClick={() =>
                    router.push(
                        `/authenticated/${userId}/settings/delete-account`
                    )
                }
                bgColor={currPage === "delete-account" ? "blue.50" : "white"}
                color={currPage === "delete-account" ? "white" : "black.50"}
                _hover={{
                    cursor: "pointer",
                    bgColor:
                        currPage !== "delete-account" ? "lightBlue.50" : "none",
                    color: currPage !== "delete-account" ? "black.50" : "white",
                    borderLeftColor:
                        currPage !== "delete-account"
                            ? "lightBlue.50"
                            : "blue.50",
                    borderRightColor:
                        currPage !== "delete-account"
                            ? "lightBlue.50"
                            : "blue.50",
                    borderBottomColor:
                        currPage !== "delete-account"
                            ? "lightBlue.50"
                            : "blue.50",
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="12px"
                borderBottomLeftRadius="10px"
                borderBottomRightRadius="10px"
                borderLeftColor={
                    currPage === "delete-account" ? "blue.50" : "gray.50"
                }
                borderLeftStyle="solid"
                borderLeftWidth="1px"
                borderRightColor={
                    currPage === "delete-account" ? "blue.50" : "gray.50"
                }
                borderRightStyle="solid"
                borderRightWidth="1px"
                borderBottomColor={
                    currPage === "delete-account" ? "blue.50" : "gray.50"
                }
                borderBottomStyle="solid"
                borderBottomWidth="1px"
            >
                {showLeftIcons ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FaTrash />
                        <Text ml="10px">Delete Account</Text>
                    </Box>
                ) : (
                    <Text>Delete Account</Text>
                )}
                <Box>
                    <FaAngleRight />
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsMenu;
