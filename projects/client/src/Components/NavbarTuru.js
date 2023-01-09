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
  Spacer,
  MenuDivider,
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import turuIcon from "../Assets/image/turuIcon.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { authFirebase } from "../Config/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

import { useDisclosure } from "@chakra-ui/react";
import React from "react";

function NavbarMobileTenant() {
  const location = useLocation().pathname;
  const pathLocation = location.split("/");
  const history = useHistory();
  const auth = authFirebase;

  const btnRef = React.useRef();
  const {
    isOpen: isDestopOpen,
    onOpen: onDestopOpen,
    onClose: onDestopClose,
  } = useDisclosure();
  const {
    isOpen: isMobileOpen,
    onOpen: onMobileOpen,
    onClose: onMobileClose,
  } = useDisclosure();
  const { id, ProfilePic } = useSelector((state) => state.user);

  const logout = () => {
    signOut(auth)
      .then(() => alert("signed out"))
      .catch((error) => alert(error));
  };

  const switchToTenant = () => {
    history.push("/tenant/complete-register");
  };

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
    {
      url: "/",
      icon: <i className="fa-solid fa-door-open"></i>,
      text: "Switch to User",
    },
  ];

  if (pathLocation[1] === "tenant") {
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
            <Button
              _hover={{ bg: "primary" }}
              borderRadius="0px"
              bg="white"
              _active={{
                bg: "white",
              }}
              onClick={onMobileOpen}
              fontSize="18px"
            >
              <i className="fa-solid fa-bars"></i>
            </Button>

            <Drawer
              placement="top"
              onClose={onMobileClose}
              isOpen={isMobileOpen}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  <Image
                    src={turuIcon}
                    mr="1em"
                    width="50px"
                    height="50px"
                  ></Image>
                  <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody>
                  {menuItemContents.map((content) => {
                    return (
                      <Box
                        my="10px"
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
                      </Box>
                    );
                  })}
                  <Box
                    my="10px"
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
                      _hover={{
                        bg: "black",
                        color: "white",
                        transition: "0.3s",
                      }}
                    >
                      <strong>Sign Out</strong>
                    </Flex>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            {/* <Menu>
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
            </Menu> */}
          </Flex>
        </Container>
      </Box>
    );
  } else {
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
                <MenuButton fontWeight="bold" fontSize="18px" my="auto">
                  Account
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => history.push("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={switchToTenant}>Switch To Tenant</MenuItem>
                  <MenuDivider />
                  {id ? (
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  ) : (
                    <MenuItem onClick={() => history.push("/login")}>
                      Login
                    </MenuItem>
                  )}
                  <MenuDivider />
                </MenuList>
              </Menu>
            </Flex>
            <Avatar
              size="md"
              objectFit={"cover"}
              overflow="hidden"
              my="auto"
              src={process.env.REACT_APP_API_BASE_URL + ProfilePic}
            />
          </Flex>
        </Container>
      </Box>
    );
  }
}

export default NavbarMobileTenant;
