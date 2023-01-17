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
    Container, Avatar, Select, Divider, AlertIcon, CloseButton, Alert, AlertTitle, AlertDescription, useDisclosure
} from "@chakra-ui/react";
import turuIcon from "../Assets/image/turuIcon.png";
import {Link, useHistory} from "react-router-dom";
import DatePicker from "react-datepicker";
import NavbarMobile from "../Components/NavbarMobile";
import {onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updatePassword} from "firebase/auth";
import {authFirebase} from "../Config/firebase";
import {useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import YupPassword from "yup-password";
import {useSelector} from "react-redux";

function ChangePassword() {
    const user2 = useSelector(state => state.user)

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)

    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')

    const [userId, setUserId] = useState('')
    const getUser = useCallback(() => {
        onAuthStateChanged(authFirebase, (user) => {
            if (user) {
                setUser(user)
                setUserId(user.uid)
                setEmail(user.email)
            } else {
                history.push('/')
            }
        });
    }, [setUserId, history])

    useEffect(() => {
        getUser()
    }, [getUser])

    YupPassword(Yup)

    const {isOpen: isVisible, onClose, onOpen} = useDisclosure({defaultIsOpen: false})
    const [nonFieldError, setNonFieldError] = useState('')

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
        onSubmit: async (values, {setErrors, resetForm}) => {
            values.id = userId  // dummy id
            const credential = EmailAuthProvider.credential(email, values.oldPassword)

            try {
                const result = await reauthenticateWithCredential(user, credential)
            } catch (err) {
                setErrors({oldPassword: 'current password isn\'t match'})
                setIsLoading(false)
                return
            }

            if (values.oldPassword === values.newPassword) {
                setErrors({newPassword: 'new password can\'t be same with old password'})
                setIsLoading(false)
                return
            }

            try {
                const response = await updatePassword(user, formik.values.newPassword)
                resetForm()
                onOpen()
            } catch (err) {
                setNonFieldError('Failed to change password. Please refresh the page and try again')
                setIsLoading(false)
            }
        },
    })

    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState(new Date())
    const [profilePic, setProfilePic] = useState('')
    const [firebaseProviderId, setfirebaseProviderId] = useState()

    const fetchData = useCallback(async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/user/get-by-id`,
            {params: {id: user2.id}}
        )

        setfirebaseProviderId(response.data.result.User.firebaseProviderId)
        if (response.data.result.User.firebaseProviderId !== 'password') {
            history.push('/')
        }
        setName(response.data.result.name)
        setBirthdate(new Date(response.data.result.birthdate))
        setProfilePic(`${process.env.REACT_APP_BACKEND_BASE_URL}${response.data.result.profilePic}`)
    }, [user2])

    useEffect(() => {
        if (userId) fetchData()
    }, [fetchData, userId])


    if (!user || firebaseProviderId !== 'password') return

    return (
        <Container maxW='container.sm' p={0}>

            {nonFieldError ? (
                <Alert status={'error'} position={'absolute'} top={0} zIndex={10}>
                    {nonFieldError}
                </Alert>
            ) : null}

            {isVisible ? (
                <Alert status={"success"} position={'absolute'} top={0} zIndex={10}>
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <AlertIcon/>
                        <Box>
                            <AlertTitle>
                                You successfully changed your password
                            </AlertTitle>
                            <AlertDescription>
                                Please re-login and use your new password to sign in.
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1}
                            onClick={onClose}
                        />
                    </Flex>
                </Alert>
            ) : null}

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
                                <Button colorScheme={"blue"} mt={5} onClick={formik.handleSubmit} isLoading={isLoading}>Save</Button>
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
