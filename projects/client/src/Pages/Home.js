import React, {useEffect, useRef, useState} from "react";
import {Box, Button, Container, Flex, Heading, Image, Text} from "@chakra-ui/react";
import DatePicker from "react-datepicker";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


import StepperInput from "../Components/StepperInput";
import Footer from "../Components/Footer"
import { useSelector } from "react-redux";

function useOnClickOutside(ref, handler) {
  const {name,storageIsChecked,email,id} = useSelector(state => state.user)
  console.log(storageIsChecked);
  console.log(email);
  console.log(id);
  console.log(name);
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

function TopBar(props) {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)

  const toggleTsGuestInputOpen = () => {
    setIsGuestInputOpen(current => !current)
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const ref = useRef();
  useOnClickOutside(ref, () => setIsGuestInputOpen(false));

  return (
    <Box w="100%" p={4} pb={12} boxShadow='lg' backgroundColor='blackAlpha.900' backgroundImage='/Assets/topbar_background.png'>
      <Flex justify="space-between" align="center">
        <Image src='/Assets/logoTuru.png' alt='turu'/>
        <Button m={2} leftIcon={<i className="fa-regular fa-circle-user"/>}>Login</Button>
      </Flex>

      <Heading as={'h1'} size='2xl' boxShadow="lg" color='white' fontWeight='bold' textAlign='center' py={8}>Find Your Ideal Accomodation</Heading>

      <Flex direction='column'>
        <Flex w='100%' backgroundColor='white' py={3} px={6} my={2}>
          <Box w='50%'>
            <Text color='gray.500'>Check In</Text>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
          </Box>
          <Box w='50%'>
            <Text color='gray.500'>Check Out</Text>
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </Box>
        </Flex>

        <Box w='100%' backgroundColor='white' py={3} px={6} my={2} display={!isGuestInputOpen ? 'block' : 'none'} onClick={toggleTsGuestInputOpen}>
          <Text color='gray.500'>Guests</Text>
          <Text fontWeight='bold'>2 Visitors</Text>
        </Box>

        <Box w='100%' backgroundColor='white' py={3} px={6} my={2} display={isGuestInputOpen ? 'block' : 'none'} ref={ref}>
          <Text color='gray.500' mb={3}>Guests</Text>

          <Flex justify='space-between' mb={2}>
            <Box>
              <Text fontWeight='bold'>Visitors</Text>
              <Text fontSize='sm'>number of visitor</Text>
            </Box>
            <StepperInput />
          </Flex>
        </Box>
        <Box w='100%' backgroundColor='white' my={2}>
          <Button variant="primary" w='100%' leftIcon={<i className="fa-solid fa-magnifying-glass"/>}>Search Now</Button>
        </Box>
      </Flex>
    </Box>
  )
}

function Thumbnail(props) {
  return (
    <Box my={4} position={'relative'}>
      <Box backgroundColor={'#0CD38C'} px={4} py={2} color={'white'} position={'absolute'}>
        Save 25%
      </Box>
      <Image src={'/Assets/room1.png'} w={'100%'} objectFit='cover'></Image>
      <Flex justify="space-between" align="center" mt={2}>
        <Box color="gray.600" w='100%' cursor='pointer'>
          <Text fontSize="lg" fontWeight='bold'>Apartment in Jakarta</Text>
          <Flex align={"end"}>
            <Text fontSize="sm" color={'gray'} mr={1}><strike>Rp.600.000,00</strike></Text>
            <Text fontSize="sm" color={'red'}>Rp.450.000</Text>
          </Flex>
        </Box>
        <Button variant="primary" w='70%'>Reserve</Button>
      </Flex>
    </Box>
  )
}

function Home(props) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (<Box>
    <TopBar />

    <Container maxW='container.lg'>

      <Box my={4} py={8}>
        <Slider {...sliderSettings}>
          <Box h={'15vh'} backgroundColor={'red'} overflow={'hidden'}>
            <Image src={'/Assets/room1.png'} w={'100%'} objectFit='cover'></Image>
          </Box>
          <Box h={'15vh'} backgroundColor={'green'} overflow={'hidden'}>
            <Image src={'/Assets/room2.png'} w={'100%'} objectFit='cover'></Image>
          </Box>
          <Box h={'15vh'} backgroundColor={'blue'}>
            <Image src={'/Assets/room3.png'} w={'100%'} objectFit='cover'></Image>
          </Box>
        </Slider>
      </Box>

      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
    </Container>

    <Footer />
  </Box>)
}

export default Home;
