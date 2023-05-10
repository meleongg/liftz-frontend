import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      p="10px"
      textAlign="center"
      bgColor="white"
      color="#333"
      h="50px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="sm">© {currentYear} lifz. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
