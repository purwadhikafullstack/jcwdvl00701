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
  Container,
} from "@chakra-ui/react";
import turuIcon from "../Assets/image/turuIcon.png";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [isEmail, setIsEmail] = useState(false);

  const check = () => {
    setIsEmail(true);
  };

  return (
    <>
      <Container maxW="1140px">
        <Flex justifyContent="center" alignItems="center" h="700px">
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
              <Heading as="h1" size="md" m="10px">
                Forgot Password
              </Heading>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Box width="320px" height="427px">
                {/* teranary option */}
                <Flex flexDirection="column" alignItems="center">
                  <FormControl id="email" pb="12px">
                    <Input type="email" placeholder="Email" borderRadius="0" />
                  </FormControl>
                  <Button variant="primary" mb="12px" onClick={check}>
                    Send Email
                  </Button>
                  {isEmail ? (
                    <Text>Please Check Email for Your Account</Text>
                  ) : null}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </>
  );
}

export default ForgotPassword;
