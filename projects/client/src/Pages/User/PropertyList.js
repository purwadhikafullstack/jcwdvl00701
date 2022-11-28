import React, { useEffect, useState, useRef } from "react";
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
  ButtonGroup,
  Center,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  HStack,
  useNumberInput,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios, * as others from "axios";

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

function StepperInput(props) {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    min: 0,
    defaultValue: 0,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack>
      <Button rounded="full" {...dec}>
        -
      </Button>
      <Input style={{ width: "80px" }} textAlign="center" {...input} />
      <Button rounded="full" {...inc}>
        +
      </Button>
    </HStack>
  );
}

function SearchBox(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((current) => !current);
  };

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);

  const toggleTsGuestInputOpen = () => {
    setIsGuestInputOpen((current) => !current);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const ref = useRef();
  useOnClickOutside(ref, () => setIsGuestInputOpen(false));

  return (
    <Box backgroundColor="white">
      <Box w="100%" p={4} boxShadow="lg">
        <Flex justify="space-between" backgroundColor="gray.100" align="center">
          <Box
            p={2}
            color="gray.600"
            w="100%"
            onClick={toggleIsOpen}
            cursor="pointer"
          >
            <Text fontSize="sm" fontWeight="bold">
              Jakarta
            </Text>
            <Text fontSize="xs">12-16 Nov | 1 Tamu</Text>
          </Box>
          <IconButton
            aria-label="toggle filters"
            icon={<i className="fa-solid fa-filter" />}
            backgroundColor="gray.200"
            m={2}
          />
        </Flex>
      </Box>

      <Box
        position="absolute"
        w="100%"
        h="100%"
        top={0}
        zIndex={1}
        backgroundColor="blackAlpha.700"
        display={isOpen ? "block" : "none"}
        onClick={toggleIsOpen}
      ></Box>

      <Box
        w="100%"
        p={4}
        boxShadow="lg"
        backgroundColor="gray"
        position="absolute"
        top={0}
        zIndex={2}
        display={isOpen ? "block" : "none"}
      >
        <Flex justify="space-between" align="center">
          <Image src="/Assets/logoTuru.png" alt="turu" />
          <Button m={2} leftIcon={<i className="fa-regular fa-circle-user" />}>
            Login
          </Button>
        </Flex>

        <Flex direction="column">
          <Flex w="100%" backgroundColor="white" py={3} px={6} my={2}>
            <Box w="50%">
              <Text color="gray.500">Check In</Text>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Box>
            <Box w="50%">
              <Text color="gray.500">Check Out</Text>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </Box>
          </Flex>

          <Box
            w="100%"
            backgroundColor="white"
            py={3}
            px={6}
            my={2}
            display={!isGuestInputOpen ? "block" : "none"}
            onClick={toggleTsGuestInputOpen}
          >
            <Text color="gray.500">Guests</Text>
            <Text fontWeight="bold">2 Visitors</Text>
          </Box>

          <Box
            w="100%"
            backgroundColor="white"
            py={3}
            px={6}
            my={2}
            display={isGuestInputOpen ? "block" : "none"}
            ref={ref}
          >
            <Text color="gray.500" mb={3}>
              Guests
            </Text>

            <Flex justify="space-between" mb={2}>
              <Box>
                <Text fontWeight="bold">Visitors</Text>
                <Text fontSize="sm">number of visitor</Text>
              </Box>
              <StepperInput />
            </Flex>
          </Box>
          <Box w="100%" backgroundColor="white" my={2}>
            <Button
              variant="primary"
              w="100%"
              leftIcon={<i className="fa-solid fa-magnifying-glass" />}
            >
              Search Now
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

function PropertyCard(props) {
  const history = useHistory();

  const handleCheckAvailability = () => {
    history.push("/detail/foo");
  };

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mb={4}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "50%" }}
        src={props.data.pic}
        alt={props.data.name}
      />

      <Stack>
        <CardBody style={{ color: "grey" }}>
          <Heading size="md" style={{ color: "black" }}>
            {props.data.name}
          </Heading>

          <Text py="2" fontSize="sm">
            {props.data.address}
          </Text>

          <div style={{ border: "1px dashed lightgrey" }}></div>

          <Text py="2">{props.data.description}</Text>
        </CardBody>

        <CardFooter>
          <Stack w="100%">
            <Center w="100%">
              <Flex
                justifyContent="space-between"
                align="center"
                maxW="85%"
                w="100%"
              >
                <Stack mx={2}>
                  <Center>
                    <i className="fa-solid fa-wifi" />
                  </Center>
                  <Center>
                    <Text>wifi</Text>
                  </Center>
                </Stack>
                <Stack mx={2}>
                  <Center>
                    <i className="fa-solid fa-box-archive" />
                  </Center>
                  <Center>
                    <Text>locker</Text>
                  </Center>
                </Stack>
                <Stack mx={2}>
                  <Center>
                    <i className="fa-solid fa-utensils" />
                  </Center>
                  <Center>
                    <Text>menu</Text>
                  </Center>
                </Stack>
                <Stack mx={2}>
                  <Center>
                    <i className="fa-solid fa-couch" />
                  </Center>
                  <Center>
                    <Text>sofa</Text>
                  </Center>
                </Stack>
              </Flex>
            </Center>

            <Button
              w="100%"
              variant="primary"
              onClick={handleCheckAvailability}
            >
              Check Availability
            </Button>
            <Text as="b">
              <Center>from Rp.{props.data.price},00/per night</Center>
            </Text>
          </Stack>
        </CardFooter>
      </Stack>
    </Card>
  );
}

function PropertyList(props) {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const dummy = {
      pic:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      name: "Living room Sofa",
      description:
        "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.",
      address:
        "Jl. Dr. Saharjo No.104, RT.2/RW.7, Menteng Atas, Kec. Tebet, Kota Jakarta Selatan",
      price: "450.000",
    };

    setProperties([dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy]);

    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      console.log(data?.message || "error");
    })();
  }, []);

  return (
    <div>
      <SearchBox />
      <Container maxW="container.lg">
        {properties.map((property) => (
          <PropertyCard data={property} />
        ))}
      </Container>
    </div>
  );
}

export default PropertyList;
