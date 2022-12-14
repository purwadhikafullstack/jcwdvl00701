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
    Select,
    HStack,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import DatePicker from "react-datepicker";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Image1 from "../../Assets/bookingHistory1.png";
import Image2 from "../../Assets/bookingHistory2.png";
import axios from "axios";
import {onAuthStateChanged} from "firebase/auth";
import {authFirebase} from "../../Config/firebase";
import {useHistory} from "react-router-dom";

function SpecialPrice() {
    const history = useHistory();

    const [userId, setUserId] = useState('')
    const getUser = useCallback(() => {
        onAuthStateChanged(authFirebase, (user) => {
            if (user) {
                setUserId(user.uid)
            } else {
                history.push('/')
            }
        });
    }, [setUserId, history])

    useEffect(() => {
        getUser()
    }, [getUser])

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [checkedItems, setCheckedItems] = React.useState([false, false]);

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    const [specialPrices, setSpecialPrices] = useState([])

    const fetchSpecialPrices = useCallback(async () => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/specialprice/all`
        const response = await axios.get(url, {params: {uid: 'xrljFGSt5Qb6CBICd4dCQACXISX2'}})

        setSpecialPrices(response.data.result)

        // const _checkedItems = {}
        // response.data.result.forEach(specialPrice => {
        //     _checkedItems[specialPrice.id] = false
        // })
        // setCheckedItems(_checkedItems)
    }, [setSpecialPrices])

    const [properties, setProperties] = useState([])

    const fetchProperties = useCallback(async () => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/property/all`
        const response = await axios.get(url, {params: {uid: 'xrljFGSt5Qb6CBICd4dCQACXISX2'}})

        setProperties(response.data.result)
    }, [setProperties])

    useEffect(() => {
        if (userId) {
            fetchProperties()
            fetchSpecialPrices()
        }
    }, [fetchProperties, fetchSpecialPrices, userId])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [modalContent, setModalContent] = React.useState()

    if (!userId) return

    // console.log(items[0].Rooms)
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
            <Select
                my="20px"
                placeholder="Select Property"
                borderRadius={0}
                borderColor="rgba(175, 175, 175, 1)"
            >
                {
                    properties.map(property => {
                        return (
                            <option key={`property-option-${property.id}`} value={property.id}>
                                {property.name}
                            </option>
                        )
                    })
                }
            </Select>
            <Flex justifyContent={'end'}>
                <Button variant="primary" fontSize={"sm"} w={'0.3 vw'} leftIcon={<i className="fa-solid fa-plus"/>}>
                    Add Special Price
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
                                    mx={2}
                                />
                                Special Prices
                            </Th>
                            <Th px="2px">Price</Th>
                            <Th px="2px">Actions</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {
                            specialPrices.map(specialPrice => {
                                return (
                                    <Tr key={`specialPrice-${specialPrice.id}`}>
                                        <Td px="2px">

                                            <Flex alignItems={'center'}>
                                                <Checkbox
                                                    isChecked={checkedItems[0]}
                                                    onChange={(e) =>
                                                        setCheckedItems([e.target.checked, checkedItems[1]])
                                                    }
                                                    mx={2}
                                                />
                                                <Image
                                                    w="40px"
                                                    h="30px"
                                                    overflow="hiden"
                                                    objectFit="cover"
                                                    src={Image1}
                                                    alt="room picture"
                                                    me="5px"
                                                    mx={2}
                                                />
                                                <Link onClick={() => {
                                                    onOpen()
                                                    setModalContent(specialPrice.Room.name)
                                                }}>
                                                    <Box>
                                                        <Text fontWeight="reguler" fontSize="14px">
                                                            {specialPrice.Room.name} - {specialPrice.Room.Property.name}
                                                        </Text>
                                                        <Text fontWeight="reguler" fontSize="10px">
                                                            start
                                                            date: {new Date(specialPrice.startDate).toLocaleDateString()}
                                                        </Text>
                                                        <Text fontWeight="reguler" fontSize="10px">
                                                            end
                                                            date: {new Date(specialPrice.endDate).toLocaleDateString()}
                                                        </Text>
                                                    </Box>
                                                </Link>

                                            </Flex>

                                        </Td>
                                        <Td px="2px">{
                                            specialPrice.type === 'percentage' ?
                                                specialPrice.discount + '%' :
                                                'Rp. ' + specialPrice.discount.toLocaleString() + ',00'
                                        }</Td>
                                        <Td px="2px">
                                            <Button colorScheme={'red'} size={'sm'}>
                                                <i className="fa-solid fa-trash"/>
                                            </Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }

                    </Tbody>
                </Table>
            </TableContainer>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Special Price</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalContent}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant='ghost' leftIcon={<i className="fa-solid fa-floppy-disk"></i>}>Save Changes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

function RoomAvailability() {
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
            <HStack>
                <Select
                    placeholder="Select Property
        "
                    borderRadius={0}
                    borderColor="rgba(175, 175, 175, 1)"
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Select>
                <Button variant="primary" w="110px" fontSize="16px">
                    submit
                </Button>
            </HStack>

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
                            <Th px="2px"> ROOM AVAILABILITY</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td colSpan={2} px="2px" fontSize="14px" fontWeight="bold">
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
                            <Td px="2px">
                                {" "}
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/06/2022 -
                                </Text>
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/07/2022
                                </Text>
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
                            <Td px="2px">
                                {" "}
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/06/2022 -
                                </Text>
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/07/2022
                                </Text>
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
                            <Td px="2px">
                                {" "}
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/06/2022 -
                                </Text>
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/07/2022
                                </Text>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td colSpan={2} px="2px" fontSize="14px" fontWeight="bold">
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
                            <Td px="2px">
                                {" "}
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/06/2022 -
                                </Text>
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/07/2022
                                </Text>
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
                            <Td px="2px">
                                {" "}
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/06/2022 -
                                </Text>
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/07/2022
                                </Text>
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
                            <Td px="2px">
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/06/2022 -
                                </Text>
                                <Text fontSize="12px" fontWeight="reguler">
                                    25/07/2022
                                </Text>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
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
                                _selected={{bg: "primary"}}
                            >
                                Special Price
                            </Tab>
                            <Tab
                                fontSize="14px"
                                w="50%"
                                py="3px"
                                _selected={{bg: "primary"}}
                            >
                                Room Availability
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel p="0px">
                                <SpecialPrice/>
                            </TabPanel>
                            <TabPanel p="0px">
                                <RoomAvailability/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Container>
            </Box>
        </Layout>
    );
}

export default Price;
