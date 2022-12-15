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
    Alert,
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

function CompleteFormTenant() {

    const {id, roleId} = useSelector( state => state.user)
    let history = useHistory()

    // formik initialization
    const formik = useFormik({
        initialValues: {
            nameLapak : "",
            phoneNumber : "",
            idCard : ""
        },
        validationSchema: Yup.object().shape({
            nameLapak : Yup.string().required("name lapak can't be empty"),
            phoneNumber: Yup.string().phone("ID").required("phone number can't be empty"),
            idCard : Yup.number("input your idCard").required("id card can't be empty")
        }),
        validateOnChange : false,
        onSubmit : async (values) => {
            console.log(values)
            const {nameLapak, phoneNumber, idCard} = values
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/tenant/complete-register`, {
                name : nameLapak,
                phoneNumber,
                idCardPic : idCard,
                userId : id
            })
            .then((res) => {
                alert(res.data.message)
                history.push("/")
            })
            .catch((err) => {
                console.error(err.data.message)
            })
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
                                onChange={(e) => formik.setFieldValue("nameLapak", e.target.value)}
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
                                onChange={(e) => formik.setFieldValue("phoneNumber", e.target.value)}
                            />

                            {formik.errors.phoneNumber? (
                                <Alert status="error" color="red" text="center">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <Text ms="10px">{formik.errors.phoneNumber}</Text>
                                </Alert>
                                ) : null}
                            </FormControl>
                            {/* <FormControl id="account-bank" pb="12px">
                            <Input
                                type="number"
                                placeholder="Insert Account Bank"
                                borderRadius="0"
                                bg="white"
                                onChange={(e) => formik.setFieldValue("accountBank", e.target.value)}
                            />

                            {formik.errors.accountBank? (
                                <Alert status="error" color="red" text="center">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <Text ms="10px">{formik.errors.accountBank}</Text>
                                </Alert>
                                ) : null}
                            </FormControl> */}

                            <FormControl id="idCard" pb="12px">
                            <Input
                                type="Text"
                                placeholder="Upload Id Card "
                                borderRadius="0"
                                bg="white"
                                onChange={(e) => formik.setFieldValue("idCard", e.target.value)}
                            />

                            {formik.errors.idCard? (
                                <Alert status="error" color="red" text="center">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <Text ms="10px">{formik.errors.idCard}</Text>
                                </Alert>
                                ) : null}
                            </FormControl>
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
        </Layout>
    );
}

export default CompleteFormTenant;
