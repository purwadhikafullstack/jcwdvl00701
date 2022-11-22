import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavbarMobile() {
  return (
    <Box
      bg="white"
      pos="fixed"
      bottom="0"
      w="100%"
      borderTop="1px"
      borderColor="gray.200"
    >
      <Flex justifyContent="space-around" py="5px">
        <Box fontSize="22px" textAlign="center" color="black">
          <i class="fa-solid fa-magnifying-glass-location"></i>
          <Text fontWeight="regular" fontSize="12px">
            Search
          </Text>
        </Box>
        <Link to="/booking-history">
          <Box fontSize="22px" textAlign="center" color="black">
            <i className="fa-solid fa-bed"></i>
            <Text fontWeight="regular" fontSize="12px">
              Room
            </Text>
          </Box>
        </Link>
        <Box fontSize="22px" textAlign="center" color="black">
          <i class="fa-solid fa-circle-user"></i>
          <Text fontWeight="regular" fontSize="12px">
            Profile
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavbarMobile;
