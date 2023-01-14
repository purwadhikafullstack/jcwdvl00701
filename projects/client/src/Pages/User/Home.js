import React, {useCallback, useEffect, useRef, useState} from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading, HStack,
  Image, Input, NumberInput, NumberInputField,
  Text,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import Layout from "../../Components/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import StepperInput from "../../Components/User/StepperInput";
import { useSelector } from "react-redux";
import {Select as Select2} from "chakra-react-select";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {current} from "@reduxjs/toolkit";

function useOnClickOutside(ref, handler) {
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
  const history = useHistory()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isLocationInputOpen, setIsLocationInputOpen] = useState(false);
  const [isPropNameInputOpen, setIsPropNameInputOpen] = useState(false);

  const toggleTsGuestInputOpen = () => {
    setIsGuestInputOpen((current) => !current);
    setIsLocationInputOpen(false);
    setIsPropNameInputOpen(false);
  };

  const toggleTsLocationInputOpen = () => {
    setIsGuestInputOpen(false);
    setIsLocationInputOpen((current) => !current);
    setIsPropNameInputOpen(false);
  };

  const toggleTsPropNameInputOpen = () => {
    setIsGuestInputOpen(false);
    setIsLocationInputOpen(false);
    setIsPropNameInputOpen((current) => !current);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const ref = useRef();
  useOnClickOutside(ref, () => {
    setIsGuestInputOpen(false)
    setIsLocationInputOpen(false)
    setIsPropNameInputOpen(false);
  });

  const [visitor, setVisitor] = useState(1)
  const [selectedLocations, setSelectedLocations] = useState([])
  const [propName, setPropName] = useState('')

  const [locations, setLocations] = useState([]);
  const fetchLocations = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/property/seeders`
    const response = await axios.get(url);
    setLocations(response.data.results)
  }, [setLocations])

  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  return (
    <Box
      w="100%"
      p={4}
      pb={12}
      boxShadow="lg"
      backgroundColor="blackAlpha.900"
      backgroundImage="/Assets/topbar_background.png"
    >
      <Flex justify="space-between" align="center">
        <Image src="/Assets/logoTuru.png" alt="turu" />
        <Button m={2} leftIcon={<i className="fa-regular fa-circle-user" />}>
          Login
        </Button>
      </Flex>

      <Heading
        as={"h1"}
        size="2xl"
        boxShadow="lg"
        color="white"
        fontWeight="bold"
        textAlign="center"
        py={8}
      >
        Find Your Ideal Accomodation
      </Heading>

      <Flex direction="column">
        <Box
          w="100%"
          backgroundColor="white"
          py={3}
          px={6}
          my={2}
          onClick={toggleTsGuestInputOpen}
        >
          <Text color="gray.500" mb={3}>Guests</Text>

          <Text fontWeight="bold" display={!isGuestInputOpen ? "block" : "none"}>
            {visitor} Visitors
          </Text>

          <Flex justify="space-between" mb={2} display={isGuestInputOpen ? "flex" : "none"}>
            <Box>
              <Text fontWeight="bold">Visitors</Text>
              <Text fontSize="sm">number of visitor</Text>
            </Box>
            <Box onClick={(e) => {
              e.stopPropagation()
            }}>
              <HStack>
                <Button rounded='full' onClick={() => setVisitor(current => current - 1)} disabled={visitor <= 1}>-</Button>
                <NumberInput style={{'width': '80px'}} textAlign='center' value={visitor} min={1}>
                  <NumberInputField textAlign={'center'}/>
                </NumberInput>
                <Button rounded='full' onClick={() => setVisitor(current => current + 1)}>+</Button>
              </HStack>
            </Box>
          </Flex>
        </Box>

        <Box
          w="100%"
          backgroundColor="white"
          py={3}
          px={6}
          my={2}
          onClick={toggleTsLocationInputOpen}
        >
          <Text color="gray.500" mb={3}>Location</Text>

          <Text fontWeight="bold" display={!isLocationInputOpen ? "block" : "none"}>
            {selectedLocations.map(loc => loc.label).join(', ') || 'No Locations Selected'}
          </Text>

          <Flex justify="space-between" mb={2} display={isLocationInputOpen ? "flex" : "none"}>
            <Box onClick={(e) => {
              e.stopPropagation()
            }} w={'100%'}>
              <Select2
                isMulti
                name={'locations'}
                options={locations.map(location => {
                  return {value: location.id, label: location.location}
                })}
                onChange={choice => {
                  setSelectedLocations(choice)
                }}
                value={selectedLocations}
              />
            </Box>
          </Flex>
        </Box>

        <Box
          w="100%"
          backgroundColor="white"
          py={3}
          px={6}
          my={2}
          onClick={toggleTsPropNameInputOpen}
        >
          <Text color="gray.500" mb={3}>Property Name</Text>

          <Text fontWeight="bold" display={!isPropNameInputOpen ? "block" : "none"}>
            {propName || 'Insert Property Name Here'}
          </Text>

          <Flex justify="space-between" mb={2} display={isPropNameInputOpen ? "flex" : "none"}>
            <Box onClick={(e) => {
              e.stopPropagation()
            }} w={'100%'}>
              <Input type={"text"} onChange={(e) => setPropName(e.target.value)}
                     defaultValue={propName}/>
            </Box>
          </Flex>
        </Box>

        <Box w="100%" backgroundColor="white" my={2}>
          <Button
            variant="primary"
            w="100%"
            leftIcon={<i className="fa-solid fa-magnifying-glass" />}
            onClick={() => {
              const params2 = new URLSearchParams({visitor, propName})
              selectedLocations.forEach(locId => params2.append('propLocation', locId.value))
              history.push({
                pathname: '/list/',
                search: params2.toString()
              })
            }}
          >
            Search Now
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

function Thumbnail(props) {
  return (
    <Box my={4} position={"relative"}>
      <Box
        backgroundColor={"#0CD38C"}
        px={4}
        py={2}
        color={"white"}
        position={"absolute"}
      >
        Save 25%
      </Box>
      <Image src={"/Assets/room1.png"} w={"100%"} objectFit="cover"></Image>
      <Flex justify="space-between" align="center" mt={2}>
        <Box color="gray.600" w="100%" cursor="pointer">
          <Text fontSize="lg" fontWeight="bold">
            Apartment in Jakarta
          </Text>
          <Flex align={"end"}>
            <Text fontSize="sm" color={"gray"} mr={1}>
              <strike>Rp.600.000,00</strike>
            </Text>
            <Text fontSize="sm" color={"red"}>
              Rp.450.000
            </Text>
          </Flex>
        </Box>
        <Button variant="primary" w="70%">
          Reserve
        </Button>
      </Flex>
    </Box>
  );
}

function Home(props) {

  const global = useSelector(state => state.user)
  console.log(global);
  // console.log(Tenant);
  // console.log(Profile);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Layout>
      <Box>
        <TopBar />

        <Container maxW="container.lg">
          <Box my={4} py={8}>
            <Slider {...sliderSettings}>
              <Box h={"15vh"} backgroundColor={"red"} overflow={"hidden"}>
                <Image
                  src={"/Assets/room1.png"}
                  w={"100%"}
                  objectFit="cover"
                ></Image>
              </Box>
              <Box h={"15vh"} backgroundColor={"green"} overflow={"hidden"}>
                <Image
                  src={"/Assets/room2.png"}
                  w={"100%"}
                  objectFit="cover"
                ></Image>
              </Box>
              <Box h={"15vh"} backgroundColor={"blue"}>
                <Image
                  src={"/Assets/room3.png"}
                  w={"100%"}
                  objectFit="cover"
                ></Image>
              </Box>
            </Slider>
          </Box>

          <Thumbnail />
          <Thumbnail />
          <Thumbnail />
        </Container>
      </Box>
    </Layout>
  );
}

export default Home;
