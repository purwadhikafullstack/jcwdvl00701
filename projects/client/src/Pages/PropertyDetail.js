import React, {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom';
import {useHistory, useParams} from "react-router-dom";
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
    ButtonGroup, Center, IconButton, chakra,
} from "@chakra-ui/react";
import {
    faBoxArchive,
    faCouch,
    faSearch,
    faSliders,
    faUtensils,
    faWifi,
    faBed,
    faFilter, faStar
} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-regular-svg-icons";
import DatePicker from "react-datepicker";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const FaIcon = chakra(FontAwesomeIcon);


function Topbar(props) {
    return (
        <Box>
            <Box w="100%" p={4} boxShadow='lg'>
                <Flex justify="space-between" backgroundColor='gray.100' align="center">
                    <Box color="gray.600" w='100%' cursor='pointer'>
                        <Text fontSize="lg" fontWeight='bold'>Rp. 600.000,00</Text>
                        <Text fontSize="xs">12-16 Nov | 1 Tamu</Text>
                    </Box>
                    <Button variant="primary" w='70%'>Reserve</Button>
                </Flex>
            </Box>
        </Box>
    )
}

function Content(props) {

    return (
        <Box>
            <Box my={3}>
                <Text fontWeight='bold' fontSize='xl' mb={1}>{props.data.name}</Text>
                <Text fontSize='sm' color='grey'>{props.data.address}</Text>
            </Box>

            <Image
                objectFit='cover'
                maxW={{base: '100%', sm: '50%'}}
                src={props.data.pic}
                alt={props.data.name}
            />

            <Box my={8}>
                <Text>{props.data.description}</Text>
                <Flex align='center' my={8}>
                    <Stack>
                        <IconButton icon={<FaIcon icon={faBed}/>} backgroundColor='gray.200'/>
                        <Center><Text>room 1</Text></Center>
                    </Stack>
                    <Stack mx={4}>
                        <IconButton icon={<FaIcon icon={faBed}/>} backgroundColor='gray.200'/>
                        <Center><Text>room 1</Text></Center>
                    </Stack>
                    <Stack>
                        <IconButton icon={<FaIcon icon={faBed}/>} backgroundColor='gray.200'/>
                        <Center><Text>room 1</Text></Center>
                    </Stack>

                </Flex>
                <Flex align='center'>
                    <Stack width='25%'>
                        <FaIcon icon={faWifi}/>
                        <Center><Text>wifi</Text></Center>
                    </Stack>
                    <Stack width='25%'>
                        <FaIcon icon={faBoxArchive}/>
                        <Center><Text>locker</Text></Center>
                    </Stack>
                    <Stack width='25%'>
                        <FaIcon icon={faUtensils}/>
                        <Center><Text>menu</Text></Center>
                    </Stack>
                    <Stack width='25%'>
                        <FaIcon icon={faCouch}/>
                        <Center><Text>sofa</Text></Center>
                    </Stack>
                </Flex>
            </Box>

            <Flex border="3px solid lightgrey" p={5}>
                <Box h='50px' w='50px' backgroundColor='grey' mr={5}></Box>
                <Box>
                    <Text fontWeight='bold' fontSize='md'>Tanent</Text>
                    <Text fontSize='md' color='grey'>Joined since 2018</Text>
                </Box>
            </Flex>
        </Box>
    )
}

function Reviews(props) {
    return (
        <Box>
            <Box my={3}>
                <Text fontWeight='bold' fontSize='xl' mb={1}><FaIcon icon={faStar}/> 5 Reviews</Text>
            </Box>

            <Box border="3px solid lightgrey" p={5}>
                <Flex mb={2}>
                    <Box h='50px' w='50px' backgroundColor='grey' mr={5}></Box>
                    <Box>
                        <Text fontWeight='bold' fontSize='md'>Username</Text>
                        <Text fontSize='md' color='grey'>October 2022</Text>
                    </Box>
                </Flex>
                <Text>The decade that brought us Star Trek and Doctor Who also resurrected Cicero—or at least what
                    used to be Cicero</Text>
            </Box>

            <Button w="100%" variant='secondary' my={2}>
                Show All
            </Button>
        </Box>
    )
}

function Detail(props) {
    return (
        <Box>
            <Box my={3}>
                <Text fontWeight='bold' fontSize='xl' mb={1}>Details</Text>
            </Box>

            <Box backgroundColor='gray.200' p={3} mb={8}>
                <Text fontWeight='bold' fontSize='lg'>1 Guest</Text>
            </Box>

            <Text fontWeight='bold' fontSize='lg' mb={2}>Rp. 300.000,00 per bed</Text>
            <Text fontWeight='bold' fontSize='lg' mb={2}>Total: Rp. 300.000,00</Text>

            <Button w="100%" variant='primary' my={2}>
                Reserve
            </Button>
        </Box>
    )
}

function PropertyDetail(props) {

    const data = {
        'pic': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        'name': 'Living room Sofa',
        'description': 'This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.',
        'address': 'Jl. Dr. Saharjo No.104, RT.2/RW.7, Menteng Atas, Kec. Tebet, Kota Jakarta Selatan',
        'price': '450.000'
    }

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const datepickerOnChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const renderDayContents = (day, date) => {
        return <Box>{date.getDate()}<br/>300k</Box>;
    };

    return (
        <div>
            <Topbar/>
            <Container maxW='container.lg'>

                <Content data={data}/>
                <Box my={3}>
                    <Text fontWeight='bold' fontSize='xl' mb={1}>check availability</Text>
                    <DatePicker
                        selected={startDate}
                        onChange={datepickerOnChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        renderDayContents={renderDayContents}
                    />
                </Box>
                <Detail/>
                <Reviews/>

            </Container>


        </div>
    );
}

export default PropertyDetail;
