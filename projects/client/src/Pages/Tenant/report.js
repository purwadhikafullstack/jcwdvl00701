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
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Layout from "../../Components/Layout";

function Report() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  let date = new Date();
  // console.log(date.toISOString().split("T")[0]);
  date = date.toISOString().split("T")[0];
  const handleChange = (e, field) => {
    const { value } = e.target;
    if (field === "startDate") {
      setInputStartDate(value);
    } else if (field === "endDate") {
      setInputEndDate(value);
    }
  };
  return (
    <Layout>
      <Box mt="80px">
        <Container maxW="1140px">
          <Text fontSize="20px" fontWeight="bold">
            Report
          </Text>
          <Box bg="primary" p="10px" my="20px">
            <Text fontSize="30px" fontWeight="bold">
              Rp. 232.250.023,00
            </Text>
            <Text fontSize="13px" fontWeight="reguler">
              Income from 04/01/2022 - 05/01/2022
            </Text>
          </Box>
          {/* tesss */}

          <Flex>
            <FormControl border={"1px"} borderColor="gray.400" me="5px">
              <Text ms="18px">Start Date</Text>
              <Input
                placeholder="Select Date and Time"
                defaultValue={date}
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
                defaultValue={date}
                type="date"
                border={"none"}
                onChange={(e) => handleChange(e, "endDate")}
              />
            </FormControl>
          </Flex>
          <Select
            mb="20px"
            placeholder="sort by"
            borderRadius={0}
            borderColor="rgba(175, 175, 175, 1)"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <TableContainer fontSize="12px" color="black" mb="30px">
            <Table variant="simple">
              <Thead bg="rgba(217, 217, 217, 1)">
                <Tr>
                  <Th px="2px">No.</Th>
                  <Th px="2px">PROPERTY NAME</Th>
                  <Th px="2px"> INCOME</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td px="2px">1</Td>
                  <Td px="2px">Apartement in Bandung</Td>
                  <Td px="2px">Rp. 300.000,00</Td>
                </Tr>
                <Tr>
                  <Td px="2px">2</Td>
                  <Td px="2px">Apartement in Bandung</Td>
                  <Td px="2px">Rp. 300.000,00</Td>
                </Tr>
                <Tr>
                  <Td px="2px">3</Td>
                  <Td px="2px">Apartement in Bandung</Td>
                  <Td px="2px">Rp. 300.000,00</Td>
                </Tr>
              </Tbody>
              <Tfoot bg="primary">
                <Tr>
                  <Th colSpan={2} px="2px">
                    Total Income:
                  </Th>

                  <Th px="2px">Rp. 300.000,00</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Layout>
  );
}

export default Report;
