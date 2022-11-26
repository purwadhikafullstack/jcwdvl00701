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
    Container
} from '@chakra-ui/react'
import turuIcon from "../../Assets/image/turuIcon.png"
import google from "../../Assets/image/google.png"
import facebook from "../../Assets/image/facebook.png"
import loginImage from "../../Assets/image/loginImage.png"
import Footer from '../../Components/Footer';
import {Link} from "react-router-dom"

function LoginUser () {
    // for show password
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClick = () => {
        setShowPassword(!showPassword)
    }
    return (
        <Container maxW="2x1">
            <Flex flexDirection="column">
                {/* flex container utk dekstop */}
                <Flex>
                    {/* utk image dekstop */}
                    <Flex >
                        <Image display={{ ss:"none", sm:"none", sl:"none", md:"block", lg:"block"}} src={loginImage} width="900px" height="1080px"/>
                    </Flex>

                    {/* Form */}
                    <Flex ml={{ss:"14px",sm:"6em",md:"7em", lg:"9em"}} my="3em">
                        <Box width="360px" height="297px">
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
                            </Flex>
                            <Flex justifyContent="center" alignItems="center">
                                <Box width="320px" height="427px">
                                    <Flex flexDirection="column" alignItems="center">
                                        <FormControl id="email" pb="12px">
                                            <Input type="email" placeholder="Email/Phone number" borderRadius="0"/>
                                        </FormControl>
                                        <FormControl id="password" pb="15px">
                                            <InputGroup>
                                            <Input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="Password" 
                                            borderRadius="0" 
                                            />
                                            <InputRightElement>
                                                <Button onClick={handleClick}>
                                                    { showPassword? 
                                                        <i className="fa-sharp fa-solid fa-eye"></i> 
                                                        :
                                                        <i className="fa-solid fa-eye-slash"></i>
                                                    }
                                                    </Button>
                                            </InputRightElement>
                                            
                                            </InputGroup>
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
                                            <Link to="/tenant/login">Login as Tenant</Link>
                                        </Text>
                                    </Flex>
                                    <hr />
                                    <Button variant="secondary" mt="20px">
                                        <Flex justifyContent="flex-start">
                                            <Image src={google}  mr="5px"></Image>
                                            <Text>Login With Google</Text>                       
                                        </Flex>
                                    </Button>
                                    <Button variant="secondary" mt="20px">
                                        <Image src={facebook}></Image>
                                        <Text>Login With Facebook</Text>                       
                                    </Button>
                                    <Flex display="flex" justifyContent="center" border="1px" borderColor="gray.200" mt="20px">
                                        <Flex justifyContent="center" alignItems="center" height="37px" width="205px">
                                            <Text fontSize="12px" fontWeight="300" pr="5px">Dont have an account?</Text>
                                            <Text fontSize="12px" fontWeight="300" _hover={{textDecoration : "underline", fontWeight: "bold"}} cursor="pointer">
                                                <Link to="/register">Join Turu</Link>
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
                <Footer 
                ss={"13em"}
                sm={"14em"}
                sl={"15em"}
                />
            </Flex>
        </Container>
    )
}

export default LoginUser