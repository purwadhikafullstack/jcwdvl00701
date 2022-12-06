import React, {useCallback, useEffect, useState} from "react";
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
    Container, Avatar, Select, Divider,
} from "@chakra-ui/react";
import turuIcon from "../Assets/image/turuIcon.png";
import {Link, useHistory} from "react-router-dom";
import DatePicker from "react-datepicker";
import NavbarMobile from "../Components/NavbarMobile";
import {onAuthStateChanged} from "firebase/auth";
import {authFirebase} from "../Config/firebase";
import {useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import YupPassword from "yup-password";

function ChangePassword() {
    const history = useHistory();

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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const [birthdate, setBirthdate] = useState(new Date())
    const [profilePic, setProfilePic] = useState('')

    const [firebaseProviderId, setfirebaseProviderId] = useState('password')
    const [isEditingForm, setIsEditingForm] = useState(false)

    YupPassword(Yup)

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string().required("please type in your current password"),
            newPassword: Yup.string().required("please type in your new password")
                .min(8, 'password must at least have 8 characters')
                .minUppercase(1, 'password must at least have 1 uppercase character')
                .minNumbers(1, 'password must at least have 1 numerical character'),
            confirmPassword: Yup.string().required("please re-type your new password")
                .oneOf([Yup.ref('newPassword'), null], 'Didn\'t match with new password')
        }),
        onSubmit: async (values) => {
            values.id = userId  // dummy id
            console.log('test')
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
        setProfilePic(`${process.env.REACT_APP_BACKEND_BASE_URL}${response.data.result.profilePic}`)
        setfirebaseProviderId(response.data.result.firebaseProviderId)
    }, [userId])

    useEffect(() => {
        if (userId) fetchData()
    }, [fetchData, userId])

    return (
        <Container maxW='container.sm' p={0}>
            <Container maxW='1140px'>
                <Flex justifyContent="center" alignItems="center" direction={["column"]}>
                    <Box width="360px" height="max-content" pb="20px" pl="20px" pr="20px" mb={{sm: "0", md: "4em"}}>

                        {/*Profile header*/}
                        <Flex pt="10">
                            <Box mr="20px" w="80px" h="80px">
                                <Avatar w="80px" h="80px" src={profilePic}/>
                            </Box>
                            <Box>
                                <Text fontSize="xl" fontWeight="600">{name}</Text>
                                <Text color="gray.400">{
                                    birthdate.toLocaleDateString(
                                        'en-GB', {day: 'numeric', month: 'long', year: 'numeric'}
                                    )
                                }</Text>
                            </Box>
                        </Flex>
                        {/*Profile header ends*/}

                        {/*Profile form*/}
                        <Box pt="10">
                            <Heading as='h1' size="md">Change Your Password</Heading>

                            <Box h="max-content" mt={5}>
                                <Flex justifyContent="space-between" align='center'>
                                    <Text>Current Password</Text>
                                </Flex>

                                <Input style={{borderBottom: "1px solid"}} id='oldPassword' type="password"
                                       variant='flushed'
                                       placeholder='type your current password'
                                       value={formik.values.oldPassword} onChange={formik.handleChange}/>

                                {formik.errors.oldPassword ?
                                    <Text color={'red'}>*{formik.errors.oldPassword}</Text> : null}
                            </Box>

                            <Box h="max-content" mt={8}>
                                <Flex justifyContent="space-between" align='center'>
                                    <Text>New Password</Text>
                                </Flex>

                                <Input style={{borderBottom: "1px solid"}} id='newPassword' type="password"
                                       variant='flushed'
                                       placeholder='type your new password'
                                       value={formik.values.newPassword} onChange={formik.handleChange}/>

                                {formik.errors.newPassword ?
                                    <Text color={'red'}>*{formik.errors.newPassword}</Text> : null}
                            </Box>

                            <Box h="max-content" mt={5}>
                                <Flex justifyContent="space-between" align='center'>
                                    <Text>Confirm Password</Text>
                                </Flex>

                                <Input style={{borderBottom: "1px solid"}} id='confirmPassword' type="password"
                                       variant='flushed'
                                       placeholder='re-type your new password'
                                       value={formik.values.confirmPassword} onChange={formik.handleChange}/>

                                {formik.errors.confirmPassword ?
                                    <Text color={'red'}>*{formik.errors.confirmPassword}</Text> : null}
                            </Box>

                            <Flex justifyContent={"end"}>
                                <Button colorScheme={"blue"} mt={5} onClick={formik.handleSubmit}>Save</Button>
                            </Flex>

                        </Box>
                        {/*Profile form ends*/}

                    </Box>
                </Flex>

                <Flex justifyContent="center">
                    <NavbarMobile/>
                </Flex>

            </Container>
        </Container>
    );
}

export default ChangePassword;
