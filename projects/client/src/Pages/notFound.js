import { Button, Center, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Center flexDirection="column" h="100vh">
      <Text fontSize="62px" fontWeight="bold">
        404
      </Text>
      <Text mb="20px" fontSize="32px">
        Page Not Found
      </Text>
      <Link to="/">
        <Button variant="primary"> Home</Button>
      </Link>
    </Center>
  );
}

export default NotFound;
