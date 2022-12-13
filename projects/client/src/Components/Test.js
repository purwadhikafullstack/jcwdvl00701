import React from "react";
import {Box, Button, Flex} from "@chakra-ui/react";

function Test(props) {
  return (
    <Flex>
      <Box w="100%" p={4}>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
      </Box>
      {/* cara utk breakpoint */}
      {/* fontSize={{sm:"24px", md:"30px", lg:"10px" }} */}
    </Flex>
  );
}


export default Test;
