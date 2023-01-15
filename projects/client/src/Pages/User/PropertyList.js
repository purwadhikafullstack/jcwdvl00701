import React, {useEffect, useState, useRef, useCallback} from "react";
import {useHistory, useLocation} from "react-router-dom";
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
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select as Select2,
} from "chakra-react-select";
import Footer from "../../Components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios, * as others from "axios";
import {useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import Layout from "../../Components/Layout";

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
    defaultValue: props.state,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    props.setState(input.value)
  }, [input.value])

  return (
    <HStack>
      <Button rounded="full" {...dec}>
        -
      </Button>
      <Input style={{width: "80px"}} textAlign="center" {...input}/>
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

  const ref = useRef();
  useOnClickOutside(ref, () => {
    setIsGuestInputOpen(false)
    setIsLocationInputOpen(false)
    setIsPropNameInputOpen(false);
  });

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [priceOrder, setPriceOrder] = useState(props.priceOrder)
  const [nameOrder, setNameOrder] = useState(props.nameOrder)

  const [visitor, setVisitor] = useState(props.visitor)
  const [selectedLocations, setSelectedLocations] = useState([])
  const [propertyNameQuery, setPropertyNameQuery] = useState(props.propertyNameQuery)

  useEffect(() => {
    setSelectedLocations(props.locations.filter(loc => props.selectedLocations.includes(loc.id)).map(loc => {return {value: loc.id, label: loc.location}}))
  }, [props.locations])

  return (
    <Box backgroundColor="white" mt={{ss:'0', sm:'90px'}}>
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
              {selectedLocations.map(loc => loc.label).join(', ') || 'No Locations Selected'}
            </Text>
            <Text fontSize="xs">{visitor} Visitors</Text>
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
        <Flex justify="space-between" align="start" mb={3}>
          <Image src="/Assets/logoTuru.png" alt="turu"/>
        </Flex>

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
                <StepperInput state={visitor} setState={setVisitor}/>
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
                  options={props.locations.map(location => {
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
              {propertyNameQuery || 'Insert Property Name Here'}
            </Text>

            <Flex justify="space-between" mb={2} display={isPropNameInputOpen ? "flex" : "none"}>
              <Box onClick={(e) => {
                e.stopPropagation()
              }} w={'100%'}>
                <Input type={"text"} onChange={(e) => setPropertyNameQuery(e.target.value)}
                       defaultValue={propertyNameQuery}/>
              </Box>
            </Flex>
          </Box>

          <Box w="100%" backgroundColor="white" my={2}>
            <Button
              variant="primary"
              w="100%"
              leftIcon={<i className="fa-solid fa-magnifying-glass"/>}
              onClick={() => {
                props.setVisitor(visitor)
                props.setSelectedLocations(selectedLocations.map(loc => loc.value))
                props.setPropertyNameQuery(propertyNameQuery)
                toggleIsOpen()
              }}
            >
              Search Now
            </Button>
          </Box>
        </Flex>
      </Box>

      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
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
    history.push(`/detail/${props.data.id}`);
  };

  const isDiscount = props.data.defaultPrice > props.data.price
  return (
    <Card
      direction={{base: "column", sm: "row"}}
      overflow="hidden"
      variant="outline"
      mb={4}
    >
      <Box height={'250px'} overflow={'hidden'}>
        <Image
          objectFit="cover"
          w={'100%'}
          // maxW={{base: "100%", sm: "50%"}}
          src={props.data.pic}
          alt={props.data.name}
        />
      </Box>


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
              {
                isDiscount
                  ? <>
                    <Center as={'s'} fontSize={'sm'} color={"gray"}>from Rp.{props.data.defaultPrice},00/per night</Center>
                    <Center color={'red'}>from Rp.{props.data.price},00/per night</Center>
                  </>
                  : <Center>from Rp.{props.data.price},00/per night</Center>
              }
            </Text>
          </Stack>
        </CardFooter>
      </Stack>
    </Card>
  );
}

function PropertyList(props) {
  // const user = useSelector(state => state.user)
  const history = useHistory()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(parseInt(params.get('page')) || 0)

  const [priceOrder, setPriceOrder] = useState(params.get('priceOrder') || 'ASC')
  const [nameOrder, setNameOrder] = useState(params.get('nameOrder') || 'ASC')
  const [visitor, setVisitor] = useState(params.get('visitor') || 1)
  const [selectedLocations, setSelectedLocations] = useState(params.getAll('propLocation').map(id => Number(id)) || [])
  const [propName, setPropName] = useState(params.get('propName') || '')

  const [properties, setProperties] = useState([]);

  const fetchProperties = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/property/search`
    const propLocation = selectedLocations
    const params = {page, priceOrder, nameOrder, visitor, propLocation, propName}

    const response = await axios.get(url, {params});

    const results = []
    response.data.result.properties.forEach(property => {
      results.push({
        id: property.id,
        pic: property.pic ? `${process.env.REACT_APP_API_BASE_URL}${property.pic}` : "/Assets/add_photo.png",
        name: property.name,
        address: property.Category.location,
        description: property.description,
        price: property.price,
        defaultPrice: property.defaultPrice
      })
    })
    setProperties(results)
    setTotalPage(response.data.result.totalPage)

    if (page > response.data.result.totalPage) {
      setPage(response.data.result.page)
      params.page = response.data.result.page
    }

    const params2 = new URLSearchParams({page, priceOrder, nameOrder, visitor, propName})
    selectedLocations.forEach(locId => params2.append('propLocation', locId))
    history.replace({
      pathname: location.pathname,
      search: params2.toString()
    })
  }, [setProperties, page, priceOrder, nameOrder, visitor, selectedLocations, propName])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties]);

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
    <Layout>
      <SearchBox
        fetchProperties={fetchProperties} locations={locations}
        nameOrder={nameOrder} setNameOrder={setNameOrder}
        priceOrder={priceOrder} setPriceOrder={setPriceOrder}
        visitor={visitor} setVisitor={setVisitor}
        selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations}
        propertyNameQuery={propName} setPropertyNameQuery={setPropName}
      />
      <Container maxW="container.lg">
        {properties.map((property) => (
          <PropertyCard key={`prop-${property.id}`} data={property}/>
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
          onPageChange={(page) => {
            setPage(page.selected)
          }}
          initialPage={page}
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
    </Layout>
  );
}

export default PropertyList;
