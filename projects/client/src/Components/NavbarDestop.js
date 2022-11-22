import { Box, Flex, Button, Text, Image, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import turuIcon from "../Assets/image/turuIcon.png";

function NavbarDestop() {
  return (
    <Box
      bg="white"
      pos="fixed"
      top="0"
      borderBottom="1px"
      borderColor="gray.200"
      w="100%"
      zIndex={2}
    >
      <Container maxW="1140px">
        <Flex w="100%" mx="auto" justifyContent="space-between">
          <Image
            src={turuIcon}
            my="12px"
            alt="turu-icon"
            width="58px"
            height="58px"
          />
          <Flex fontWeight="bold" fontSize="18px" my="auto">
            <Link>
              <Text>Search</Text>
            </Link>
            <Link>
              <Text mx="50px">Room</Text>
            </Link>
            <Link>
              <Text>Profile</Text>
            </Link>
          </Flex>
          <Box my="auto">
            <Link to="/login">
              <Button variant="secondary" height="58px" w="170px">
                Login
              </Button>
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavbarDestop;
