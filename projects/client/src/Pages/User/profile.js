import React, {useCallback, useEffect, useState} from 'react';
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
import {Link, useHistory} from "react-router-dom"

import {useFormik} from 'formik'
import * as Yup from 'yup';

import DatePicker from "react-datepicker";

import NavbarMobile from '../../Components/NavbarMobile';
import axios from "axios";
import {authFirebase} from "../../Config/firebase";

import store from "../../Redux/Reducers";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {useSelector} from "react-redux";

function renderInput(isEditActive, props) {
    return React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            disabled: !isEditActive
        })
    })
}

function UpdateInput(props) {
    const [isEditActive, setIsEditActive] = useState(false)
    const [isEditingForm, setIsEditingForm] = props.formState
    const [isLoading, setIsLoading] = useState(false)

    const handleEdit = async () => {
        if (props.errorMsg && isEditActive) return  // if there's error prevent submission

        if (isEditActive) {
            setIsLoading(true)
            props.formik.submitForm()
        }
        setIsEditActive(current => !current)
        setIsEditingForm(current => !current)
        setIsLoading(false)
    }

    return (
        <Box h="max-content" mt={5}>
            <Flex justifyContent="space-between" align='center'>
                <Text>{props.inputDisplayName}</Text>
                <Button onClick={handleEdit} variant='link' disabled={isEditingForm && !isEditActive}
                        isLoading={isLoading}>
                    {!isEditActive ? "Edit" : "Save"}
                </Button>
            </Flex>

            {renderInput(isEditActive, props)}

            {props.errorMsg ? <Text color={'red'}>*{props.errorMsg}</Text> : null}
        </Box>
    )
}

const UpdateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    phoneNumber: Yup.string().phone('id').nullable().required(),
    gender: Yup.string().nullable().required('Required')
        .min(1, 'test'),
    birthdate: Yup.date()
        .required('Required')
});

function Profile() {
    const history = useHistory();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [birthdate, setBirthdate] = useState(new Date())

    const [userId, setUserId] = useState('')
    const getUser = useCallback(() => {
        onAuthStateChanged(authFirebase, (user) => {
            if (user) {
                setUserId(user.uid)
            } else {
                history.push('/')
            }
        });
    }, [setUserId, history])

    const currentUser = useSelector(state => state)

    useEffect(() => {
        getUser()
    }, [getUser])

    const [firebaseProviderId, setfirebaseProviderId] = useState('password')

    const [isEditingForm, setIsEditingForm] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            birthdate: birthdate
        },
        validationSchema: UpdateSchema,
        onSubmit: async (values, {props}) => {
            // if values unchanged then prevent submission
            if (values.name === name && values.email === email && values.gender === gender && values.birthdate === birthdate) return

            values.id = userId  // dummy id
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/update`, values)

            setName(values.name)
            setEmail(values.email)
            setPhoneNumber(values.phoneNumber)
            setGender(values.gender)
            setBirthdate(values.birthdate)
        },
    })

    const fetchData = useCallback(async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/user/getById`,
            {params: {id: userId}}
        )

        setName(response.data.result.name)
        setEmail(response.data.result.email)
        setPhoneNumber(response.data.result.phoneNumber)
        setGender(response.data.result.gender)
        setBirthdate(new Date(response.data.result.birthdate))

        setfirebaseProviderId(response.data.result.firebaseProviderId)

        formik.values.name = response.data.result.name
        formik.values.email = response.data.result.email
        formik.values.phoneNumber = response.data.result.phoneNumber
        formik.values.gender = response.data.result.gender
        formik.values.birthdate = new Date(response.data.result.birthdate)
    }, [userId])

    useEffect(() => {
        if (userId) fetchData()
    }, [fetchData, userId])

    if (!userId) return

    return (
        <Container maxW='container.sm' p={0}>
            <Container maxW='1140px'>
                <Flex justifyContent="center" alignItems="center" direction={["column"]}>
                    <Box width="360px" height="max-content" pb="20px" pl="20px" pr="20px" mb={{sm: "0", md: "4em"}}>

                        {/*Profile header*/}
                        <Flex pt="10">
                            <Box mr="20px" w="80px" h="80px">
                                <Avatar w="80px" h="80px"/>
                            </Box>
                            <Box>
                                <Text fontSize="xl" fontWeight="600">{name}</Text>
                                <Text color="gray.400">{
                                    birthdate.toLocaleDateString(
                                        'en-GB', {day: 'numeric', month: 'long', year: 'numeric'}
                                    )
                                }</Text>
                                <Text textDecoration="underline" fontSize="16px" fontWeight="400" cursor="pointer"
                                      _hover={{textDecoration: "underline", fontWeight: "bold"}}>Update Photo</Text>
                            </Box>
                        </Flex>
                        {/*Profile header ends*/}

                        {/*Profile form*/}
                        <Box pt="10">
                            <Heading as='h1' size="md">Personal Info</Heading>

                            <UpdateInput inputDisplayName={'Name'} formik={formik} errorMsg={formik.errors.name}
                                         formState={[isEditingForm, setIsEditingForm]}>
                                <Input style={{borderBottom: "1px solid"}} id='name' type="text" variant='flushed'
                                       placeholder='insert your name'
                                       value={formik.values.name} onChange={formik.handleChange}/>
                            </UpdateInput>

                            {
                                firebaseProviderId === 'password' ?
                                    <UpdateInput inputDisplayName={'Email'} formik={formik}
                                                 errorMsg={formik.errors.email}
                                                 formState={[isEditingForm, setIsEditingForm]}>
                                        <Input style={{borderBottom: "1px solid"}} id='email' type="text"
                                               variant='flushed'
                                               placeholder='insert your email'
                                               value={formik.values.email} onChange={formik.handleChange}/>
                                    </UpdateInput> : null
                            }

                            <UpdateInput inputDisplayName={'Phone Number'} formik={formik} errorMsg={formik.errors.phoneNumber}
                                         formState={[isEditingForm, setIsEditingForm]}>
                                <Input style={{borderBottom: "1px solid"}} id='phoneNumber' type="text" variant='flushed'
                                       placeholder='insert your phone number'
                                       value={formik.values.phoneNumber} onChange={formik.handleChange}/>
                            </UpdateInput>

                            <UpdateInput inputDisplayName={'Gender'} formik={formik} errorMsg={formik.errors.gender}
                                         formState={[isEditingForm, setIsEditingForm]}>
                                <Select style={{borderBottom: "1px solid"}} id='gender' variant='flushed' icon=''
                                        value={formik.values.gender} onChange={formik.handleChange} placeholder='select your gender'>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </Select>
                            </UpdateInput>

                            <UpdateInput inputDisplayName={'Birthdate'} formik={formik}
                                         errorMsg={formik.errors.birthdate}
                                         formState={[isEditingForm, setIsEditingForm]}>
                                <DatePicker selected={formik.values.birthdate}
                                            onChange={(date) => formik.setFieldValue('birthdate', date)}
                                            showMonthDropdown showYearDropdown dropdownMode="select" withPortal/>
                            </UpdateInput>
                        </Box>
                        {/*Profile form ends*/}

                        {
                            firebaseProviderId === 'password' ?
                            <Box h="max-content" pt="16px" pb="30px">
                                <Text textDecoration="underline" _hover={{textDecoration: "underline", fontWeight: "bold"}}>
                                    <Link to="/reset-password">Change Password</Link>
                                </Text>
                            </Box> : null
                        }
                    </Box>
                </Flex>

                <Flex justifyContent="center">
                    <NavbarMobile/>
                </Flex>
            </Container>
        </Container>
    )
}

export default Profile