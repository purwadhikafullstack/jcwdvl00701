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
  FormHelperText
} from "@chakra-ui/react";
import turuIcon from "../Assets/image/turuIcon.png";
import { Link } from "react-router-dom";
import {auth, getAuth, sendPasswordResetEmail} from "firebase/auth"
import {useFormik} from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"
import { async } from "@firebase/util";
import { authFirebase } from "../Config/firebase";

function ForgotPassword() {
  const [isEmail, setIsEmail] = useState(false);

  const check = () => {
    setIsEmail(true);
  };

  // utk cek email validation pakai formik
  //consfigure yup
  YupPassword(Yup)
  //formik initialization
  const formik = useFormik({
    initialValues : {
      email : ""
    },
    validationSchema : Yup.object().shape({
      email: Yup.string().required("your email is invalid").email("format email is wrong")
    }),
    validateOnChange : false,
    onSubmit: async (values) => {
      const {email} = values

      const auth = getAuth()
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email for reset password")
      })
      .catch((err) => {
        console.error(err)
      })
    }
  })

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
                    <Input 
                    type="email"
                    placeholder="Email" 
                    borderRadius="0" 
                    onChange={(e) => formik.setFieldValue("email", e.target.value)}
                    />
                    {formik.errors.email ? 
                        <FormHelperText color="red" textAlign="center">
                            {formik.errors.email}
                        </FormHelperText >
                        :
                        null
                    }
                  </FormControl>
                  <Button variant="primary" mb="12px" onClick={formik.handleSubmit}>
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
