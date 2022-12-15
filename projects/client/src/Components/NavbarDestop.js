import { Box, Flex, Button, Text, Image, Container } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import turuIcon from "../Assets/image/turuIcon.png";
import { useSelector } from "react-redux";
import { authFirebase } from "../Config/firebase";
import { signOut } from "firebase/auth";

function NavbarDestop() {
  const {id} = useSelector(state => state.user)
  const auth = authFirebase
  const history = useHistory()

  const logout = () => {
    signOut(auth)
      .then(() => alert("signed out"))
      .catch((error) => alert(error));
  }

  const switchToTenant = () => {
    history.push("/tenant/complete-register")
  }
  return (
    <Box
      display={{ ss: "none", sm: "none", sl: "inline" }}
      bg="white"
      pos="fixed"
      top="0"
      borderBottom="1px"
      borderColor="gray.200"
      w="100%"
      zIndex={10}
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
            <Link to="booking-history">
              <Text mx="50px">Room</Text>
            </Link>
            <Link>
              <Text>Profile</Text>
            </Link>
          </Flex>
          

          <Box my="auto">
              {
                id ?
              <Button variant="secondary" height="58px" w="170px" onClick={logout}>
                Logout
              </Button>
              :
              <Button variant="secondary" height="58px" w="170px">
                <Link to="/login">
                Login
                </Link>
              </Button>
              }
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavbarDestop;
