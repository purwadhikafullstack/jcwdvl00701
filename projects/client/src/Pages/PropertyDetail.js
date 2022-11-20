import React from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Flex,
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    ButtonGroup, Center
} from "@chakra-ui/react";

function PropertyDetail(props) {

    const dummy = {
        'pic': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        'name': 'Living room Sofa',
        'description': 'This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.',
        'address': 'Jl. Dr. Saharjo No.104, RT.2/RW.7, Menteng Atas, Kec. Tebet, Kota Jakarta Selatan',
        'price': '450.000'
    }

    return (
        <div>
            <Flex>
                <Box w="100%" p={4}>
                    <Button variant="primary">primary</Button>
                </Box>
            </Flex>
        </div>
    );
}

export default PropertyList;
