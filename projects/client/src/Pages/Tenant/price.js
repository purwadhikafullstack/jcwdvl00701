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
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper, NumberInputStepper, FormHelperText, InputGroup, InputLeftAddon, InputRightAddon,
} from "@chakra-ui/react";
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select as Select2,
} from "chakra-react-select";
import Layout from "../../Components/Layout";
import DatePicker from "react-datepicker";

import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

import Image1 from "../../Assets/bookingHistory1.png";
import Image2 from "../../Assets/bookingHistory2.png";
import propertyList from "../User/PropertyList";
import {useFormik} from "formik";
import * as Yup from 'yup';


function PriceModalContent(props) {
  return (
    <ModalContent>
      <ModalHeader display={'flex'} justifyContent={"space-between"} alignItems={'center'}>
        <Text>Special Price</Text>
        <Button colorScheme='red' variant={"link"} onClick={props.disclosure.onClose}>
          Cancel
        </Button>
      </ModalHeader>

      {props.modalContent}

    </ModalContent>
  )
}

function PriceForm(props) {

  const [selectedPropeties, setSelectedProperties] = useState([])
  const [selectedRooms, setSelectedRooms] = useState([])

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        startDate: '',
        endDate: '',
        selectedRooms: [],
        type: 'nominal',
        amount: ''
      },
      validationSchema: Yup.object().shape({
        startDate: Yup.string().required(),
        endDate: Yup.string().required(),
        selectedRooms: Yup.array().min(1),
        type: Yup.string().matches(/^nominal|percentage$/, ).required(),
        amount: Yup.number().test({
          name: 'min',
          test: function (value, context) {
            return context.parent.type === 'nominal' ? value > 0 : value >= -100 && value !== 0
          },
          message: "can't be lower than -100 for percentage or 0 for nominal"
        }).test({
          name: 'max',
          test: function (value, context) {
            return context.parent.type !== 'nominal' ? value <= 100 : true
          },
          message: `can't be higher than 100 for percentage`
        })
      }),
      onSubmit: async (values) => {
        console.log(values)
      }
    }
  )

  const [propertyOptions, setPropertyOptions] = useState(props.propertyList)
  const [roomOptions, setRoomOptions] = useState([])
  const fetchRoom = useCallback(async () => {
    if (!selectedPropeties.length) {
      setRoomOptions([])
      return
    }

    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/tenant/get`, {
      params: {propertyId: selectedPropeties.map(property => property.value)}
    })

    setRoomOptions(response.data.result.map(room => {
      return {value: room.id, label: `${room.Property.name} | ${room.name}`}
    }))
  }, [setRoomOptions, selectedPropeties])

  useEffect(() => {
    fetchRoom()  // populating room options
  }, [fetchRoom])

  useEffect(() => {
    const validRoomIds = roomOptions.map(room => room.value)
    const validRooms = selectedRooms.filter(room => validRoomIds.includes(room.value))
    formik.values.selectedRooms = validRooms.map(room => room.value)
    setSelectedRooms(validRooms)
  }, [roomOptions, setSelectedRooms])

  const DateInput = forwardRef(({value, onClick}, ref) => (
    <Input onClick={onClick} placeholder={value ? value : 'choose date'} ref={ref}/>
  ));

  return (
    <>
      <ModalBody>
        <Flex w="100%" my={5}>
          <Box w="50%" mr={2}>
            <Text>Start Date</Text>
            <DatePicker
              closeOnScroll={true}
              selected={formik.values.startDate}
              onChange={(date) => {
                formik.setFieldValue('startDate', date)
                if (new Date(formik.values.endDate) < new Date(date)) formik.setFieldValue('endDate', '')
              }}
              minDate={new Date()}
              customInput={<DateInput/>}
            />
            {formik.errors.startDate ? <Text color={'red'}>*{formik.errors.startDate}</Text> : null}
          </Box>
          <Box w="50%">
            <Text>End Date</Text>
            <DatePicker
              closeOnScroll={true}
              selected={formik.values.endDate}
              onChange={(date) => {
                formik.setFieldValue('endDate', date)
                if (new Date(formik.values.startDate) > new Date(date)) formik.setFieldValue('startDate', '')
              }}
              minDate={formik.values.startDate ? new Date(formik.values.startDate) : new Date()}
              customInput={<DateInput/>}
            />
            {formik.errors.endDate ? <Text color={'red'}>*{formik.errors.endDate}</Text> : null}
          </Box>
        </Flex>

        <FormControl my={5}>
          <FormLabel>Properties</FormLabel>
          <Select2
            isMulti
            name={'properties'}
            options={propertyOptions}
            onChange={choice => setSelectedProperties(choice)}
            value={selectedPropeties}
          />
        </FormControl>

        <FormControl my={5}>
          <FormLabel>Rooms</FormLabel>
          <Select2
            isMulti
            name={'rooms'}
            options={roomOptions}
            onChange={choice => {
              formik.setFieldValue('selectedRooms', choice.map(option => option.value))
              setSelectedRooms(choice)
            }}
            isDisabled={roomOptions.length === 0}
            value={selectedRooms}
          />
          {formik.errors.selectedRooms ? <Text color={'red'}>*{formik.errors.selectedRooms}</Text> : null}
        </FormControl>

        <FormControl my={5}>
          <FormLabel>Price Type</FormLabel>
          <Select2
            name={'type'}
            options={[{value: 'nominal', label: 'Nominal (Rp.)'}, {value: 'percentage', label: 'Percentage (%)'}]}
            onChange={choice => {
              formik.setFieldValue('type', choice.value)
              formik.setFieldValue('amount', 0)
            }}
          />
          {formik.errors.type ? <Text color={'red'}>*{formik.errors.type}</Text> : null}
        </FormControl>

        <FormControl my={5}>
          <FormLabel>Amount</FormLabel>
          <InputGroup>
            {formik.values.type === 'nominal' ? <InputLeftAddon children={'Rp.'}/> : null}
            <NumberInput
              w={'100%'}
              onChange={value => {
                formik.setFieldValue('amount', value)
              }}
              value={formik.values.amount}
            >
              <NumberInputField/>
            </NumberInput>
            {formik.values.type !== 'nominal' ? <InputRightAddon children={'%'}/> : null}
          </InputGroup>

          {formik.values.type !== 'nominal' ?
            <FormHelperText bg={'orange.100'} p={3} rounded={"md"} border={"3px dashed orange"}>
              Percentage <strong>below 0 = Discount</strong><br/>
              Percentage <strong>above 0 = Additional Price</strong>
            </FormHelperText>
            : null
          }

          {formik.errors.amount ? <Text color={'red'}>*{formik.errors.amount}</Text> : null}
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button variant='outline' leftIcon={<i className="fa-solid fa-floppy-disk"></i>}
                onClick={formik.handleSubmit}
                disabled={!formik.isValid || !formik.dirty}
        >
          Save Changes
        </Button>
      </ModalFooter>
    </>
  )
}

function SpecialPrice() {
  const user = useSelector(state => state.user)

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [checkedItems, setCheckedItems] = React.useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [specialPrices, setSpecialPrices] = useState([])

  const fetchSpecialPrices = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/specialprice/all`
    const response = await axios.get(url, {params: {uid: user.id}})

    setSpecialPrices(response.data.result)
  }, [setSpecialPrices, user])

  const [properties, setProperties] = useState([])

  const fetchProperties = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/property/all`
    const response = await axios.get(url, {params: {uid: user.id}})

    setProperties(response.data.result)
  }, [setProperties, user])

  useEffect(() => {
    if (user.id) {
      fetchProperties()
      fetchSpecialPrices()
    }
  }, [fetchProperties, fetchSpecialPrices, user])

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [modalContent, setModalContent] = React.useState(null)

  if (!user.id) return

  // console.log(items[0].Rooms)
  return (
    <Box mt="20px">
      <Flex
        w="100%" py={3} px={6} my={2}
        backgroundColor="white"
        border="1px" borderColor="rgba(175, 175, 175, 1)"
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
        <Button variant="primary" fontSize={"sm"} w={'0.3 vw'} leftIcon={<i className="fa-solid fa-plus"/>}
                onClick={() => {
                  const propertyList = properties.map(property => {
                    return {value: property.id, label: property.name}
                  })
                  setModalContent(<PriceForm propertyList={propertyList}/>)
                  onOpen()
                }}
        >
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
                          w="40px" h="30px"
                          me="5px" mx={2}
                          overflow="hiden" objectFit="cover" src={Image1}
                          alt="room picture"
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
                      <Button colorScheme={'red'} size={'sm'} onClick={() => {
                        onOpen()
                        setModalContent(specialPrice.Room.name)
                      }}>
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
        <ModalOverlay/>
        <PriceModalContent modalContent={modalContent} disclosure={{isOpen, onOpen, onClose}}/>
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
