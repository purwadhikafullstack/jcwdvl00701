import React, {useState} from 'react';
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
    Container, Select
} from '@chakra-ui/react'
import {Link} from "react-router-dom"

import {useFormik, useFormikContext} from 'formik'

import DatePicker from "react-datepicker";

import Footer from '../../Components/Footer';
import NavbarMobile from '../../Components/NavbarMobile';
import {current} from "@reduxjs/toolkit";

function renderInput(isEditActive, props) {
    return React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            disabled: !isEditActive
        })
    })
}

function UpdateInput(props) {
    const [isEditActive, setIsEditActive] = useState(false)

    return (
        <Box h="max-content" borderBottom="1px" mt={5}>
            <Flex justifyContent="space-between">
                <Text>{props.inputDisplayName}</Text>
                <Text textDecoration="underline" cursor="pointer" onClick={() => {
                    if (isEditActive) props.formik.submitForm()
                    setIsEditActive(current => !current)
                }}>
                    {!isEditActive ? "Edit" : "Save"}
                </Text>
            </Flex>

            {renderInput(isEditActive, props)}

        </Box>
    )
}

function Profile() {

    const formik = useFormik({
        initialValues: {
            name: 'Kratos',
            email: 'test@test.test',
            gender: 'Male',
            birthdate: new Date()
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })

    return (
        <Container maxW='container.sm' p={0}>
            <Container maxW='1140px'>
                <Flex justifyContent="center" alignItems="center" direction={["column"]}>
                    <Box width="360px" height="max-content" pb="20px" pl="20px" pr="20px" mb={{sm: "0", md: "4em"}}>
                        {/*Profile header*/}
                        <Flex pt="40px">
                            <Box mr="20px" w="80px" h="80px">
                                <Avatar w="80px" h="80px"/>
                            </Box>
                            <Box>
                                <Text fontSize="22px" fontWeight="600">Kratos</Text>
                                <Text color="#AFAFAF">28 November 1820</Text>
                                <Text textDecoration="underline" fontSize="16px" fontWeight="400" cursor="pointer"
                                      _hover={{textDecoration: "underline", fontWeight: "bold"}}>Update Photo</Text>
                            </Box>
                        </Flex>
                        {/*Profile header ends*/}

                        <Box pt="10">
                            <Heading as='h1' size="md">Personal Info</Heading>
                        </Box>

                        <Box mt={5}>
                            <UpdateInput inputDisplayName={'Name'} formik={formik}>
                                <Input id='name' type="text" variant='flushed' placeholder='insert your name'
                                       defaultValue={formik.values.name} onChange={formik.handleChange}/>
                            </UpdateInput>
                            <UpdateInput inputDisplayName={'Email'} formik={formik}>
                                <Input id='email' type="text" variant='flushed' placeholder='insert your email'
                                       defaultValue={formik.values.email} onChange={formik.handleChange}/>
                            </UpdateInput>
                            <UpdateInput inputDisplayName={'Gender'} formik={formik}>
                                <Select id='gender' placeholder='select your gender' variant='flushed' icon=''
                                        defaultValue={formik.values.gender} onChange={formik.handleChange}>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </Select>
                            </UpdateInput>
                            <UpdateInput inputDisplayName={'Birthdate'} formik={formik}>
                                <DatePicker selected={formik.values.birthdate}
                                            onChange={(date) => formik.setFieldValue('birthdate', date)}
                                            showMonthDropdown showYearDropdown dropdownMode="select" withPortal/>
                            </UpdateInput>
                        </Box>

                        <Box h="max-content" pt="16px" pb="30px">
                            <Text textDecoration="underline" _hover={{textDecoration: "underline", fontWeight: "bold"}}>
                                <Link to="/reset-password">Change Password</Link>
                            </Text>
                        </Box>
                    </Box>
                </Flex>

                <Flex justifyContent="center">
                    <NavbarMobile/>
                </Flex>
            </Container>
            <Box mb={{ss: "50px", sm: "62px", md: "0em"}}></Box>
            <Box mb={{ss: "50px", sm: "62px", md: "0em"}}>
                <Footer/>
            </Box>
        </Container>
    )
}

export default Profile