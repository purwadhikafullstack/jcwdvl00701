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
    Text
} from '@chakra-ui/react'
import turuIcon from "../../Assets/image/turuIcon.png"
import google from "../../Assets/image/google.png"
import facebook from "../../Assets/image/facebook.png"
import registerImage from "../../Assets/image/registerImage.png"
import Footer from "../../Components/Footer"
import {Link} from "react-router-dom"

function RegisterUser(){
    return (
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
                                        <Input type="name" placeholder="Name" borderRadius="0"/>
                                    </FormControl>
                                    <FormControl id="email" pb="12px">
                                        <Input type="email" placeholder="Email" borderRadius="0"/>
                                    </FormControl>
                                    <FormControl id="phoneNumber" pb="12px">
                                        <Input type="phoneNumber" placeholder="Phone number" borderRadius="0"/>
                                    </FormControl>
                                    <FormControl id="password" pb="12px">
                                        <Input type="password" placeholder="Password" borderRadius="0"/>
                                    </FormControl>
                                    <FormControl id="confirmPassword" pb="12px">
                                        <Input type="confirmPassword" placeholder="Confirm Password" borderRadius="0"/>
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

export default RegisterUser