import React, {useEffect, useState, useRef, useCallback} from "react";
import {useHistory} from "react-router-dom";
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
  FormControl,
  useNumberInput, Select, FormLabel,
} from "@chakra-ui/react";
import Footer from "../../Components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios, * as others from "axios";
import {useSelector} from "react-redux";
import ReactPaginate from "react-paginate";

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
      <Input style={{width: "80px"}} textAlign="center" {...input} />
      <Button rounded="full" {...inc}>
        +
      </Button>
    </HStack>
  );
}

function SearchBox(props) {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsSearchBarOpen((current) => !current);
  };

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);

  const toggleTsGuestInputOpen = () => {
    setIsGuestInputOpen((current) => !current);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const ref = useRef();
  useOnClickOutside(ref, () => setIsGuestInputOpen(false));

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [priceOrder, setPriceOrder] = useState(props.priceOrder)
  const [nameOrder, setNameOrder] = useState(props.nameOrder)

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
            icon={<i className="fa-solid fa-filter"/>}
            backgroundColor="gray.200"
            m={2}
            onClick={onOpen}
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
        display={isSearchBarOpen ? "block" : "none"}
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
        display={isSearchBarOpen ? "block" : "none"}
      >
        <Flex justify="space-between" align="start">
          <Image src="/Assets/logoTuru.png" alt="turu"/>
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
              <StepperInput/>
            </Flex>
          </Box>
          <Box w="100%" backgroundColor="white" my={2}>
            <Button
              variant="primary"
              w="100%"
              leftIcon={<i className="fa-solid fa-magnifying-glass"/>}
            >
              Search Now
            </Button>
          </Box>
        </Flex>
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>
            <Text>Sort by</Text>
            <ModalCloseButton/>
          </ModalHeader>

          <ModalBody>
            <FormControl my={5}>
              <FormLabel>Name</FormLabel>
              <Select
                onChange={(e) => setNameOrder(e.target.value)}
                defaultValue={nameOrder}
              >
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
              </Select>
            </FormControl>

            <FormControl my={5}>
              <FormLabel>Price</FormLabel>
              <Select
                onChange={(e) => setPriceOrder(e.target.value)}
                defaultValue={priceOrder}
              >
                <option value="ASC">Low to High</option>
                <option value="DESC">High to Low</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                props.setPriceOrder(priceOrder)
                props.setNameOrder(nameOrder)
                onClose()
              }}
              variant="primary"
              w={'100%'}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      direction={{base: "column", sm: "row"}}
      overflow="hidden"
      variant="outline"
      mb={4}
    >
      <Image
        objectFit="cover"
        maxW={{base: "100%", sm: "50%"}}
        src={props.data.pic}
        alt={props.data.name}
      />

      <Stack w={'100%'}>
        <CardBody style={{color: "grey"}}>
          <Heading size="md" style={{color: "black"}}>
            {props.data.name}
          </Heading>

          <Text py="2" fontSize="sm">
            {props.data.address}
          </Text>

          <div style={{border: "1px dashed lightgrey"}}></div>

          <Text py="2">{props.data.description}</Text>
        </CardBody>

        <CardFooter>
          <Stack w="100%">


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
  const user = useSelector(state => state.user)

  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)

  const [priceOrder, setPriceOrder] = useState('ASC')
  const [nameOrder, setNameOrder] = useState('ASC')

  const [properties, setProperties] = useState([]);

  const fetchProperties = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/property/search`
    const params = {page, priceOrder, nameOrder}
    const response = await axios.get(url, {params});

    const results = []
    response.data.result.properties.forEach(property => {
      results.push({
        pic: property.pic ? `${process.env.REACT_APP_API_BASE_URL}${property.pic}` : "/Assets/add_photo.png",
        name: property.name,
        address: property.Category.location,
        description: property.description,
        price: property.price
      })
    })
    setProperties(results)
    setTotalPage(response.data.result.totalPage)
  }, [setProperties, page, user.id, priceOrder, nameOrder])

  useEffect(() => {
    if (user.id) fetchProperties()
  }, [fetchProperties, user]);

  return (
    <div>
      <SearchBox
        fetchProperties={fetchProperties}
        nameOrder={nameOrder} setNameOrder={setNameOrder}
        priceOrder={priceOrder} setPriceOrder={setPriceOrder}
      />
      <Container maxW="container.lg">
        {properties.map((property) => (
          <PropertyCard data={property}/>
        ))}

        <ReactPaginate
          previousLabel={
            <i
              className="fa-solid fa-chevron-left"
              style={{fontSize: 18}}
            ></i>
          }
          nextLabel={
            <i
              className="fa-solid fa-chevron-right"
              style={{
                fontSize: 18
              }}
            ></i>
          }
          pageCount={totalPage}
          onPageChange={(page) => setPage(page.selected)}
          activeClassName={"item active "}
          breakClassName={"item break-me "}
          breakLabel={"..."}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          pageClassName={"item pagination-page "}
          pageRangeDisplayed={2}
          previousClassName={"item previous"}
        />
      </Container>
      <Footer/>
    </div>
  );
}

export default PropertyList;
