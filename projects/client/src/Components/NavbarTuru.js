import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
  Flex,
  Container,
  Text,
  Button,
} from "@chakra-ui/react";
import turuIcon from "../Assets/image/turuIcon.png";
import { Link, useHistory } from "react-router-dom";
import { authFirebase } from "../Config/firebase";
import { signOut } from "firebase/auth";

function NavbarMobileTenant() {
  const history = useHistory();
  const auth = authFirebase;

  const menuItemContents = [
    {
      url: "/tenant/dashboard",
      icon: <i className="fa-solid fa-table-list" />,
      text: "Dashboard",
    },
    {
      url: "/tenant/profile",
      icon: <i className="fa-solid fa-circle-user" />,
      text: "Profile",
    },
    {
      url: "/tenant/order",
      icon: <i className="fa-solid fa-clipboard-list" />,
      text: "Order",
    },
    {
      url: "/tenant/property",
      icon: <i className="fa-solid fa-building" />,
      text: "Property",
    },
    {
      url: "/tenant/room",
      icon: <i className="fa-solid fa-bed" />,
      text: "Room",
    },
    {
      url: "/tenant/report",
      icon: <i className="fa-solid fa-chart-simple" />,
      text: "Report",
    },
    {
      url: "/tenant/price",
      icon: <i className="fa-solid fa-cash-register" />,
      text: "Price",
    },
  ];

  return (
    <Box
      bg="white"
      p="10px"
      pos="fixed"
      top="0"
      w="100%"
      zIndex={10}
      boxShadow="base"
    >
      <Container maxW="1140px">
        <Flex justifyContent="space-between">
          <Image src={turuIcon} mr="1em" width="50px" height="50px"></Image>
          <Menu>
            <MenuButton
              _hover={{ bg: "white" }}
              _active={{
                bg: "white",
              }}
              fontSize="20px"
              icon={<i className="fa-solid fa-bars"></i>}
              as={IconButton}
              aria-label="Options"
              border="none"
              variant="outline"
              bg="white"
              my="auto"
            />

            <MenuList borderRadius="0px" width="100vw" border="none">
              {menuItemContents.map((content) => {
                return (
                  <MenuItem
                    key={`tenant-menu-${content.text.toLowerCase()}`}
                    _hover={{ bg: "white" }}
                    onClick={() => history.push(content.url)}
                  >
                    <Flex
                      bg={"#fbe946"}
                      w="100%"
                      h={"44px"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      _hover={{
                        bg: "black",
                        color: "white",
                        transition: "0.3s",
                      }}
                    >
                      {content.icon}&nbsp;<strong>{content.text}</strong>
                    </Flex>
                  </MenuItem>
                );
              })}

              <MenuItem
                key={`tenant-menu-signout`}
                _hover={{ bg: "white" }}
                onClick={() => {
                  signOut(auth)
                    .then(() => alert("signed out"))
                    .catch((error) => alert(error));
                }}
              >
                <Flex
                  bg={"#fbe946"}
                  w="100%"
                  h={"44px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ bg: "black", color: "white", transition: "0.3s" }}
                >
                  <strong>Sign Out</strong>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavbarMobileTenant;
