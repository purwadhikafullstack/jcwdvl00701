import {
  Box,
  Container,
  Text,
  Input,
  FormControl,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Select,
  HStack,
  IconButton,
  Button,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import CardBooking from "../../Components/Tenant/CardBooking";
import Image3 from "../../Assets/bookingHistory3.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import "../../Style/pagination.css";
function Order() {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [alfabet, setAlfabet] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const tenantId = 3;
  async function fetchOrder() {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/report/get/${tenantId}?status=${status}&searchQuery=${keyword}&limit=${limit}&page=${page}&alfabet=${alfabet}&time=${time}&price=${price}&propertyId=${propertyId}`
      )
      .then((res) => {
        setOrder(res.data.result.rows);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
        onClose();
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  const fetchDataDropdown = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/room/room-dropdown`)
      .then((res) => {
        // console.log(res.data.dropdown);
        setDropdown(res.data.dropdown);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const optionDropdown = () => {
    return dropdown.map((val) => {
      // console.log(val);
      return <option value={val.id}>{val.name}</option>;
    });
  };
  function renderOrder() {
    return order?.map((val, idx) => {
      return (
        <CardBooking
          key={idx}
          pic={val.Room.Property.pic}
          user={val.User.Profile.name}
          status={val.status}
          name={val.Room.Property.name}
          start_date={val.startDate}
          end_date={val.endDate}
          roomName={val.Room.name}
          guest_count={val.guestCount}
          price="300000"
        />
      );
    });
  }

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  function inputHandler(event) {
    const tes = setTimeout(() => {
      console.log(event.target.value);
      const { value } = event.target;

      setKeyword(value);
    }, 2000);
  }

  function selectHandler(event, field) {
    const { value } = event.target;
    if (field === "name") {
      setAlfabet(value);
    } else if (field === "time") {
      setTime(value);
    } else if (field == "propertyId") {
      setPropertyId(value);
    }
  }
  useEffect(() => {
    fetchOrder();
    fetchDataDropdown();
    renderOrder();
  }, [status, keyword, page, propertyId, tenantId]);

  return (
    <Layout>
      <Box mt="70px">
        <Container maxW="1140px" px="0px">
          <Text ms="20px" mt="90px" fontSize="20px" fontWeight="bold">
            12 Orders
          </Text>
          <Box bg="primary" px="20px" py="10px" mt="20px">
            <CardBooking
              pic=""
              user="kratos"
              status="ongoing"
              name="name Property"
              start_date={12}
              end_date={13}
              roomName="room1"
              guest_count={3}
              price="300000"
            />
            <CardBooking
              pic=""
              user="kratos"
              status="ongoing"
              name="name Property"
              start_date={12}
              end_date={13}
              roomName="room1"
              guest_count={3}
              price="300000"
            />
          </Box>
        </Container>
        <Container maxW="1140px" mt="20px">
          <Select
            mb="20px"
            placeholder="Select Property"
            borderRadius={0}
            borderColor="rgba(175, 175, 175, 1)"
            onChange={(e) => selectHandler(e, "propertyId")}
          >
            {optionDropdown()}
          </Select>
          <FormControl pb="20px">
            <HStack>
              <Input
                onChange={inputHandler}
                type="name"
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
          <Flex>
            <Button
              onClick={() => setStatus(null)}
              variant={"primary"}
              width="25%"
            >
              All
            </Button>
            <Button
              onClick={() => setStatus(1)}
              variant={"primary"}
              bg="blue"
              width="25%"
              color={"white"}
            >
              Ongoing
            </Button>
            <Button
              onClick={() => setStatus(2)}
              variant={"primary"}
              bg="green"
              width="25%"
              color={"white"}
            >
              Finished
            </Button>
            <Button
              onClick={() => setStatus(3)}
              variant={"primary"}
              bg="red"
              width="25%"
              color={"white"}
            >
              Cancled
            </Button>
          </Flex>
          <Box>
            {renderOrder()}{" "}
            <ReactPaginate
              previousLabel={
                <i
                  class="fa-solid fa-chevron-left"
                  style={{
                    fontSize: 18,
                    height: 40,
                    width: 40,
                    position: "absolute",
                    left: "11px",
                    top: "11px",
                  }}
                ></i>
              }
              nextLabel={
                <i
                  class="fa-solid fa-chevron-right"
                  style={{
                    fontSize: 18,
                    height: 40,
                    width: 40,
                    position: "absolute",
                    left: "11px",
                    top: "11px",
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
          </Box>
          {/* <Tabs>
            <TabList>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                All
              </Tab>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Ongoing
              </Tab>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Finished
              </Tab>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Cancled
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel as="button" onClick={() => fetchOrder()} p="0px">
                {renderOrder()}
              </TabPanel>
              <TabPanel onClick={() => fetchOrder()}>Ongoing</TabPanel>
              <TabPanel onClick={() => fetchOrder()}>Finished</TabPanel>
              <TabPanel onClick={() => fetchOrder()}>Cancled</TabPanel>
            </TabPanels>
          </Tabs> */}
          {/* moddal */}
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
