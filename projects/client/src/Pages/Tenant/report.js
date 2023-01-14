import {
  Box,
  Container,
  Flex,
  Text,
  Select,
  Center,
  Input,
  FormControl,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import "../../Style/pagination.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import { useDisclosure } from "@chakra-ui/react";
function Report() {
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [dataReport, setDataReport] = useState([]);
  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [page, setPage] = useState(0);
  const [finalPrice, setFinalPrice] = useState("");
  const [time, setTime] = useState("");
  const [detailData, setDetailData] = useState({});
  const [totalSales, setTotalSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { TenantId } = useSelector((state) => state.user);
  console.log(TenantId);
  let date = new Date();
  // console.log(date.toISOString().split("T")[0]);
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();

  date = date.toISOString().split("T")[0];
  const handleChange = (e, field) => {
    console.log(field);
    const { value } = e.target;
    if (field === "startDate") {
      setInputStartDate(value);
    } else if (field === "endDate") {
      setInputEndDate(value);
    } else if (field === "filter") {
      setFilter(value);
    }
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
    if (field === "finalPrice") {
      setFinalPrice(value);
    } else if (field === "time") {
      setTime(value);
    }
  }
  function detail(event) {
    setDetailData(event);
    onDetailOpen();
  }

  const countTotalSales = () => {
    let total = 0;
    totalSales?.forEach((val) => {
      total += val.finalPrice;
    });
    return total;
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  function renderTable() {
    return dataReport?.map((val, index) => {
      return (
        <Flex
          key={index}
          maxW="1140px"
          borderBottom="1px"
          borderColor="gray.200"
          pt="20px"
          pb="10px"
          ps="10px"
        >
          <Text
            mx="20px"
            fontSize="14px"
            fontWeight="reguler"
            w={filter === "User" ? "130px" : "210px"}
          >
            {filter === "User" ? val.User.Profile.name : val.Room.Property.name}
          </Text>
          <Text
            display={{ ss: "none", sl: "flex" }}
            me="20px"
            fontSize="14px"
            fontWeight="reguler"
            w={filter === "User" ? "210px" : "130px"}
          >
            {filter === "User" ? val.Room.Property.name : val.User.Profile.name}
          </Text>
          <Text
            display={{ ss: "none", sl: "flex" }}
            me="20px"
            fontSize="14px"
            fontWeight="reguler"
            w="150px"
          >
            {val.Room.name}
          </Text>
          <Text
            display={{ ss: "none", sl: "flex" }}
            me="20px"
            fontSize="14px"
            fontWeight="reguler"
            w="120px"
          >
            {val.startDate.slice(0, 10)}
          </Text>
          <Text
            display={{ ss: "none", sl: "flex" }}
            me="20px"
            fontSize="14px"
            fontWeight="reguler"
            w="120px"
          >
            {val.endDate.slice(0, 10)}
          </Text>
          <Text me="20px" fontSize="14px" fontWeight="reguler" w="180px">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.finalPrice)}
          </Text>
          <Box
            display={{ ss: "flex", sl: "none" }}
            me="10px"
            fontSize="14px"
            fontWeight="reguler"
            w="120px"
          >
            <Box
              color="black"
              as="button"
              h="25px"
              w="25px"
              fontSize="12px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{
                bg: "black",
                color: "white",
              }}
              bg="primary"
              onClick={() => detail(val)}
            >
              <i className="fa-solid fa-circle-info"></i>
            </Box>
          </Box>
        </Flex>
      );
    });
  }
  async function fetchReport() {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/report/get/sales-report/${TenantId}?startDate=${inputStartDate}&endDate=${inputEndDate}&filter=${filter}&search_query=${keyword}&page=${page}&limit=${limit}&time=${time}&final_price=${finalPrice}`
      )
      .then((res) => {
        console.log(res.data);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
        setDataReport(res.data.result.rows);
        setTotalSales(res.data.totalSales);
        onDetailClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    fetchReport();

    console.log(dataReport);
  }, [inputStartDate, inputEndDate, keyword, page]);
  return (
    <Layout>
      <Box mt="80px">
        <Container maxW="1140px">
          <Text fontSize="20px" fontWeight="bold">
            Report
          </Text>
          <Box bg="primary" p="10px" my="20px">
            <Text fontSize="30px" fontWeight="bold">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(countTotalSales())}
            </Text>
            <Text fontSize="13px" fontWeight="reguler">
              Income
              {inputStartDate
                ? ` from ${inputStartDate} to ${inputEndDate}, `
                : " all time, "}
              from
              {rows > 1 ? ` ${rows} orders` : ` ${rows} order`}
            </Text>
          </Box>

          <Flex>
            <FormControl border={"1px"} borderColor="gray.400" me="5px">
              <Text ms="18px">Start Date</Text>
              <Input
                placeholder="Select Date and Time"
                defaultValue={inputStartDate}
                size="md"
                type="date"
                border={"none"}
                onChange={(e) => handleChange(e, "startDate")}
              />
            </FormControl>
            <FormControl border={"1px"} borderColor="gray.400">
              {/* buat stardate adnn date dalm flex agar bias sevelahan(dicoba), dijadikan query nanti nya */}
              <Text ms="18px">End Date</Text>
              <Input
                placeholder="Select Date and Time"
                size="md"
                defaultValue={inputStartDate}
                type="date"
                border={"none"}
                onChange={(e) => handleChange(e, "endDate")}
              />
            </FormControl>
          </Flex>
          <FormControl>
            <HStack>
              <Select
                my="20px"
                placeholder={filter ? "reset filter" : "filter by"}
                borderRadius={0}
                borderColor="rgba(175, 175, 175, 1)"
                onChange={(e) => handleChange(e, "filter")}
              >
                <option value="Property">Property</option>
                <option value="User">User</option>
              </Select>
              <IconButton
                onClick={onFilterOpen}
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
            {filter ? (
              <>
                <Input
                  onChange={inputHandler}
                  type="name"
                  placeholder={
                    filter === "Property" ? "Search Property" : "Search User"
                  }
                  borderRadius="0"
                  borderColor="rgba(175, 175, 175, 1)"
                  mb="20px"
                />
              </>
            ) : null}
          </FormControl>

          {rows === 0 ? (
            <Center flexDirection="column" minHeight="45vh">
              <Text textAlign="center" fontSize="20px" mb="20px">
                Report not found
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
              >
                <Text
                  mx="20px"
                  fontSize="16px"
                  fontWeight="bold"
                  w={filter === "User" ? "130px" : "210px"}
                >
                  {filter === "User" ? "user" : "property"}
                </Text>
                <Text
                  display={{ ss: "none", sl: "flex" }}
                  me="20px"
                  fontSize="16px"
                  fontWeight="bold"
                  w={filter === "User" ? "210px" : "130px"}
                >
                  {filter === "User" ? "property" : "user"}
                </Text>
                <Text
                  display={{ ss: "none", sl: "flex" }}
                  me="20px"
                  fontSize="16px"
                  fontWeight="bold"
                  w="150px"
                >
                  Room
                </Text>
                <Text
                  display={{ ss: "none", sl: "flex" }}
                  me="20px"
                  fontSize="16px"
                  fontWeight="bold"
                  w="120px"
                >
                  Start Date
                </Text>
                <Text
                  display={{ ss: "none", sl: "flex" }}
                  me="20px"
                  fontSize="16px"
                  fontWeight="bold"
                  w="120px"
                >
                  End Date
                </Text>
                <Text me="20px" fontSize="16px" fontWeight="bold" w="180px">
                  Income
                </Text>
                <Text
                  display={{ ss: "flex", sl: "none" }}
                  me="10px"
                  fontSize="16px"
                  fontWeight="bold"
                  w="120px"
                >
                  Detail
                </Text>
              </Flex>
              {renderTable()}
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
                      className=" fa-solid fa-chevron-right"
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
              </div>
            </>
          )}
        </Container>
        <Modal
          closeOnOverlayClick={false}
          isOpen={isDetailOpen}
          onClose={onDetailClose}
        >
          <ModalOverlay />
          <ModalContent borderRadius={0}>
            <ModalHeader>Detail Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer mb="20px">
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold">Property</Td>
                      <Td>: {detailData?.Room?.Property?.name}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">User</Td>
                      <Td>: {detailData?.User?.Profile?.name}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Room</Td>
                      <Td>: {detailData?.Room?.name}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Start Date</Td>
                      <Td>: {detailData?.startDate?.slice(0, 10)}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">End Date</Td>
                      <Td>: {detailData?.endDate?.slice(0, 10)}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Income</Td>
                      <Td>
                        :
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(detailData?.finalPrice)}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal
          closeOnOverlayClick={false}
          isOpen={isFilterOpen}
          onClose={onFilterClose}
        >
          <ModalOverlay />
          <ModalContent borderRadius={0}>
            <ModalHeader> Short by:</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6} name="time">
              <Select
                mb="20px"
                placeholder="short by Income"
                borderRadius={0}
                onClick={(e) => selectHandler(e, "finalPrice")}
              >
                <option value="DESC">highest income</option>
                <option value="ASC">lowest income</option>
              </Select>
              <Select
                placeholder="short by date"
                borderRadius={0}
                onClick={(e) => selectHandler(e, "time")}
              >
                <option value="DESC">Newest </option>
                <option value="ASC">Latest</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={fetchReport}
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
      </Box>
    </Layout>
  );
}

export default Report;
