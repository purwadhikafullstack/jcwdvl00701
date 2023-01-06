import {
  Box,
  Container,
  Flex,
  Text,
  Select,
  Tr,
  Th,
  Td,
  Tfoot,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Input,
  FormControl,
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import { useDisclosure } from "@chakra-ui/react";
function Report() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [dataReport, setDataReport] = useState([]);
  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { TenantId } = useSelector((state) => state.user);
  console.log(TenantId);
  let date = new Date();
  // console.log(date.toISOString().split("T")[0]);
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

  const totalSales = () => {
    let total = 0;
    dataReport?.forEach((val) => {
      total += val.finalPrice;
    });
    return total;
  };

  function renderTable() {
    return dataReport?.map((val, index) => {
      return (
        <Tr key={index}>
          <Td px="2px">{index + 1}</Td>
          <Td px="2px">
            {filter === "Property"
              ? val.Room.Property.name
              : val.User.Profile.name}
          </Td>
          <Td px="2px">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.finalPrice)}
          </Td>
          <Td px="2px">
            <Box
              color="black"
              as="button"
              h="25px"
              w="25px"
              fontSize="12px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{
                bg: "black",
              }}
              bg="primary"
              onClick={onOpen}
            >
              <i className="fa-solid fa-circle-info"></i>
            </Box>
          </Td>
        </Tr>
      );
    });
  }

  useEffect(() => {
    async function fetchReport() {
      setIsLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/report/get/sales-report/${TenantId}?startDate=${inputStartDate}&endDate=${inputEndDate}&filter=${filter}&search_query=${keyword}`
        )
        .then((res) => {
          console.log(res.data.result);
          setDataReport(res.data.result);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
    fetchReport();
    console.log(dataReport);
  }, [inputStartDate, inputEndDate, keyword]);
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
              }).format(totalSales())}
            </Text>
            <Text fontSize="13px" fontWeight="reguler">
              Income
              {inputStartDate
                ? ` from ${inputStartDate} to ${inputEndDate}`
                : " all time"}
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
                />
              </>
            ) : null}
          </FormControl>

          <TableContainer fontSize="12px" color="black" mb="30px">
            <Table variant="simple">
              <Thead bg="rgba(217, 217, 217, 1)">
                <Tr>
                  <Th px="2px">No.</Th>
                  <Th px="2px">
                    {filter === "Property" ? "PROPERTY" : "USER NAME"}
                  </Th>
                  <Th px="2px"> INCOME</Th>
                  <Th px="2px"> DETAIL</Th>
                </Tr>
              </Thead>
              {isLoading ? <Loading /> : <Tbody>{renderTable()}</Tbody>}
            </Table>
          </TableContainer>
        </Container>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent borderRadius={0}>
            <ModalHeader>Detail Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to reject this order?</ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
}

export default Report;
