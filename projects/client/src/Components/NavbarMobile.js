import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavbarMobile() {
  const [isLargerThan576] = useMediaQuery("(min-width: 576px)");
  return (
    <Box
      bg="white"
      pos="fixed"
      bottom="0"
      w="100%"
      borderTop="1px"
      borderColor="gray.200"
      display={{ ss: "inline", sm: "inline", sl: "none" }}
    >
      <Flex justifyContent="space-around" py="5px">
        <Box fontSize="22px" textAlign="center" color="black">
          <i className="fa-solid fa-magnifying-glass-location"></i>
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
          <i className="fa-solid fa-circle-user"></i>
          <Text fontWeight="regular" fontSize="12px">
            Profile
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default NavbarMobile;
