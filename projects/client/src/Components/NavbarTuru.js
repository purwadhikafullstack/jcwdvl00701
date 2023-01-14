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
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";

import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import auth_types from "../Redux/Reducers/Types/userTypes";

function NavbarMobileTenant() {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const pathLocation = location.split("/");
  const history = useHistory();
  const auth = authFirebase;
  const auth2 = getAuth()
  const [verifikasi , setVerifikasi] = useState(false)
  const [verifikasi2 , setVerifikasi2] = useState(true)
  console.log(verifikasi2);
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

  const { id, ProfilePic, ProfileName, firebaseProviderId, emailVerified } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    onAuthStateChanged(auth2 , (user) => {
      if(user) {
        setVerifikasi(user.emailVerified)
        if(!verifikasi){
          setVerifikasi2(false)
        } else {
          setVerifikasi2(true)
        }
      }
    })
  }, [verifikasi , verifikasi2])

  const logout = async () => {
    await signOut(auth).catch((error) => alert(error));
    dispatch({
      type: auth_types.Redux,
      payload: {
        id: "",
        email: "",
        emailVerified: "",
        firebaseProviderId: "",
        UserRoles: [],
        TenantId: 0,
        TenantName: "",
        ProfileName: "",
        ProfilePic: "",
      },
    });
    history.push("/login")
  };

  const switchToTenant = () => {
    history.push("/tenant/complete-register");
  };

  const bookingHistory = () => {
    history.push("/booking-history");
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
      url: "/complete-user",
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
                    onClick={async () => {
                      await signOut(auth).catch((error) => alert(error));
                      dispatch({
                        type: auth_types.Redux,
                        payload: {
                          id: "",
                          email: "",
                          emailVerified: "",
                          firebaseProviderId: "",
                          UserRoles: [],
                          TenantId: 0,
                          TenantName: "",
                          ProfileName: "",
                          ProfilePic: "",
                        },
                      });
                      history.push("/login");
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
                    history.push("/tenant/login")
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
            {
              verifikasi ?
              null
              :
              <Flex justifyContent={"flex-start"} my="auto" ms={"10px"}>
                {
                  verifikasi2 ?
                  null
                  :
                  <Text>Your Email not verified, please check your Email </Text>
                }
              </Flex>
            }
            {id ? (
              <Flex w="100%" mx="auto" justifyContent="space-between">
                <Spacer />
                <Flex fontWeight="bold" fontSize="18px" my="auto" mr="20px">
                  <Link to="/">
                    <Text>Search</Text>
                  </Link>
                  <Text mx="50px" onClick={bookingHistory} cursor="pointer">
                    Room
                  </Text>
                  <Menu>
                    {id ? (
                      <Box>
                      <i class="fa-solid fa-caret-down"></i>
                      <MenuButton fontWeight="bold" fontSize="18px" my="auto" ms={"8px"}>
                        {ProfileName}
                      </MenuButton>
                      </Box>
                    ) : (
                      <Box>
                      <i class="fa-solid fa-caret-down"></i>
                      <MenuButton fontWeight="bold" fontSize="18px" my="auto" ms={"3px"}>
                        Account
                      </MenuButton>
                      </Box>
                    )}
                    <MenuList>
                      <MenuItem onClick={() => history.push("/profile")}>
                        Profile
                      </MenuItem>
                      <MenuDivider />
                      {firebaseProviderId === "password" && verifikasi2 ? (
                        <MenuItem onClick={switchToTenant}>
                          Switch To Tenant
                        </MenuItem>
                      ) : null}
                      <MenuDivider />
                      <MenuItem onClick={logout}>Logout</MenuItem>
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
            ) : (
              <Button
                onClick={() => history.push("/login")}
                variant="secondary"
                height="58px"
                w="170px"
                mt={"10px"}
              >
                Login
              </Button>
            )}
          </Flex>
        </Container>
      </Box>
    );
  }
}

export default NavbarMobileTenant;
