import React, { useRef, useState } from "react";
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
  Alert,
  FormHelperText,
} from "@chakra-ui/react";
import turuIcon from "../../Assets/image/turuIcon.png";
import google from "../../Assets/image/google.png";
import facebook from "../../Assets/image/facebook.png";
import registerTenant from "../../Assets/image/registerTenant.png";
import Layout from "../../Components/Layout";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone";
import axios from "axios";
import Footer from "../../Components/Footer";

function CompleteFormTenant() {
  const { id, UserRoles } = useSelector((state) => state.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [fileSizeMsg, setFileSizeMsg] = useState("");
  let history = useHistory();

  // console.log(UserRoles);
  if (UserRoles.includes(2)) {
    history.push("/tenant/dashboard");
  }

  const handleFile = (event) => {
    if (event.target.files[0].size / 1024 > 1024) {
      setFileSizeMsg("File size is greater than maximum limit");
    } else {
      setSelectedFile(event.target.files[0]);
      formik.setFieldValue("idCardPic", event.target.files[0]);
    }
  };

  // formik initialization
  const formik = useFormik({
    initialValues: {
      nameLapak: "",
      phoneNumber: "",
      idCardPic: selectedFile,
    },
    validationSchema: Yup.object().shape({
      nameLapak: Yup.string().required("name lapak can't be empty"),
      phoneNumber: Yup.string()
        .phone("ID")
        .required("phone number can't be empty"),
      idCardPic: Yup.string("input your idCard").required(
        "id card can't be empty"
      ),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      const { nameLapak, phoneNumber, idCardPic } = values;

      const formData = new FormData();

      formData.append("name", nameLapak);
      formData.append("phoneNumber", phoneNumber);
      formData.append("idCardPic", idCardPic);
      formData.append("userId", id);

      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/tenant/complete-register`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          history.push("/");
        })
        .catch((err) => {
          console.error(err.data.message);
        });
    },
  });
  return (
    <>
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
            <Box w="50em">
              <Flex justifyContent="center" alignItems="center" my="12em">
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
                      Complete Tenant Profile
                    </Heading>
                    <Flex w="194px" h="37px" justifyContent="center">
                      <Text
                        fontSize="12px"
                        lineHeight="15.6px"
                        fontWeight="300"
                        textAlign="center"
                        mr="5px"
                        color="white"
                      >
                        Fill your data for tenant profile
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Box width="320px" height="427px">
                      <Flex flexDirection="column" alignItems="center">
                        <FormControl id="name" pb="12px">
                          <Input
                            type="text"
                            placeholder="Name a lapak"
                            borderRadius="0"
                            bg="white"
                            onChange={(e) =>
                              formik.setFieldValue("nameLapak", e.target.value)
                            }
                          />

                          {formik.errors.nameLapak ? (
                            <Alert status="error" color="red" text="center">
                              <i className="fa-solid fa-circle-exclamation"></i>
                              <Text ms="10px">{formik.errors.nameLapak}</Text>
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
                              formik.setFieldValue(
                                "phoneNumber",
                                e.target.value
                              )
                            }
                          />

                          {formik.errors.phoneNumber ? (
                            <Alert status="error" color="red" text="center">
                              <i className="fa-solid fa-circle-exclamation"></i>
                              <Text ms="10px">{formik.errors.phoneNumber}</Text>
                            </Alert>
                          ) : null}
                        </FormControl>
                        <FormControl id="idCardPic" pb="12px">
                          <Input
                            type="file"
                            placeholder="Upload Id Card "
                            borderRadius="0"
                            bg="white"
                            onChange={handleFile}
                            ref={inputFileRef}
                            display="none"
                            accept="image/*"
                          />
                          <FormHelperText color="white">
                            Max size: 1MB
                          </FormHelperText>
                          <Button
                            variant="secondary"
                            w="100%"
                            onClick={() => inputFileRef.current.click()}
                          >
                            Input Id Card
                          </Button>

                          {formik.errors.idCardPic ? (
                            <Alert status="error" color="red" text="center">
                              <i className="fa-solid fa-circle-exclamation"></i>
                              <Text ms="10px">{formik.errors.idCardPic}</Text>
                            </Alert>
                          ) : null}
                          {selectedFile ? (
                            <Alert status="info" color="green" text="center">
                              <i className="fa-solid fa-check"></i>
                              <Text ms="10px">Id Card uploaded</Text>
                            </Alert>
                          ) : null}
                        </FormControl>
                        <Button
                          variant="primary"
                          mb="12px"
                          onClick={formik.handleSubmit}
                        >
                          complete data
                        </Button>
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
  );
}

export default CompleteFormTenant;
