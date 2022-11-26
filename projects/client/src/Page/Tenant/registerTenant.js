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
    InputRightElement
} from '@chakra-ui/react'
import turuIcon from "../../Assets/image/turuIcon.png"
import google from "../../Assets/image/google.png"
import facebook from "../../Assets/image/facebook.png"
import registerTenant from "../../Assets/image/registerTenant.png"
import Footer from "../../Components/Footer"
import {Link} from "react-router-dom"

function RegisterTenant(){
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
    return (
        <Flex flexDirection="column" bg="black">
            {/* flex container utk dekstop */}
            <Flex>
                {/* utk image dekstop */}
                <Flex >
                    <Image display={{ ss:"none", sm:"none", sl:"none", md:"block", lg:"block"}} src={registerTenant} width="900px" height="1080px"/>
                </Flex>

                {/* Form */}
                <Flex ml={{ss:"14px",sm:"6em",md:"7em", lg:"9em"}} my="3em">
                    <Box width="360px" height="297px">
                        <Flex flexDirection="column" justifyContent="center" alignItems="center" pt={{ ss:"5px", sm:"5px", sl:"5px", md:"19px", lg:"19px"}}pb="10px">
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
                                <Text fontSize="12px" lineHeight="15.6px" fontWeight="300" textAlign="center" mr="5px" color="white">
                                    Already have an acount?
                                </Text>
                                <Text fontSize="12px" lineHeight="15.6px" fontWeight="300" textAlign="center" color="white" 
                                _hover={{textDecoration : "underline", fontWeight: "bold"}} cursor="pointer">
                                    <Link to="/tenant/login">Login</Link>
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex justifyContent="center" alignItems="center">
                            <Box width="320px" height="427px">
                                <Flex flexDirection="column" alignItems="center">
                                    <FormControl id="name" pb="12px">
                                        <Input type="name" placeholder="Name" borderRadius="0"  bg="white"/>
                                    </FormControl>
                                    <FormControl id="email" pb="12px">
                                        <Input type="email" placeholder="Email" borderRadius="0"  bg="white"/>
                                    </FormControl>
                                    <FormControl id="phoneNumber" pb="12px">
                                        <Input type="number" placeholder="Phone number" borderRadius="0"  bg="white"/>
                                    </FormControl>
                                    <FormControl id="password" pb="12px">
                                        <InputGroup>
                                            <Input 
                                            type={showPassword ?"text" : "password"} 
                                            placeholder="Password" 
                                            borderRadius="0"  
                                            bg="white"
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
                                    </FormControl>
                                    <FormControl id="confirmPassword" pb="12px">
                                        <InputGroup>
                                            <Input 
                                            type={showConfirmPassword ? "text" :"password"} 
                                            placeholder="Confirm Password" 
                                            borderRadius="0"  
                                            bg="white"
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
                                            
                                    </FormControl>
                                    <FormControl id="idCard" pb="12px">
                                        <Input type="Text" placeholder="Upload Id Card " borderRadius="0"  bg="white"/>
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
                                    color="white"
                                    >
                                        <Link to="/register"> Sign Up as User</Link>
                                    </Text>
                                </Flex>
                                <hr />
                                <Button variant="secondary" mt="20px">
                                    <Image src={google} mr="5px"></Image>
                                    <Text>Sign Up With Google</Text>                       
                                </Button>
                                <Button variant="secondary" mt="20px">
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
    )
}

export default RegisterTenant