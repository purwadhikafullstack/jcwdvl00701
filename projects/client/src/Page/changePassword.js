import React, { useState } from 'react';
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
import turuIcon from "../Assets/image/turuIcon.png"
import {Link} from "react-router-dom"
import Footer from '../Components/Footer';


function ChangePassword(){
    return(
        <>
        
            <Flex justifyContent="center" alignItems="center" h="700px">
                <Box width="360px" height="297px">
                    <Flex flexDirection="column" justifyContent="center" alignItems="center" pt="19px" pb="10px">
                        <Image 
                        src={turuIcon} 
                        alt="turu-icon" 
                        width="59px"
                        height="58px"
                        />
                        <Heading as="h1" size="md" m="10px">
                            Change Password
                        </Heading>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <Box width="320px" height="427px">

                        <Flex flexDirection="column" alignItems="center">
                            <FormControl id="password" pb="15px">
                                <Input type="password" placeholder="Old Password" borderRadius="0" />
                            </FormControl> 
                            <FormControl id="password" pb="15px">
                                <Input type="password" placeholder="New Password" borderRadius="0" />
                            </FormControl> 
                            <FormControl id="password" pb="15px">
                                <Input type="password" placeholder="Confirm Password" borderRadius="0" />
                            </FormControl> 
                            <Button variant="primary" mb="12px">
                                Change password
                            </Button>
                        </Flex>
                            
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Footer/>
        </>
    )
}

export default ChangePassword