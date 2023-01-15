import {
  Box,
  Container,
  Text,
  Flex,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  HStack,
  IconButton,
  Button,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import CardBooking from "../../Components/Tenant/CardBooking";

import axios from "axios";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import "../../Style/pagination.css";
import { useSelector } from "react-redux";

function Order() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [alfabet, setAlfabet] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { TenantId } = useSelector((state) => state.user);
  //console.log(TenantId);
  async function fetchOrder() {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/report/get/${TenantId}?status=${status}&searchQuery=${keyword}&limit=${limit}&page=${page}&alfabet=${alfabet}&time=${time}&price=${price}&propertyId=${propertyId}`
      )
      .then((res) => {
        setOrder(res.data.result.rows);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
        onClose();

        //console.log(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  const fetchDataDropdown = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/room/room-dropdown/${TenantId}`
      )
      .then((res) => {
        setDropdown(res.data.dropdown);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const optionDropdown = () => {
    return dropdown.map((val) => {
      return (
        <option key={val.id} value={val.id}>
          {val.name}
        </option>
      );
    });
  };

  function renderOrder() {
    return order?.map((val, idx) => {
      // console.log(val);
      return (
        <Box>
          <CardBooking
            id={val.id}
            key={idx}
            pic={val.Room.Property?.pic}
            user={val.User.Profile?.name}
            status={val.status}
            name={val.Room.Property?.name}
            start_date={val.startDate}
            end_date={val.endDate}
            roomName={val.Room.name}
            guest_count={val.guestCount}
            price={val.finalPrice}
            paymentProof={val.Transaction?.paymentProof}
            address={val.Room?.Property?.description}
            rules={val.Room?.Property?.rules}
            email={val.User?.email}
            randomNumber={setRandomNumber}
            phoneNumber={val.Room.Property.Tenant.phoneNumber}
            roomId={val.RoomId}
          />
        </Box>
      );
    });
  }

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  function inputHandler(event) {
    const tes = setTimeout(() => {
      const { value } = event.target;

      setKeyword(value);
    }, 2000);
  }

  function selectHandler(event, field) {
    const { value } = event.target;
    if (field === "name") {
      setAlfabet(value);
      setPage(0);
    } else if (field === "time") {
      setTime(value);
      setPage(0);
    } else if (field === "propertyId") {
      setPropertyId(value);
      setPage(0);
    } else if (field === "price") {
      setPrice(value);
      setPage(0);
    } else if (field === "status") {
      setStatus(value);
      setPage(0);
    }
  }
  useEffect(() => {
    fetchOrder();
    fetchDataDropdown();
    renderOrder();
  }, [status, keyword, page, propertyId, TenantId, randomNumber]);

  return (
    <Layout>
      <Box
        mt="70px"
        bg={{
          ss: "white",
          sm: "rgba(240, 239, 239, 1)",
          sl: "rgba(240, 239, 239, 1)",
        }}
      >
        <Container
          px="20px"
          maxW="1140px"
          backgroundSize="cover"
          backgroundImage="/Assets/tenant-branda.png"
          h="133px"
          display={{ ss: "none", sm: "none", sl: "flex" }}
        >
          <Center>
            <Text
              me="10px"
              fontSize="32px"
              fontWeight="bold"
              display={{ ss: "none", sm: "flex", sl: "flex" }}
            >
              <i className="fa-solid fa-clipboard-list"></i>
            </Text>
            <Text
              fontSize="32px"
              fontWeight="bold"
              display={{ ss: "none", sm: "flex", sl: "flex" }}
            >
              {rows > 1 ? `${rows} Orders` : `${rows} Order`}
            </Text>
          </Center>
        </Container>
        <Container maxW="1140px" bg="white" px="20px">
          <Text
            pt="20px"
            fontSize="20px"
            fontWeight="bold"
            display={{ ss: "flex", sm: "none", sl: "none" }}
          >
            {rows > 1 ? `${rows} Orders` : `${rows} Order`}
          </Text>
          <Flex
            pt="20px"
            flexDirection={{
              ss: "column",
              sm: "row",
              sl: "row",
            }}
          >
            <Select
              me={{ ss: "0px", sm: "10px", sl: "10px" }}
              mb="20px"
              bg="white"
              placeholder="Select Property"
              borderRadius={0}
              borderColor="rgba(175, 175, 175, 1)"
              onChange={(e) => selectHandler(e, "propertyId")}
            >
              {optionDropdown()}
            </Select>
            <Select
              ms={{ ss: "0px", sm: "10px", sl: "10px" }}
              bg="white"
              mb="20px"
              placeholder="All Status"
              borderRadius={0}
              borderColor="rgba(175, 175, 175, 1)"
              onChange={(e) => selectHandler(e, "status")}
            >
              <option value={1}>Waiting for payment</option>;
              <option value={2}>unconfirmed</option>;
              <option value={3}>processing</option>;
              <option value={4}>ongoing</option>;
              <option value={5}>cancled</option>;
              <option value={6}>finished</option>;
            </Select>
          </Flex>
          <FormControl pb="20px">
            <HStack>
              <Input
                onChange={inputHandler}
                type="name"
                bg="white"
                placeholder="Search Room"
                borderRadius="0"
                borderColor="rgba(175, 175, 175, 1)"
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
            </HStack>
          </FormControl>
        </Container>
        <Container maxW="1140px" mt="20px">
          {rows === 0 ? (
            <Center minHeight="45vh">
              <Text fontSize="20px">you do not have any orders</Text>
            </Center>
          ) : (
            <Box>
              <SimpleGrid minChildWidth="320px" spacing="30px">
                {renderOrder()}
              </SimpleGrid>
              <Box mt="20px">
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
              </Box>
            </Box>
          )}

          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius={0}>
              <ModalHeader>Shory by:</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Select
                  placeholder="short by name"
                  borderRadius={0}
                  onClick={(e) => selectHandler(e, "name")}
                >
                  <option value="ASC">name: A-Z</option>
                  <option value="DESC">name: Z-A</option>
                </Select>
              </ModalBody>
              <ModalBody pb={6} name="time">
                <Select
                  placeholder="short by time"
                  borderRadius={0}
                  onClick={(e) => selectHandler(e, "time")}
                >
                  <option value="DESC">Newest </option>
                  <option value="ASC">Latest</option>
                </Select>
              </ModalBody>
              <ModalBody>
                <Select
                  placeholder="short by price"
                  borderRadius={0}
                  onChange={(e) => selectHandler(e, "price")}
                >
                  <option value="ASC"> lowPrice </option>
                  <option value="DESC"> highPrice </option>
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={fetchOrder}
                  variant="primary"
                  borderRadius={0}
                  colorScheme="red"
                  mr={0}
                  w="100%"
                >
                  Apply
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    </Layout>
  );
}

export default Order;
