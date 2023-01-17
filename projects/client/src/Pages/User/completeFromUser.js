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
    FormHelperText
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
import axios from "axios"
import Footer from "../../Components/Footer";
import loginImage from "../../Assets/image/loginImage.png";

function CompleteFormUser() {
    const {UserRoles, id} = useSelector(state => state.user)
    const history = useHistory()
    // const dispatch = useDispatch()
    //console.log(UserRoles[0]);
    //console.log(id);

    if(UserRoles.includes(1)){
        history.push("/")
    } 
    
    // formik initialization
    const formik = useFormik({
        initialValues: {
            name : "",
            phoneNumber : ""
        },
        validationSchema : Yup.object().shape({
            name : Yup.string().required("name can't be empty"),
            phoneNumber : Yup.string().phone("ID").required("phone number can't be empty")
        }),
        validateOnChange : false,
        onSubmit : async (values) => {
            //console.log(values);
            const {name, phoneNumber} = values
            // data yg akan di post ada 3, name, phoneNumber dan userId(dari redux), 

            axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/complete-user`, {
                name ,
                phoneNumber,
                userId : id
            })
            .then((res) => {
                //console.log(res.data);
                alert(res.data.message)
                history.go("/")
            })
            .catch((err) => {
                console.error(err)
            })
        }
    })
    return (
        <>
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
                    display={{
                        ss: "none",
                        sm: "none",
                        sl: "none",
                        md: "block",
                        lg: "block",
                    }}
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
                        <Heading as="h1" size="md" m="10px">
                        Complete User Profile
                        </Heading>
                        <Flex w="194px" h="37px" justifyContent="center">
                        <Text
                            fontSize="12px"
                            lineHeight="15.6px"
                            fontWeight="300"
                            textAlign="center"
                            mr="5px"
                        >
                            Fill your data for to be user
                        </Text>
                        </Flex>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <Box width="320px" height="427px">
                        <Flex flexDirection="column" alignItems="center">
                            <FormControl id="name" pb="12px">
                            <Input
                                type="text"
                                placeholder="Name User"
                                borderRadius="0"
                                bg="white"
                                onChange={(e) => formik.setFieldValue("name", e.target.value)}
                            />

                            {formik.errors.name ? (
                                <Alert status="error" color="red" text="center">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <Text ms="10px">{formik.errors.name}</Text>
                                </Alert>
                                ) : null}
                            </FormControl>
                            <FormControl id="phoneNumber" pb="12px">
                            <Input
                                type="number"
                                placeholder="Phone number"
                                borderRadius="0"
                                bg="white"
                                onChange={(e) => formik.setFieldValue("phoneNumber", e.target.value)}
                            />

                            {formik.errors.phoneNumber? (
                                <Alert status="error" color="red" text="center">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <Text ms="10px">{formik.errors.phoneNumber}</Text>
                                </Alert>
                                ) : null}
                            </FormControl>
                            {/* <FormControl id="idCardPic" pb="12px">
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
                                    <i className="fa-solid fa-check"></i>
                                    <Text ms="10px">Id Card uploaded</Text>
                                    </Alert>
                                )
                                :
                                null
                            }
                            </FormControl> */}
                            <Button variant="primary" mb="12px" onClick={formik.handleSubmit}>
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
    )
}

export default CompleteFormUser