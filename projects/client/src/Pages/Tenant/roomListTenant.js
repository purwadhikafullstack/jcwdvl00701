import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  HStack,
  IconButton,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import CardRoomTenant from "../../Components/Tenant/CardRoomTenant";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import "../../Style/pagination.css";

function RoomListTenant() {
  const [room, setRoom] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [alfabet, setAlfabet] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [randomNumber, setRandomNumber] = useState(0);

  const { TenantId, firebaseProviderId } = useSelector((state) => state.user);
  // console.log(TenantId);

  const inputHandlerKeyword = (e) => {
    const { value } = e.target;
    const getData = setTimeout(() => {
      setKeyWord(value);
      setPage(0);
      return clearTimeout(getData);
    }, 2000);
  };

  const inputHandler = (e, field) => {
    const { value } = e.target;
    if (field == "alfabet") {
      setAlfabet(value);
      setPage(0);
    } else if (field == "time") {
      setTime(value);
      setPage(0);
    } else if (field == "price") {
      setPrice(value);
      setPage(0);
    } else if (field == "propertyId") {
      setPropertyId(value);
      setPage(0);
    }
  };

  //get property berdasarkan tenant id ==> yg di simpan di dropdown
  //buat id nya dari global store ==> tenant
  const fetchProperty = () => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/room/room-property/${TenantId}?searchQuery=${keyWord}&limit=${limit}&page=${page}&alfabet=${alfabet}&time=${time}&price=${price}&propertyId=${propertyId}`
      )
      .then((res) => {
        setRoom(res.data.roomProperty.rows);
        setPage(res.data.page);
        setRows(res.data.totalRows);
        setPages(res.data.totalPage);

        onClose();
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProperty();
    roomData();
    fetchDataDropdown();
    optionDropdown();
  }, [keyWord, page, time, alfabet, price, propertyId, TenantId, randomNumber]);

  // get data room, yg akan di loop utk di render
  const roomData = () => {
    return room.map((val, index) => {
      // console.log(val);
      return (
        <CardRoomTenant
          key={index}
          roomData={val}
          setRandomNumber={setRandomNumber}
        />
      );
    });
  };

  const fetchDataDropdown = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/room/room-dropdown/${TenantId}`
      )
      .then((res) => {
        //console.log(res.data.dropdown);
        setDropdown(res.data.dropdown);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // loop utk dropdown
  const optionDropdown = () => {
    return dropdown.map((val) => {
      // console.log(val);
      return (
        <option key={val.id} value={val.id}>
          {val.name}
        </option>
      );
    });
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <Layout>
      <Box
        bg={{
          ss: "white",

          sl: "rgba(240, 239, 239, 1)",
        }}
        mt="70px"
      >
        <Container
          px="20px"
          maxW="1140px"
          backgroundSize="cover"
          backgroundImage="/Assets/tenant-branda.png"
          h="133px"
          display={{ ss: "none", sl: "flex" }}
        >
          <Center>
            <Text
              me="10px"
              fontSize="32px"
              fontWeight="bold"
              display={{ ss: "none", sl: "flex" }}
            >
              <i className="fa-solid fa-bed" />
            </Text>
            <Text
              fontSize="32px"
              fontWeight="bold"
              display={{ ss: "none", sl: "flex" }}
            >
              {room.length > 1 ? `${room.length} Rooms` : `${room.length} Room`}
            </Text>
          </Center>
        </Container>
        <Container maxW="1140px" bg="white">
          <Flex mb="20px" justifyContent="space-between">
            <Text
              fontSize="20px"
              fontWeight="bold"
              display={{ ss: "flex", sl: "none" }}
            >
              {room.length > 1 ? `${room.length} Rooms` : `${room.length} Room`}
            </Text>
            {dropdown.length === 0 ? null : (
              <Link to="/tenant/add-room">
                <Center
                  display={{ ss: "flex", sl: "none" }}
                  as="button"
                  h="40px"
                  w="40px"
                  fontSize="20px"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  _hover={{
                    bg: "black",
                    color: "white",
                  }}
                  bg="primary"
                >
                  <i className=" fa-solid fa-plus"></i>
                </Center>
              </Link>
            )}
          </Flex>
          <Select
            mb="20px"
            placeholder="Select Property"
            borderRadius={0}
            borderColor="rgba(175, 175, 175, 1)"
            onChange={(e) => inputHandler(e, "propertyId")}
          >
            {/* render dropdown */}
            {optionDropdown()}
          </Select>
          <FormControl pb="20px">
            <HStack>
              <Input
                type="name"
                placeholder="Search Room"
                borderRadius="0"
                borderColor="rgba(175, 175, 175, 1)"
                onChange={inputHandlerKeyword}
              />
              <IconButton
                onClick={onOpen}
                color="rgba(175, 175, 175, 1)"
                aria-label="toggle filters"
                icon={<i className="fa-solid fa-filter" />}
                backgroundColor="white"
                border="1px"
                borderRadius={0}
                m={2}
                _hover={{
                  bg: "black",
                  color: "white",
                }}
              />
              {dropdown.length === 0 ? null : (
                <>
                  <Link to="/tenant/add-room">
                    <Button
                      display={{ ss: "none", sl: "flex" }}
                      h="40px"
                      w="150px"
                      borderRadius={0}
                      fontSize="16px"
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      _hover={{
                        bg: "black",
                        color: "white",
                      }}
                      bg="primary"
                    >
                      Add Room
                    </Button>
                  </Link>
                </>
              )}
            </HStack>
          </FormControl>
          {/* render data room  */}
        </Container>

        <Container bg="white" maxW="1140px" mt={{ ss: "0px", sl: "20px" }}>
          {dropdown.length === 0 ? (
            <Center flexDirection="column" minHeight="45vh">
              <Text textAlign="center" fontSize="20px" mb="20px">
                You must own a property before adding a room
              </Text>
              <Link to="/tenant/property">
                <Button variant="primary"> Add property</Button>
              </Link>
            </Center>
          ) : (
            <>
              {rows === 0 ? (
                <Center flexDirection="column" minHeight="45vh">
                  <Text textAlign="center" fontSize="20px" mb="20px">
                    Room not found
                  </Text>
                </Center>
              ) : (
                <>
                  <Flex
                    maxW="1140px"
                    borderBottom="1px"
                    borderColor="gray.200"
                    pt="20px"
                    pb="10px"
                    display={{ ss: "none", sl: "flex" }}
                  >
                    <Text me="20px" fontSize="16px" fontWeight="bold" w="90px">
                      Photo
                    </Text>
                    <Text me="20px" fontSize="16px" fontWeight="bold" w="300px">
                      Property Name
                    </Text>
                    <Text me="20px" fontSize="16px" fontWeight="bold" w="150px">
                      Room Name
                    </Text>
                    <Text me="20px" fontSize="16px" fontWeight="bold" w="210px">
                      Price
                    </Text>
                    <Text me="20px" fontSize="16px" fontWeight="bold" w="150px">
                      Modified
                    </Text>
                    <Text me="10px" fontSize="16px" fontWeight="bold" w="80px">
                      Action
                    </Text>
                  </Flex>
                  {roomData()}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: 20,
                      boxSizing: "border-box",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <ReactPaginate
                      previousLabel={
                        <i
                          className=" fa-solid fa-chevron-left"
                          style={{ fontSize: 18 }}
                        ></i>
                      }
                      nextLabel={
                        <i
                          className=" fa-solid fa-chevron-right"
                          style={{
                            fontSize: 18,
                          }}
                        ></i>
                      }
                      pageCount={pages}
                      onPageChange={changePage}
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
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </Box>
      {/* moddal */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Short by:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} name="alfabet">
            <Select
              placeholder="short by name"
              borderRadius={0}
              onChange={(e) => inputHandler(e, "alfabet")}
            >
              <option value="ASC">name: A-Z</option>
              <option value="DESC">name: Z-A</option>
            </Select>
          </ModalBody>
          <ModalBody pb={6} name="time">
            <Select
              placeholder="short by time"
              borderRadius={0}
              onChange={(e) => inputHandler(e, "time")}
            >
              <option value="DESC">Newest </option>
              <option value="ASC">Latest</option>
            </Select>
          </ModalBody>
          <ModalBody pb={6} name="price">
            <Select
              placeholder="short by price"
              borderRadius={0}
              onChange={(e) => inputHandler(e, "price")}
            >
              <option value="ASC"> lowPrice </option>
              <option value="DESC"> highPrice </option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={fetchProperty}
              variant="primary"
              borderRadius={0}
              colorScheme="red"
              mr={0}
              width="100%"
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

export default RoomListTenant;