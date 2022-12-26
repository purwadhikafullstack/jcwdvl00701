import { useRef, useState } from "react";
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
  Alert,
  FormHelperText
} from "@chakra-ui/react";
import turuIcon from "../../Assets/image/turuIcon.png";
import google from "../../Assets/image/google.png";
import facebook from "../../Assets/image/facebook.png";
import registerTenant from "../../Assets/image/registerTenant.png";
import Layout from "../../Components/Layout";
import { Link, useHistory } from "react-router-dom";
import {authFirebase} from "../../Config/firebase";
import axios from "axios";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth"
import {useFormik} from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone";

function RegisterTenant() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const inputFileRef = useRef(null)
  const [fileSizeMsg, setFileSizeMsg] = useState("");
  let history = useHistory()

  const handleFile = (event) => {
        if (event.target.files[0].size / 1024 > 1024) {
            setFileSizeMsg("File size is greater than maximum limit");
        } else {
            setSelectedFile(event.target.files[0]);
            formik.setFieldValue("idCardPic", event.target.files[0]);
        }
    };

  const _handleRegister = async (credential, payload={}) => {

    const user = credential.user
    const provider = credential.providerId ? credential.providerId : "password"

    const registerUrl = `${process.env.REACT_APP_API_BASE_URL}/tenant/register-tenant`
    console.log("_handleregister", payload);

    let {name, email ,phoneNumber, idCardPic} = payload
    const formData = new FormData()

    formData.append("id" , user.uid)
    formData.append("firebaseProviderId", provider)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("idCardPic", idCardPic)
    formData.append("name" , name)

    const response = await axios.post(registerUrl, formData)
    console.log(response.data);

    history.push("/tenant/dasboard")
  }

  YupPassword(Yup)
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        idCardPic : selectedFile
      },
      validationSchema: Yup.object().shape({
        name : Yup.string().required("fill your name"),
        email: Yup.string().required("your email is invalid").email("format yang dimasukan bukan email"),
        phoneNumber: Yup.string().phone("ID").required(),
        password: Yup.string().required("please fill in the password").min(8).minUppercase(1).minNumbers(1),
        confirmPassword: Yup.string().required("please re-type your password")
            .oneOf([Yup.ref('password'), null], 'Didn\'t match with password'),
        idCardPic : Yup.string().required("please insert your id card")
    }),
    validateOnChange: false,
    onSubmit : async (values) => {
      console.log(values);

      const {name, email, phoneNumber, password, idCardPic} = values

      const credential = await createUserWithEmailAndPassword(authFirebase, email, password)
      const user = credential.user
      

      await _handleRegister(credential , {name : name, email : email, phoneNumber : phoneNumber , idCardPic : idCardPic})
    }
  })
  return (
    <Layout>
      <Container maxW="2x1" px="0px">
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
                  src={registerTenant}
                  width="900px"
                  height="1080px"
                  objectFit="cover"
                  overflow="hidden"
                />
              </Flex>
            </Box>

            {/* Form */}
            <Box w="50em" my="5em">
              <Flex justifyContent="center" alignItems="center" my="3em">
                <Box width="360px" height="297px">
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pt={{
                      ss: "5px",
                      sm: "5px",
                      sl: "5px",
                      md: "19px",
                      lg: "19px",
                    }}
                    pb="10px"
                  >
                    <Image
                      src={turuIcon}
                      alt="turu-icon"
                      width="59px"
                      height="58px"
                    />
                    <Heading as="h1" size="md" m="10px" color="white">
                      Join Turu
                    </Heading>
                    <Flex w="184px" h="37px" justifyContent="center">
                      <Text
                        fontSize="12px"
                        lineHeight="15.6px"
                        fontWeight="300"
                        textAlign="center"
                        mr="5px"
                        color="white"
                      >
                        Already have an acount?
                      </Text>
                      <Text
                        fontSize="12px"
                        lineHeight="15.6px"
                        fontWeight="300"
                        textAlign="center"
                        color="white"
                        _hover={{
                          textDecoration: "underline",
                          fontWeight: "bold",
                        }}
                        cursor="pointer"
                      >
                        <Link to="/tenant/login">Login</Link>
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Box width="320px" height="427px">
                      <Flex flexDirection="column" alignItems="center">
                        <FormControl id="name" pb="12px">
                          <Input
                            type="name"
                            placeholder="Name"
                            borderRadius="0"
                            bg="white"
                            onChange={(e) =>
                                formik.setFieldValue("name", e.target.value)
                            }
                          />
                          {formik.errors.name? (
                              <Alert status="error" color="red" text="center">
                                  <i className="fa-solid fa-circle-exclamation"></i>
                                  <Text ms="10px">{formik.errors.name}</Text>
                              </Alert>
                            ) : null}
                        </FormControl>
                        <FormControl id="email" pb="12px">
                          <Input
                            type="email"
                            placeholder="Email"
                            borderRadius="0"
                            bg="white"
                            onChange={(e) =>
                                formik.setFieldValue("email", e.target.value)
                            }
                          />
                          {formik.errors.email? (
                              <Alert status="error" color="red" text="center">
                                  <i className="fa-solid fa-circle-exclamation"></i>
                                  <Text ms="10px">{formik.errors.email}</Text>
                              </Alert>
                            ) : null}
                        </FormControl>
                        <FormControl id="phoneNumber" pb="12px">
                          <Input
                            type="number"
                            placeholder="Phone number"
                            borderRadius="0"
                            bg="white"
                            onChange={(e) =>
                                formik.setFieldValue("phoneNumber", e.target.value)
                            }
                          />
                          {formik.errors.phoneNumber? (
                              <Alert status="error" color="red" text="center">
                                  <i className="fa-solid fa-circle-exclamation"></i>
                                  <Text ms="10px">{formik.errors.phoneNumber}</Text>
                              </Alert>
                            ) : null}
                        </FormControl>
                        <FormControl id="password" pb="12px">
                          <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    borderRadius="0"
                                    bg="white"
                                    onChange={(e) =>
                                        formik.setFieldValue("password", e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    <Button onClick={() => setShowPassword(current => !current)}>
                                        {showPassword ? (
                                            <i className="fa-sharp fa-solid fa-eye"></i>
                                        ) : (
                                            <i className="fa-solid fa-eye-slash"></i>
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {formik.errors.password? (
                              <Alert status="error" color="red" text="center">
                                  <i className="fa-solid fa-circle-exclamation"></i>
                                  <Text ms="10px">{formik.errors.password}</Text>
                              </Alert>
                            ) : null}
                        </FormControl>
                        <FormControl id="confirmPassword" pb="12px">
                          <InputGroup>
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    borderRadius="0"
                                    bg="white"
                                    onChange={(e) =>
                                        formik.setFieldValue("confirmPassword",e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    <Button
                                        onClick={(e) => setShowConfirmPassword(current => !current)}
                                    >
                                        {showConfirmPassword ? (
                                            <i className="fa-sharp fa-solid fa-eye"></i>
                                        ) : (
                                            <i className="fa-solid fa-eye-slash"></i>
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {formik.errors.confirmPassword? (
                              <Alert status="error" color="red" text="center">
                                  <i className="fa-solid fa-circle-exclamation"></i>
                                  <Text ms="10px">{formik.errors.confirmPassword}</Text>
                              </Alert>
                            ) : null}
                        </FormControl>
                        <FormControl id="idCard" pb="12px">
                          <Input
                            type="file"
                            placeholder="Upload Id Card "
                            borderRadius="0"
                            bg="white"
                            // onChange={(e) => formik.setFieldValue("idCard", e.target.value)}
                            onChange={handleFile}
                            ref={inputFileRef}
                            display="none"
                            accept="image/*"
                          />
                          <FormHelperText color="white">Max size: 1MB</FormHelperText>
                            <Button
                            variant="secondary"
                            w="100%"
                            onClick={() => inputFileRef.current.click()}
                            >
                            Input Id Card
                            </Button>
                          {formik.errors.idCardPic? (
                            <Alert status="error" color="red" text="center">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <Text ms="10px">{formik.errors.idCardPic}</Text>
                            </Alert>
                            ) : null
                          }
                          {
                            selectedFile ? 
                            (
                                <Alert status="info" color="green" text="center">
                                <i class="fa-solid fa-check"></i>
                                <Text ms="10px">Id Card uploaded</Text>
                                </Alert>
                            )
                            :
                            null
                          }
                        </FormControl>
                        <Button variant="primary" mb="12px" onClick={formik.handleSubmit}>
                          Sign up
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
                          <Link to="/register"> Sign Up as User</Link>
                        </Text>
                      </Flex>
                      <hr />
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

export default RegisterTenant;
