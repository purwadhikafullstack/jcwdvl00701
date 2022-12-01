import {
  Box,
  Container,
  Flex,
  Button,
  Tab,
  TabList,
  TabPanel,
  Text,
  Tabs,
  TabPanels,
  FormControl,
  Input,
  Tr,
  Th,
  Td,
  Image,
  Table,
  Checkbox,
  TableContainer,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import DatePicker from "react-datepicker";
import React, { useEffect, useRef, useState } from "react";
import Image1 from "../../Assets/bookingHistory1.png";
import Image2 from "../../Assets/bookingHistory2.png";

function SpecialPrice() {
  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <Box mt="20px">
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
      <FormControl my="20px">
        <Input type="name" placeholder="Short by:" borderRadius="0" />
      </FormControl>
      <Flex>
        <FormControl flexDirection="column">
          <Input type="name" placeholder="Special price" borderRadius="0" />
        </FormControl>
        <Button variant="primary" w="110px" h="30px" fontSize="16px" ms="10px">
          submit
        </Button>
      </Flex>
      <TableContainer fontSize="12px" color="black" my="20px">
        <Table variant="simple">
          <Thead bg="rgba(217, 217, 217, 1)">
            <Tr>
              <Th px="2px">
                <Checkbox
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, e.target.checked])
                  }
                >
                  PROPERTY NAME
                </Checkbox>
              </Th>
              <Th px="2px">SPECIAL PRICE</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={2} px="2px">
                Apartement in Bandung
              </Td>
            </Tr>
            <Tr>
              <Td px="2px">
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  <Flex>
                    <Image
                      w="40px"
                      h="30px"
                      overflow="hiden"
                      objectFit="cover"
                      src={Image1}
                      alt="room picture"
                      me="5px"
                    />
                    <Box>
                      <Text fontWeight="reguler" fontSize="14px">
                        Room 1
                      </Text>
                      <Text fontWeight="reguler" fontSize="10px">
                        Modifeyed: 25/06/2022
                      </Text>
                    </Box>
                  </Flex>
                </Checkbox>
              </Td>
              <Td px="2px">Rp. 250.000,00</Td>
            </Tr>
            <Tr>
              <Td px="2px">
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  <Flex>
                    <Image
                      w="40px"
                      h="30px"
                      overflow="hiden"
                      objectFit="cover"
                      src={Image1}
                      alt="room picture"
                      me="5px"
                    />
                    <Box>
                      <Text fontWeight="reguler" fontSize="14px">
                        Room 1
                      </Text>
                      <Text fontWeight="reguler" fontSize="10px">
                        Modifeyed: 25/06/2022
                      </Text>
                    </Box>
                  </Flex>
                </Checkbox>
              </Td>
              <Td px="2px">Rp. 250.000,00</Td>
            </Tr>
            <Tr>
              <Td px="2px">
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  <Flex>
                    <Image
                      w="40px"
                      h="30px"
                      overflow="hiden"
                      objectFit="cover"
                      src={Image1}
                      alt="room picture"
                      me="5px"
                    />
                    <Box>
                      <Text fontWeight="reguler" fontSize="14px">
                        Room 1
                      </Text>
                      <Text fontWeight="reguler" fontSize="10px">
                        Modifeyed: 25/06/2022
                      </Text>
                    </Box>
                  </Flex>
                </Checkbox>
              </Td>
              <Td px="2px">Rp. 250.000,00</Td>
            </Tr>
            <Tr>
              <Td colSpan={2} px="2px">
                Apartement in Bandung
              </Td>
            </Tr>
            <Tr>
              <Td px="2px">
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  <Flex>
                    <Image
                      w="40px"
                      h="30px"
                      overflow="hiden"
                      objectFit="cover"
                      src={Image1}
                      alt="room picture"
                      me="5px"
                    />
                    <Box>
                      <Text fontWeight="reguler" fontSize="14px">
                        Room 1
                      </Text>
                      <Text fontWeight="reguler" fontSize="10px">
                        Modifeyed: 25/06/2022
                      </Text>
                    </Box>
                  </Flex>
                </Checkbox>
              </Td>
              <Td px="2px">Rp. 250.000,00</Td>
            </Tr>
            <Tr>
              <Td px="2px">
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  <Flex>
                    <Image
                      w="40px"
                      h="30px"
                      overflow="hiden"
                      objectFit="cover"
                      src={Image1}
                      alt="room picture"
                      me="5px"
                    />
                    <Box>
                      <Text fontWeight="reguler" fontSize="14px">
                        Room 1
                      </Text>
                      <Text fontWeight="reguler" fontSize="10px">
                        Modifeyed: 25/06/2022
                      </Text>
                    </Box>
                  </Flex>
                </Checkbox>
              </Td>
              <Td px="2px">Rp. 250.000,00</Td>
            </Tr>
            <Tr>
              <Td px="2px">
                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  <Flex>
                    <Image
                      w="40px"
                      h="30px"
                      overflow="hiden"
                      objectFit="cover"
                      src={Image1}
                      alt="room picture"
                      me="5px"
                    />
                    <Box>
                      <Text fontWeight="reguler" fontSize="14px">
                        Room 1
                      </Text>
                      <Text fontWeight="reguler" fontSize="10px">
                        Modifeyed: 25/06/2022
                      </Text>
                    </Box>
                  </Flex>
                </Checkbox>
              </Td>
              <Td px="2px">Rp. 250.000,00</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function RoomAvailability() {
  return <Box>Room Availability</Box>;
}

function Price() {
  return (
    <Layout>
      <Box mt="80px">
        <Container maxW="1140px">
          <Text fontSize="20px" fontWeight="bold" mb="30px">
            Special Price
          </Text>

          <Tabs>
            <TabList>
              <Tab
                fontSize="14px"
                w="50%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Special Price
              </Tab>
              <Tab
                fontSize="14px"
                w="50%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Room Availability
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0px">
                <SpecialPrice />
              </TabPanel>
              <TabPanel>
                <RoomAvailability />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Layout>
  );
}

export default Price;
