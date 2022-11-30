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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import turuIcon from "../../Assets/image/turuIcon.png";
import google from "../../Assets/image/google.png";
import facebook from "../../Assets/image/facebook.png";
import loginImage from "../../Assets/image/loginImage.png";
import {useFormik} from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"
import { getAuth ,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendEmailVerification
} from "firebase/auth";
import { authFirebase } from "../../Config/firebase";
import axios from "axios"
import { useDispatch } from "react-redux";
import auth_types from "../../Redux/Reducers/Types/userTypes";
import { Link, useHistory } from "react-router-dom";

function LoginUser() {
    // for show password
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClick = () => {
        setShowPassword(!showPassword)
    }

    const history = useHistory()
    const dispatch = useDispatch()

    const auth = getAuth()
    const providerGoogle = new GoogleAuthProvider()
    console.log(providerGoogle);
    const providerFacebook = new FacebookAuthProvider()
    console.log(providerFacebook)
    
    // utk login google
    const handleWithGoogle = async () => {
      try {
        const handleWithGoogle = await signInWithPopup(authFirebase,providerGoogle)
        console.log(handleWithGoogle);
        var emailGoogle = handleWithGoogle.user.email

      } catch(error) {
        console.error(error)
      }
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/login` , {
          params : {
              email : emailGoogle,
          }
      })
      .then((res) => {
          console.log("data get4 :", res.data.results);
          console.log("data get6 :", res.data.results.id);
          dispatch({
              type : auth_types.Login,
              payload : res.data.results
          })
      })
      .catch((err) => {
          console.error(err.message)
      })
      history.push("/")
    }

    // utk login facebook
    const handleWithFacebook = async() => {
      try {
        const handleWithFacebook = await signInWithPopup(authFirebase, providerFacebook )
        console.log(handleWithFacebook);
        // utk cek email verified atau tidak
        const userFacebook = handleWithFacebook.user
        var emailFacebook = handleWithFacebook.user.email
        const emailFacebookVerified = handleWithFacebook.user.emailVerified

        if(emailFacebookVerified === " false"){
          sendEmailVerification(userFacebook)
              .then((res) => {
                  alert("Please check your email verification")
              })
              .catch((err) => {
                  console.error("err send email :", err.message)
              })
        }
        
      } catch (error){
        console.error(error)
      }
      
      // utk redux
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/login` , {
          params : {
              email : emailFacebook,
          }
      })
      .then((res) => {
          console.log("data get4 :", res.data.results);
          console.log("data get6 :", res.data.results.id);
          dispatch({
              type : auth_types.Login,
              payload : res.data.results
          })
      })
      .catch((err) => {
          console.error(err.message)
      })
      history.push("/")
    }

    //masuk melalui email dan password
    //configure yup
    YupPassword(Yup)
    //formik initialization
    const formik = useFormik({
      initialValues : {
        email : "",
        password : ""
      },
      validationSchema : Yup.object().shape({
        email: Yup.string().required("your email is invalid").email("input your email"),
        password : Yup.string().required("please fill in the password").min(8).minUppercase(1).minNumbers(1)
      })
    })
  return (
    <Layout>
      <Container maxW="2x1" px="0px">
        <Flex flexDirection="column">
          {/* flex container utk dekstop */}
          <Flex>
            {/* utk image dekstop */}
            <Box
              width="900px"
              display={{ ss: "none", sm: "none", md: "block" }}
            >
              <Flex>
                <Image
                  // display={{ ss:"none", sm:"none", sl:"none", md:"block", lg:"block"}}
                  src={loginImage}
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
                    <Heading as="h1" size="md" m="10px">
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
                          />
                        </FormControl>
                        <FormControl id="password" pb="15px">
                          <InputGroup>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              borderRadius="0"
                            />
                            <InputRightElement>
                              <Button onClick={handleClick}>
                                {showPassword ? (
                                  <i className="fa-sharp fa-solid fa-eye"></i>
                                ) : (
                                  <i className="fa-solid fa-eye-slash"></i>
                                )}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
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
                        >
                          <Link to="/tenant/login">Login as Tenant</Link>
                        </Text>
                      </Flex>
                      <hr />
                      <Button variant="secondary" mt="20px" onClick={handleWithGoogle}>
                        <Flex justifyContent="flex-start">
                          <Image src={google} mr="5px"></Image>
                          <Text>Login With Google</Text>
                        </Flex>
                      </Button>
                      <Button variant="secondary" mt="20px" onClick={handleWithFacebook}>
                        <Image src={facebook}></Image>
                        <Text>Login With Facebook</Text>
                      </Button>
                      <Flex
                        display="flex"
                        justifyContent="center"
                        border="1px"
                        borderColor="gray.200"
                        mt="20px"
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
                            <Link to="/register">Join Turu</Link>
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
}

export default LoginUser;
