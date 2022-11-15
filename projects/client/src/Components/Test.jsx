import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

class Test extends React.Component {
  render() {
    return (
      <Flex>
        <Box w="100%" p={4}>
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
        </Box>
      </Flex>
    );
  }
}

export default Test;
