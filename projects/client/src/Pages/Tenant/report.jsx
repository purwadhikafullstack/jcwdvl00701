import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Image,
  Tr,
  Th,
  Td,
  Tfoot,
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

function Report() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);

  const toggleTsGuestInputOpen = () => {
    setIsGuestInputOpen((current) => !current);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
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

        <Flex
          w="100%"
          backgroundColor="white"
          py={3}
          px={6}
          my={2}
          border="1px"
          borderColor="rgba(175, 175, 175, 1)"
        >
          <Box w="50%">
            <Text color="gray.500">Start date</Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Box>
          <Box w="50%">
            <Text color="gray.500">End date</Text>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </Box>
        </Flex>
        <FormControl pb="20px">
          <Input type="name" placeholder="Short by:" borderRadius="0" />
        </FormControl>
        <TableContainer fontSize="12px" color="red" padding="0px">
          <Table variant="simple" padding="0px">
            <Thead padding="0px">
              <Tr padding="0px">
                <Th padding="0px" isNumeric>
                  No.
                </Th>
                <Th padding="0px">PROPERTY NAME</Th>
                <Th> padding="0px"INCOME</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td padding="0px">1</Td>
                <Td>Apartement in Bandung</Td>
                <Td isNumeric>Rp. 300.000,00</Td>
              </Tr>
              <Tr>
                <Td padding="0px">2</Td>
                <Td>Apartement in Bandung</Td>
                <Td isNumeric>Rp. 300.000,00</Td>
              </Tr>
              <Tr>
                <Td padding="0px">3</Td>
                <Td>Apartement in Bandung</Td>
                <Td isNumeric>Rp. 300.000,00</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default Report;
