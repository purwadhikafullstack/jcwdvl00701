import { 
  Box, 
  Flex, 
  Text, 
  useMediaQuery ,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Button
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { authFirebase } from "../Config/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

function NavbarMobile() {
  const [isLargerThan576] = useMediaQuery("(min-width: 576px)");
  const {id , ProfilePic, ProfileName} = useSelector(state => state.user)
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
  return id ?
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
            <Menu>
              <MenuButton fontWeight="regular">
                {
                  id ?
                  <Avatar size="sm"  my="auto" objectFit={"cover"} src={ process.env.REACT_APP_API_BASE_URL + ProfilePic}/>
                  :
                  <i className="fa-solid fa-circle-user"></i>
                }
                {
                  id ?
                  <Text fontWeight="regular" fontSize="12px">
                    {ProfileName}
                  </Text> 
                  :
                  <Text fontWeight="regular" fontSize="12px">
                    Account
                  </Text> 
                }
              </MenuButton>
                <MenuList>
                  <MenuItem fontSize="14px" onClick={() => history.push("/profile")}>Profile</MenuItem>
                  <MenuDivider/>
                  <MenuItem onClick={switchToTenant} fontSize="14px">Switch To Tenant</MenuItem>
                  <MenuDivider/>
                  <MenuItem onClick={logout} fontSize="14px">Logout</MenuItem>
                <MenuDivider/>
                </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
    :
    null
}

export default NavbarMobile;
