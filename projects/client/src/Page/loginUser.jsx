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
} from '@chakra-ui/react'
import turuIcon from "../Assets/image/turuIcon.png"
import google from "../Assets/Image/google.png"
import facebook from "../Assets/Image/facebook.png"
import Footer from '../Components/footer';
import {Link} from "react-router-dom"

function LoginUser () {
    return (
        <>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" pt="19px" pb="10px">
                <Image 
                src={turuIcon} 
                alt="turu-icon" 
                width="59px"
                height="58px"
                />
                <Heading as="h1" size="md" m="10px">
                    Welcome to Turu
                </Heading>
                <Box width="320px" height="427px">
                    <Flex flexDirection="column" alignItems="center">
                        <FormControl id="email" pb="12px">
                            <Input type="email" placeholder="Email/Phone number" borderRadius="0"/>
                        </FormControl>
                        <FormControl id="email" pb="12px">
                            <Input type="password" placeholder="Password" borderRadius="0"/>
                                <i class="fa-solid fa-eye"></i>
                        </FormControl>
                        <Button variant="primary" mb="12px">
                            Login
                        </Button>
                    </Flex>
                    <Flex justifyContent="flex-end" mr="10px" mb="16px">
                        <Text 
                        fontSize="12px" 
                        fontWeight="300" 
                        cursor="pointer" 
                        _hover={{textDecoration : "underline"}}
                        >
                            Login as Tenant
                        </Text>
                    </Flex>
                    <hr />
                    <Button variant="secondary" mt="20px">
                        <Image src={google}></Image>
                        <Text>Login With Google</Text>                       
                    </Button>
                    <Button variant="secondary" mt="20px">
                        <Image src={facebook}></Image>
                        <Text>Login With Facebook</Text>                       
                    </Button>
                    <Box display="flex" justifyContent="center" border="1px" borderColor="gray.200" mt="20px">
                        <Flex justifyContent="center" alignItems="center" height="37px" width="205px">
                            <Text fontSize="12px" fontWeight="300" pr="5px">Dont have ana account?</Text>
                            <Text fontSize="12px" fontWeight="300" textDecoration="underline" cursor="pointer">Join Turu</Text>
                        </Flex>
                    </Box>
                </Box>
            <Footer/>
            </Flex>
        </>
    )
}

export default LoginUser