import {
  Box,
  Container,
  Flex,
  Button,
  Text,
  FormControl,
  Input,
} from "@chakra-ui/react";

function Price() {
  return (
    <Box mt="80px">
      <Container maxW="1140px">
        <Text fontSize="20px" fontWeight="bold">
          Special Price
        </Text>
      </Container>
    </Box>
  );
}

export default Price;
