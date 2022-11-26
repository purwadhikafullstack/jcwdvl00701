import React from 'react';
import { Flex,
    Spacer,
    Image,
    Box,
    Heading ,
    FormControl,
    FormErrorMessage,
    Input,
    Button,
    Text,
    InputGroup,
    InputRightElement,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    FormHelperText,
    Container
} from '@chakra-ui/react'
import turuIcon from "../../Assets/image/turuIcon.png"
import google from "../../Assets/image/google.png"
import facebook from "../../Assets/image/facebook.png"
import registerImage from "../../Assets/image/registerImage.png"
import Footer from "../../Components/Footer"
import {Link,useHistory} from "react-router-dom"
import {useFormik} from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"
import "yup-phone"
import { authFirebase } from '../../Config/firebase';
import {createUserWithEmailAndPassword,
        getAuth ,
        sendEmailVerification,
        GoogleAuthProvider,
        signInWithPopup,
        FacebookAuthProvider,
        onAuthStateChanged
    } 
        from "firebase/auth"
import axios from "axios"
import auth_types from '../../Redux/Reducers/Types/userTypes';
import {useDispatch, useSelector} from "react-redux"

function RegisterUser(){
    // utk testing
    const { data } =  axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
    );
        console.log(data?.message || "error");
    // for show password
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const handleClick = (cek) =>{
        if (cek === "showPassword"){
            setShowPassword(!showPassword)
        } else if (cek === "showConfirmPassword"){
            setShowConfirmPassword(!showConfirmPassword)
        }
    }

    const dispatch = useDispatch()
    let history = useHistory()
    // authentication
    const auth = getAuth()
    // provider google
    const providerGoogle = new GoogleAuthProvider()
    //provider facebook
    const providerFacebook = new FacebookAuthProvider()
    
    const handleWithGoogle = () => {
        signInWithPopup(authFirebase , providerGoogle)
        .then((res) => {
            // info user
            const user = res.user
            const providerGoogle = res.providerId
            console.log("info user:", user);
            console.log(user.emailVerified);
            console.log("info provider", providerGoogle);
            console.log(auth.currentUser);
            // will send to home, auto verified if use google
            history.push("/")
        })
        .catch((err) => {
            console.error(err.message)
        })
    }

    const handleWithFacebook = () => {
        signInWithPopup(authFirebase, providerFacebook)
        .then((res) => {
            const user = res.user
            const providerFacebook= res.providerId
            console.log("info user:", user);
            console.log(user.emailVerified);
            console.log("info provider", providerFacebook);
            console.log(auth.currentUser);
            // will send to home, auto verified if use google
            history.push("/")
        })
        .catch((err) => {
            console.error(err.message)
        })
    }
    // configure yup
    YupPassword(Yup)
    //formik initialization
    const formik = useFormik({
        initialValues : {
            name : "",
            email : "",
            phoneNumber : "",
            password : "",
            confirmPassword : ""
        },
        validationSchema : Yup.object().shape({
            email: Yup.string().required("your email is invalid").email("format yang dimasukan bukan email"),
            phoneNumber : Yup.string().phone("ID").required(),
            password : Yup.string().required("please fill in the password").min(8).minUppercase(1).minNumbers(1),
            confirmPassword :  Yup.string().required("please fill in the confirmation password").min(8).minUppercase(1).minNumbers(1)
        }),
        validateOnChange : false,
        onSubmit: (values) => {
            console.log(values);
            const {name, email, phoneNumber, password, confirmPassword} = values
            // condition for password
            if(password === confirmPassword){
                // make user use firebase
                createUserWithEmailAndPassword(authFirebase, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    const providerId = userCredential.providerId
                    console.log("respon firebase user :", user);
                    
                    //akan dikirim email utk verifikasi
                        sendEmailVerification(auth.currentUser)
                        .then((res) => {
                            
                            alert("check your email for verification email")
                            // history.push("account/verify")
                        })
                        .catch((err) => {
                            console.error("error send email", err.message);
                        })

                        // fetch(`${process.env.REACT_APP_API_BASE_URL}/user/register`, {
                        //     headers: {
                        //         'Accept': 'application/json',
                        //         'Content-Type': 'application/json',
                        //         'Access-Control-Allow-Origin' : '*',
                        //         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        //     },
                        //     method: 'POST',
                        //     body: JSON.stringify({
                        //         name,
                        //         email,
                        //         phone_number: phoneNumber,
                        //         is_verified : "false"
                        //     })
                        // })
                        // .then((res) => {
                        //     console.log(res);
                        //     dispatch({
                        //         type: auth_types.Register,
                        //         payload : res
                        //     })
                        // })
                        // .catch((err) => {
                        //     console.error(err)
                        // })

                        // endpoinnt utk register user ==> belum dibuat
                        axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register` , {
                            // id: res.user.uid, // akan dpt uid dari firebase
                            name,
                            email,
                            phone_number :phoneNumber,
                            is_verified: "false" //dpt boolean sudah verified atau belum
                        })
                        .then((res) => {
                            alert(res.message)
                            console.log("respon post",res.data);
                            dispatch({
                                type: auth_types.Register,
                                payload : res.data
                            })
                        })
                        .catch((err) => {
                            console.error(err.message);
                        })
                    // akan dikirim ke home tapi berstatus berlum terverifikasi
                    history.push("/")
                })
                .catch((err) => {
                    alert(err.message)
                })
            } else {
                <Alert
                    status="Error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        Can not Register account
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        Your Password is not same, please check your confirmation password
                    </AlertDescription>
                </Alert>
                // <ModalAlert props="true"/>
                alert("password is not same, please check your password!")
            }
        }
    })
    return (
        <Container maxW="2x1">
            <Flex flexDirection="column">
                {/* flex container utk dekstop */}
                <Flex>
                    {/* utk image dekstop */}
                    <Flex>
                        <Image display={{ ss:"none", sm:"none", sl:"none", md:"block", lg:"block"}} src={registerImage} width="900px" height="1080px"/>
                    </Flex>

                    {/* Form */}
                    <Flex ml={{ss:"1em",sm:"6em",md:"7em", lg:"9em"}} my="3em" >
                        <Box width="360px" height="297px">
                            <Flex flexDirection="column" justifyContent="center" alignItems="center" pt="19px" pb="10px">
                                <Image 
                                src={turuIcon} 
                                alt="turu-icon" 
                                width="59px"
                                height="58px"
                                />
                                <Heading as="h1" size="md" m="10px">
                                    Join Turu
                                </Heading>
                                <Flex w="184px" h="37px" justifyContent="center">
                                    <Text fontSize="12px" lineHeight="15.6px" fontWeight="300" textAlign="center" mr="5px">
                                        Already have an acount?
                                    </Text>
                                    <Text fontSize="12px" lineHeight="15.6px" fontWeight="300" textAlign="center"  
                                    _hover={{textDecoration : "underline", fontWeight: "bold"}} cursor="pointer">
                                        <Link to="login">Login</Link>
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="center" alignItems="center">
                                <Box width="320px" height="427px">
                                    <Flex flexDirection="column" alignItems="center">
                                        <FormControl id="name" pb="12px">
                                            <Input 
                                            type="text" 
                                            placeholder="Name" 
                                            borderRadius="0"
                                            onChange={(e) => formik.setFieldValue("name", e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl id="email" pb="12px">
                                            <Input type="email" placeholder="Email" borderRadius="0"/>
                                        </FormControl>
                                        <FormControl id="phoneNumber" pb="12px">
                                            <Input 
                                            type="text" 
                                            placeholder="Phone number" 
                                            borderRadius="0"
                                            onChange={(e) => formik.setFieldValue("phoneNumber", e.target.value)}
                                            />
                                            {formik.errors.phoneNumber ? 
                                                <FormHelperText color="red" textAlign="center">
                                                    {formik.errors.phoneNumber}
                                                </FormHelperText >
                                                :
                                                null
                                            }
                                        </FormControl>
                                        <FormControl id="password" pb="12px">
                                            <InputGroup>
                                                <Input 
                                                type={showPassword ?"text" : "password"} 
                                                placeholder="Password" 
                                                borderRadius="0"
                                                onChange={(e) => formik.setFieldValue("password", e.target.value)}
                                                />
                                                <InputRightElement>
                                                    <Button onClick={() => handleClick("showPassword")}>
                                                    { showPassword? 
                                                        <i className="fa-sharp fa-solid fa-eye"></i> 
                                                        :
                                                        <i className="fa-solid fa-eye-slash"></i>
                                                    }
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {formik.errors.password ? 
                                                <FormHelperText color="red" textAlign="center">
                                                    {formik.errors.password}
                                                </FormHelperText >
                                                :
                                                null
                                            }
                                        </FormControl>
                                        <FormControl id="confirmPassword" pb="12px">
                                            <InputGroup>
                                                <Input 
                                                type={showConfirmPassword ? "text" :"password"} 
                                                placeholder="Confirm Password" 
                                                borderRadius="0"
                                                onChange={(e) => formik.setFieldValue("confirmPassword", e.target.value)}
                                                />
                                                <InputRightElement >
                                                    <Button onClick={(e) => handleClick("showConfirmPassword")}>
                                                    { showConfirmPassword? 
                                                        <i className="fa-sharp fa-solid fa-eye"></i> 
                                                        :
                                                        <i className="fa-solid fa-eye-slash"></i>
                                                    }
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {formik.errors.confirmPassword ? 
                                                <FormHelperText color="red" textAlign="center">
                                                    {formik.errors.confirmPassword}
                                                </FormHelperText >
                                                :
                                                null
                                            }
                                        </FormControl>
                                        <Button variant="primary" mb="12px">
                                            Sign up
                                        </Button>
                                    </Flex>
                                    <Flex justifyContent="flex-end" mr="10px" mb="16px">
                                        <Text 
                                        fontSize="12px" 
                                        fontWeight="300" 
                                        cursor="pointer" 
                                        _hover={{textDecoration : "underline"}}
                                        >
                                            <Link to="/tenant/register">Sign Up as Tenant</Link>
                                        </Text>
                                    </Flex>
                                    <hr />
                                    
                                        <Button variant="secondary" mt="20px" onClick={handleWithGoogle}>
                                            <Image src={google} mr="5px"></Image>
                                            <Text>Sign Up With Google</Text>                       
                                        </Button>
                                        <Button variant="secondary" mt="20px" onClick={handleWithFacebook}>
                                            <Image src={facebook}></Image>
                                            <Text>Sign Up With Facebook</Text>                       
                                        </Button>
                                    
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
                <Footer
                ss={"22em"}
                sm={"22em"}
                sl={"22em"}
                />
            </Flex>
        </Container>
    )
}

export default RegisterUser