import React from "react";
import {
  Flex,
  Spacer,
  Image,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";
import turuIcon from "../../Assets/image/turuIcon.png";
import google from "../../Assets/image/google.png";
import facebook from "../../Assets/image/facebook.png";
import loginTenant from "../../Assets/image/loginTenant.png";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";

function LoginTenant() {
  return (
    <>
      <Container maxW="2x1">
        <Flex flexDirection="column" bg="black">
          {/* flex container utk dekstop */}
          <Flex>
            {/* utk image dekstop */}
            <Box
              width="900px"
              display={{ ss: "none", sm: "none", md: "block" }}
            >
              <Flex>
                <Image
                  display={{
                    ss: "none",
                    sm: "none",
                    sl: "none",
                    md: "block",
                    lg: "block",
                  }}
                  src={loginTenant}
                  width="900px"
                  height="1080px"
                  objectFit="cover"
                  overflow="hidden"
                />
              </Flex>
            </Box>

            {/* Form */}
            <Box w="50em">
              <Flex justifyContent="center" alignItems="center" my="3em">
                <Box width="360px" height="297px">
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pt="19px"
                    pb="10px"
                  >
                    <Image
                      src={turuIcon}
                      alt="turu-icon"
                      width="59px"
                      height="58px"
                    />
                    <Heading as="h1" size="md" m="10px" color="white">
                      Welcome to Turu
                    </Heading>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Box width="320px" height="427px">
                      <Flex flexDirection="column" alignItems="center">
                        <FormControl id="email" pb="12px">
                          <Input
                            type="email"
                            placeholder="Email/Phone number"
                            borderRadius="0"
                            bg="white"
                          />
                        </FormControl>
                        <FormControl id="password" pb="15px">
                          <Input
                            type="password"
                            placeholder="Password"
                            borderRadius="0"
                            bg="white"
                          />
                        </FormControl>
                        <Button variant="primary" mb="12px">
                          Login
                        </Button>
                      </Flex>
                      <Flex justifyContent="flex-end" mr="10px" mb="16px">
                        <Text
                          fontSize="12px"
                          fontWeight="300"
                          cursor="pointer"
                          _hover={{ textDecoration: "underline" }}
                          color="white"
                        >
                          <Link to="/login"> Login as User</Link>
                        </Text>
                      </Flex>
                      <hr />
                      <Button variant="secondary" mt="20px">
                        <Flex justifyContent="flex-start">
                          <Image src={google} mr="5px"></Image>
                          <Text>Login With Google</Text>
                        </Flex>
                      </Button>
                      <Button variant="secondary" mt="20px">
                        <Image src={facebook}></Image>
                        <Text>Login With Facebook</Text>
                      </Button>
                      <Flex
                        justifyContent="center"
                        border="1px"
                        borderColor="gray.200"
                        mt="20px"
                        bg="white"
                      >
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          height="37px"
                          width="205px"
                        >
                          <Text fontSize="12px" fontWeight="300" pr="5px">
                            Dont have an account?
                          </Text>
                          <Text
                            fontSize="12px"
                            fontWeight="300"
                            _hover={{
                              textDecoration: "underline",
                              fontWeight: "bold",
                            }}
                            cursor="pointer"
                          >
                            <Link to="/tenant/register">Join Turu</Link>
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Footer ss={"13em"} sm={"14em"} sl={"15em"} />
        </Flex>
      </Container>
    </>
  );
}

export default LoginTenant;
