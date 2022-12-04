import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Input,
    Select,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import {Link, useHistory} from "react-router-dom"

import {useFormik} from 'formik'
import * as Yup from 'yup';

import DatePicker from "react-datepicker";

import NavbarMobile from '../../Components/NavbarMobile';
import axios from "axios";
import {authFirebase} from "../../Config/firebase";
import {onAuthStateChanged} from "firebase/auth";

function renderInput(isEditActive, props) {
    return React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            disabled: !isEditActive
        })
    })
}

function UpdateInput({formState, formik, errorMsg, onOpen, inputDisplayName, needConfirm = false, ...rest}) {
    const [isEditActive, setIsEditActive] = useState(false)
    const [isEditingForm, setIsEditingForm] = formState
    const [isLoading, setIsLoading] = useState(false)

    const handleEdit = async () => {
        setIsLoading(true)
        if (errorMsg && isEditActive) return  // if there's error prevent submission

        // check value changes
        if (JSON.stringify(formik.initialValues) === JSON.stringify(formik.values)) {
            setIsEditActive(current => !current)
            setIsEditingForm(current => !current)
            setIsLoading(false)
            return // immediate return if not value changes
        }

        if (isEditActive) {
            if (needConfirm) onOpen()
            else await formik.submitForm()
        }

        setIsEditActive(current => !current)
        setIsEditingForm(current => !current)
        setIsLoading(false)
    }


    return (
        <Box h="max-content" mt={5}>
            <Flex justifyContent="space-between" align='center'>
                <Text>{inputDisplayName}</Text>
                <Button onClick={handleEdit} variant='link'
                        disabled={(isEditingForm && !isEditActive) || errorMsg}
                        isLoading={isLoading}>
                    {!isEditActive ? "Edit" : "Save"}
                </Button>
            </Flex>

            {renderInput(isEditActive, rest)}

            {errorMsg ? <Text color={'red'}>*{errorMsg}</Text> : null}
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
    gender: Yup.string().nullable().required('Required'),
    birthdate: Yup.date()
        .required('Required')
});

function ConfirmationModal({open, leastDestructiveRef, onClose, onClick, ...rest}) {
    return (
        <AlertDialog isOpen={open} leastDestructiveRef={leastDestructiveRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>

                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Changing Sensitive Information
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <Text>
                            Changing email address or phone number will cause you to
                            <strong> not be able to login using the old credentials</strong>.
                        </Text>
                        <Text pt={5}>
                            Are you willing to proceed?
                        </Text>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button colorScheme="red" ref={leastDestructiveRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant={"link"} onClick={onClick} ml={3}>
                            Yes, I wanted to change it
                        </Button>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

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

    useEffect(() => {
        getUser()
    }, [getUser])

    const [firebaseProviderId, setfirebaseProviderId] = useState('password')
    const [isEditingForm, setIsEditingForm] = useState(false)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            birthdate: birthdate
        },
        validationSchema: UpdateSchema,
        onSubmit: async (values) => {
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

    const {isOpen, onOpen, onClose} = useDisclosure()
    const updateConfirmRef = React.useRef()

    const handlePostModal = async () => {
        await formik.submitForm()
        onClose()
    }

    const datepickerRef = useRef(null);
    function handleClickDatepickerIcon() {
        datepickerRef.current.setFocus(true);
    }

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
                                                 formState={[isEditingForm, setIsEditingForm]} needConfirm={true}
                                                 onOpen={onOpen}>
                                        <Input style={{borderBottom: "1px solid"}} id='email' type="text"
                                               variant='flushed'
                                               placeholder='insert your email'
                                               value={formik.values.email} onChange={formik.handleChange}/>
                                    </UpdateInput> : null
                            }

                            <UpdateInput inputDisplayName={'Phone Number'} formik={formik}
                                         errorMsg={formik.errors.phoneNumber}
                                         formState={[isEditingForm, setIsEditingForm]} needConfirm={true}
                                         onOpen={onOpen}>
                                <Input style={{borderBottom: "1px solid"}} id='phoneNumber' type="text"
                                       variant='flushed'
                                       placeholder='insert your phone number'
                                       value={formik.values.phoneNumber} onChange={formik.handleChange}/>
                            </UpdateInput>

                            <UpdateInput inputDisplayName={'Gender'} formik={formik} errorMsg={formik.errors.gender}
                                         formState={[isEditingForm, setIsEditingForm]}>
                                <Select style={{borderBottom: "1px solid"}} id='gender' variant='flushed' icon=''
                                        value={formik.values.gender} onChange={formik.handleChange}
                                        placeholder='select your gender'>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </Select>
                            </UpdateInput>


                            <UpdateInput inputDisplayName={'Birthdate'} formik={formik}
                                         errorMsg={formik.errors.birthdate}
                                         formState={[isEditingForm, setIsEditingForm]}>

                                <Input style={{borderBottom: "1px solid"}} id='phoneNumber' type="text"
                                       variant='flushed'
                                       placeholder='insert your phone number'
                                       value={formik.values.birthdate.toLocaleString('en-US', {day: "2-digit", month: "long", year: "numeric"})}
                                       onClick={() => handleClickDatepickerIcon()}/>
                            </UpdateInput>

                            <Box position={'absolute'} top={"-2rem"}>
                                <DatePicker selected={formik.values.birthdate}
                                            onChange={(date) => formik.setFieldValue('birthdate', date)}
                                            showMonthDropdown showYearDropdown dropdownMode="select"
                                            ref={datepickerRef} withPortal/>
                                <Box background={"white"} h={"100%"} w={"100%"} position={"absolute"} top={0}></Box>
                            </Box>

                        </Box>
                        {/*Profile form ends*/}

                        {
                            firebaseProviderId === 'password' ?
                                <Box h="max-content" pt="16px" pb="30px">
                                    <Text textDecoration="underline"
                                          _hover={{textDecoration: "underline", fontWeight: "bold"}}>
                                        <Link to="/reset-password">Change Password</Link>
                                    </Text>
                                </Box>
                                : null
                        }
                    </Box>
                </Flex>

                <Flex justifyContent="center">
                    <NavbarMobile/>
                </Flex>

                {/*confirmation modal*/}
                <ConfirmationModal open={isOpen} leastDestructiveRef={updateConfirmRef} onClose={onClose}
                                   onClick={handlePostModal}/>
                {/*confirmation modal end*/}

            </Container>
        </Container>
    )
}

export default Profile