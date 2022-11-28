import React, { useState } from "react";
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
  Avatar,
  Container,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import NavbarMobile from "../../Components/NavbarMobile";

function ProfileTenant() {
  const [editUsername, setEditUsername] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editGender, setEditGender] = useState(false);
  const [editBirthdate, setEditBirthdate] = useState(false);

  const clickEdit = (name) => {
    // nanti akan disamakan dengan id
    if (name === "username") {
      setEditUsername(true);
    } else if (name === "phone") {
      setEditPhone(true);
    } else if (name === "gender") {
      setEditGender(true);
    } else if (name === "birthdate") {
      setEditBirthdate(true);
    }
  };

  return (
    <Box mt="80px">
      <Container maxW="1140px">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction={["column"]}
        >
          <Box
            width="360px"
            height="max-content"
            pb="20px"
            pl="20px"
            pr="20px"
            mb={{ sm: "0", md: "4em" }}
          >
            <Flex pt="40px">
              <Box mr="20px" w="80px" h="80px">
                <Avatar w="80px" h="80px" />
              </Box>
              <Box>
                <Text fontSize="22px" fontWeight="600">
                  Kratos
                </Text>
                <Text color="#AFAFAF">28 November 1820</Text>
                <Text
                  textDecoration="underline"
                  fontSize="16px"
                  fontWeight="400"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  Update Photo
                </Text>
              </Box>
            </Flex>
            <Box pt="10px">
              <Text fontWeight="600" fontSize="20px">
                Personal Info
              </Text>
            </Box>
            <Box h="max-content" borderBottom="1px" pt="10px">
              <Flex justifyContent="space-between">
                <Text>Username</Text>
                <Text
                  textDecoration="underline"
                  cursor="pointer"
                  onClick={() => clickEdit("username")}
                >
                  Edit
                </Text>
              </Flex>
              {editUsername ? (
                <Input
                  type="text"
                  variant="flushed"
                  placeholder="Username"
                ></Input>
              ) : (
                <Text color="gray.300">Username</Text>
              )}
            </Box>
            <Box h="max-content" borderBottom="1px" pt="10px">
              <Flex justifyContent="space-between">
                <Text>Phone number</Text>
                <Text
                  textDecoration="underline"
                  cursor="pointer"
                  onClick={() => clickEdit("phone")}
                >
                  Edit
                </Text>
              </Flex>
              {editPhone ? (
                <Input
                  type="text"
                  variant="flushed"
                  placeholder="Phone number"
                ></Input>
              ) : (
                <Text color="gray.300">Phone number</Text>
              )}
            </Box>
            <Box h="max-content" borderBottom="1px" pt="10px">
              <Flex justifyContent="space-between">
                <Text>Gender</Text>
                <Text
                  textDecoration="underline"
                  cursor="pointer"
                  onClick={() => clickEdit("gender")}
                >
                  Edit
                </Text>
              </Flex>
              {editGender ? (
                <Input
                  type="text"
                  variant="flushed"
                  placeholder="male/female"
                ></Input>
              ) : (
                <Text color="gray.300">Gender</Text>
              )}
            </Box>
            <Box h="max-content" borderBottom="1px" pt="10px">
              <Flex justifyContent="space-between">
                <Text>Birtdate</Text>
                <Text
                  textDecoration="underline"
                  cursor="pointer"
                  onClick={() => clickEdit("birthdate")}
                >
                  Edit
                </Text>
              </Flex>
              {editBirthdate ? (
                <Input
                  type="text"
                  variant="flushed"
                  placeholder="Input your Birthdate"
                ></Input>
              ) : (
                <Text color="gray.300">Birthdate</Text>
              )}
            </Box>
            <Box h="max-content" pt="16px" pb="30px">
              <Text
                textDecoration="underline"
                _hover={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                <Link to="/reset-password">Reset Password</Link>
              </Text>
            </Box>
          </Box>
        </Flex>
        <Flex justifyContent="center"></Flex>
      </Container>
    </Box>
  );
}

export default ProfileTenant;
