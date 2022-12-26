import { 
  Box,
  Flex,
  Button, 
  Text, 
  Image, 
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Spacer
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import turuIcon from "../Assets/image/turuIcon.png";
import { useSelector } from "react-redux";
import { authFirebase } from "../Config/firebase";
import { signOut } from "firebase/auth";

function NavbarDestop() {
  // const global = useSelector(state => state.user)
  const {id, ProfilePic} = useSelector(state => state.user)
  const auth = authFirebase
  const history = useHistory()

  const logout = () => {
    signOut(auth)
      .then(() => alert("signed out"))
      .catch((error) => alert(error));
    history.push("/login")
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
          <Spacer />
          <Flex fontWeight="bold" fontSize="18px" my="auto" mr="20px">
            <Link>
              <Text>Search</Text>
            </Link>
            <Link to="booking-history">
              <Text mx="50px">Room</Text>
            </Link>

            <Menu>
              <MenuButton fontWeight="bold" fontSize="18px" my="auto">Account</MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
                    <MenuDivider/>
                    <MenuItem onClick={switchToTenant}>Switch To Tenant</MenuItem>
                    <MenuDivider/>
                    {
                      id ?
                    <MenuItem onClick={logout}>Logout</MenuItem>
                      :
                    <MenuItem onClick={() => history.push("/login")}>Login</MenuItem>
                  }
                  <MenuDivider/>
                  </MenuList>
            </Menu>
          </Flex> 
          <Avatar size="md" objectFit={"cover"} overflow="hidden" my="auto" src={ process.env.REACT_APP_API_BASE_URL + ProfilePic}/>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavbarDestop;
