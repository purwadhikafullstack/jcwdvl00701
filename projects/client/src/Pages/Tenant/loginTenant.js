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
  Alert
} from "@chakra-ui/react";
import turuIcon from "../../Assets/image/turuIcon.png";
import google from "../../Assets/image/google.png";
import facebook from "../../Assets/image/facebook.png";
import loginTenant from "../../Assets/image/loginTenant.png";
import {Link} from "react-router-dom";
import Layout from "../../Components/Layout";
import axios from "axios"
import {signInWithEmailAndPassword} from "firebase/auth"
import {authFirebase} from "../../Config/firebase";
import {useFormik} from "formik"
import * as Yup from "yup";
import YupPassword from "yup-password"
import auth_types from "../../Redux/Reducers/Types/userTypes";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Footer from "../../Components/Footer";
import {getAuth} from "firebase/auth";

function LoginTenant() {
  const global = useSelector(state => state.user)
  let history = useHistory()

  if (global.id) {
    history.push('/tenant/dashboard')
  }

  const [wrongPass, setWrongPass] = useState("")
  // for toggling password visibility
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => {
    setShowPassword(!showPassword)
  }
  const dispatch = useDispatch()

  YupPassword(Yup)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("your email is invalid").email("input your email"),
      password: Yup.string().required("please fill in the password")
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const {email, password} = values

      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
        .catch(function (error) {
          //handle error
          var errorCode = error.code
          var errorMessage = error.errorMessage
          if (errorCode === "auth/wrong-password") {
            setWrongPass("Wrong Password")
          } else {
            alert(errorMessage)
          }
          console.log(error);
        })
      const user = userCredential.user

      // utk get data ke back-end dan di simpan di redux
      const response = axios.get(`${process.env.REACT_APP_API_BASE_URL}/tenant/get-tenant`, {
        params: {id: user.uid}
      })

      if ((await response).data.code !== 200) {
        alert("please register for your account")
      } else {
        if ((await response).data.result !== null) {
          history.push("/tenant/dashboard")
        } else {
          alert("your account is not Tenant")
          authFirebase.signOut()
          history.push("/login")
        }
      }
    }
  })
  return (
    // <Layout>
    <>
      <Container maxW="2x1" px="0px">
        <Flex flexDirection="column" bg="black">
          {/* flex container utk dekstop */}
          <Flex>
            {/* utk image dekstop */}
            <Box
              width="900px"
              display={{ss: "none", sm: "none", md: "block"}}
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
            <Box w="50em" border={"1px"}>
              <Flex justifyContent="center" alignItems="center" my="3em" mb={"80vh"}>
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
                            onChange={(e) => formik.setFieldValue("email", e.target.value)}
                          />
                          {formik.errors.email ?
                            <Alert status="error" color="red" text="center">
                              <i className="fa-solid fa-circle-exclamation"></i>
                              <Text ms="10px">{formik.errors.email}</Text>
                            </Alert>
                            :
                            null
                          }
                        </FormControl>
                        <FormControl id="password" pb="15px">
                          <InputGroup>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              borderRadius="0"
                              bg="white"
                              onChange={(e) => formik.setFieldValue("password", e.target.value)}
                            />
                            <InputRightElement>
                              <Button onClick={handleClick}>
                                <i className={showPassword ? "fa-sharp fa-solid fa-eye" : "fa-solid fa-eye-slash"}/>
                              </Button>
                            </InputRightElement>

                          </InputGroup>
                          {formik.errors.password ? (
                            <Alert status="error" color="red" text="center">
                              <i className="fa-solid fa-circle-exclamation"></i>
                              <Text ms="10px">{formik.errors.password}</Text>
                            </Alert>
                          ) : null}

                          {
                            wrongPass ?
                              <Alert status="error" color="red" text="center">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <Text ms="10px">{wrongPass}</Text>
                              </Alert>
                              :
                              null
                          }
                        </FormControl>
                        <Button variant="primary" mb="12px" onClick={formik.handleSubmit}>
                          Login
                        </Button>
                      </Flex>
                      <Flex justifyContent="flex-end" mr="10px" mb="16px">
                        <Text
                          fontSize="12px"
                          fontWeight="300"
                          cursor="pointer"
                          _hover={{textDecoration: "underline"}}
                          color="white"
                        >
                          <Link to="/login"> Login as User</Link>
                        </Text>
                      </Flex>
                      <hr/>
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
        </Flex>
      </Container>
      <Footer
        // ss={"13em"}
        // sm={"14em"}
        // sl={"15em"}
      />
    </>
    // </Layout>
  );
}

export default LoginTenant;
