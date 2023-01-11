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
  Heading,
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
  NumberDecrementStepper,
  NumberInputStepper,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spinner,
  Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Fade, Collapse,
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
import ReactPaginate from "react-paginate";
import * as PropTypes from "prop-types";

const ERROR_MESSAGE = 'internal server error. please refresh page and try again'
const DateInput = forwardRef(({value, onClick}, ref) => (
  <Input onClick={onClick} placeholder={value ? value : 'choose date'} ref={ref}/>
));

function PageModalContent(props) {
  return (
    <ModalContent>
      <ModalHeader display={'flex'} justifyContent={"space-between"} alignItems={'center'}>
        <Text>{props.title}</Text>
        <Button colorScheme='red' variant={"link"} onClick={props.disclosure.onClose}>
          Cancel
        </Button>
      </ModalHeader>

      {props.modalContent}

    </ModalContent>
  )
}


function AddSpecialPriceForm(props) {

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
        type: Yup.string().matches(/^nominal|percentage$/,).required(),
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
        const url = `${process.env.REACT_APP_API_BASE_URL}/specialprice/add`
        try {
          const response = await axios.post(url, values)
          alert('success add special prices')
          props.fetchSpecialPrices()
          props.disclosure.onClose()
        } catch (err) {
          alert(ERROR_MESSAGE)
        }
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
          Save Special Prices
        </Button>
      </ModalFooter>
    </>
  )
}

function UpdateSpecialPriceForm(props) {

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        startDate: new Date(props.specialPrice.startDate),
        endDate: new Date(props.specialPrice.endDate),
        type: props.specialPrice.type,
        amount: props.specialPrice.discount
      },
      validationSchema: Yup.object().shape({
        startDate: Yup.string().required(),
        endDate: Yup.string().required(),
        type: Yup.string().matches(/^nominal|percentage$/,).required(),
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
        values.id = props.specialPrice.id
        const url = `${process.env.REACT_APP_API_BASE_URL}/specialprice/update`
        try {
          const response = await axios.post(url, values)
          alert('success update special price')
          props.fetchSpecialPrices()
          props.disclosure.onClose()
        } catch (err) {
          alert(ERROR_MESSAGE)
        }

      }
    }
  )

  const types = [{value: 'nominal', label: 'Nominal (Rp.)'}, {value: 'percentage', label: 'Percentage (%)'}]

  return (
    <>
      <ModalBody>
        <Heading as={'h1'} size={'md'} mt={5} mb={3}>
          {props.specialPrice.Room.name}
        </Heading>
        <Heading as={'h2'} size={'sm'} mb={5}>
          {props.specialPrice.Room.Property.name}
        </Heading>

        <Box my={5}>
          <Image
            objectFit="cover"
            w={'100%'}
            maxW={{base: "100%", sm: "50%"}}
            src={props.specialPrice.Room.picture || Image2}
          />
        </Box>


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
          <FormLabel>Price Type</FormLabel>
          <Select2
            name={'type'} I
            options={types}
            onChange={choice => {
              formik.setFieldValue('type', choice.value)
              formik.setFieldValue('amount', 0)
            }}
            defaultValue={formik.values.type === 'nominal' ? types[0] : types[1]}
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
          Save Special Prices
        </Button>
      </ModalFooter>
    </>
  )
}

function DeleteSpecialPriceForm(props) {
  return (
    <>
      <ModalBody>
        <Text mb={3}>Proceed to delete special price for:</Text>
        <Table>
          <Tbody>
            <Tr>
              <Th>Room Name</Th>
              <Td>{props.specialPrice.Room.name}</Td>
            </Tr>
            <Tr>
              <Th>Property Name</Th>
              <Td>{props.specialPrice.Room.Property.name}</Td>
            </Tr>
            <Tr>
              <Th>Duration</Th>
              <Td>{new Date(props.specialPrice.startDate).toLocaleDateString('id')} - {new Date(props.specialPrice.endDate).toLocaleDateString('id')}</Td>
            </Tr>
            <Tr>
              <Th>Amount</Th>
              <Td>{props.specialPrice.type === 'nominal' ? 'Rp. ' : null}{props.specialPrice.discount}{props.specialPrice.type !== 'nominal' ? '%' : null}</Td>
            </Tr>
          </Tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme={'red'} leftIcon={<i className="fa-solid fa-trash"></i>}
                onClick={async () => {
                  const url = `${process.env.REACT_APP_API_BASE_URL}/specialprice/delete`
                  try {
                    const result = await axios.post(url, {id: props.specialPrice.id})
                    props.fetchSpecialPrices()
                    props.disclosure.onClose()
                  } catch (err) {
                    alert(ERROR_MESSAGE)
                  }
                }}
        >
          Delete
        </Button>
      </ModalFooter>
    </>
  )
}

function FilterSpecialPrice(props) {
  const startDate = props.startDate ? props.startDate.toISOString().substring(0,10) : props.startDate
  const endDate = props.endDate ? props.endDate.toISOString().substring(0,10) : props.endDate
  return <>
    <Flex w="100%">
      <Box w="50%" mr={2}>
        <Text>Start date</Text>
        <Input
          size="md" type="date"
          onChange={props.handleChangeStartDate}
          defaultValue={startDate}
        />
      </Box>
      <Box w="50%">
        <Text>End date</Text>
        <Input
          size="md" type="date"
          onChange={props.handleChangeEndDate}
          min={new Date(props.startDate).toISOString().split('T')[0]}
          defaultValue={endDate}
        />
      </Box>
    </Flex>

    <FormControl my={5}>
      <FormLabel>Properties</FormLabel>
      <Select2
        isMulti
        name={"properties"}
        options={props.options.map(option => {
          return {value: option.id, label: option.name}
        })}
        onChange={props.handlePropertiesSelect}
      />
    </FormControl>
  </>;
}

function SpecialPrice(props) {
  const user = props.user

  const properties = props.properties

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [specialPrices, setSpecialPrices] = useState([])

  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)

  const fetchSpecialPrices = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/specialprice/all`
    const params = {uid: user.id, page: page}

    if (selectedPropertyId) params.propertyId = selectedPropertyId
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await axios.get(url, {params: params})

    setSpecialPrices(response.data.result.specialPrices)
    setTotalPage(response.data.result.totalPage)
  }, [endDate, selectedPropertyId, startDate, user.id, page])

  useEffect(() => {
    if (user.id) fetchSpecialPrices()
  }, [fetchSpecialPrices, user])

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [modalContent, setModalContent] = React.useState(null)

  const {isOpen: isOpenFilter, onToggle: onToggleFilter} = useDisclosure()

  return (
    <Box mt="20px">
      {/*control panel starts*/}
      <Flex justifyContent={'space-between'} my={5}>
        <Button variant="primary" fontSize={"sm"} w={'0.3 vw'} leftIcon={<i className="fa-solid fa-plus"/>}
                onClick={() => {
                  const propertyList = properties.map(property => {
                    return {value: property.id, label: property.name}
                  })
                  setModalContent(
                    <AddSpecialPriceForm propertyList={propertyList}
                                         disclosure={{isOpen, onOpen, onClose}}
                                         history={props.history}
                                         fetchSpecialPrices={fetchSpecialPrices}
                    />
                  )
                  onOpen()
                }}
        >
          Add New Special Price
        </Button>

        <Button variant="secondary" fontSize={"sm"} w={'0.3 vw'} leftIcon={<i className="fa-solid fa-filter"/>}
                onClick={onToggleFilter}>
          Filter
        </Button>
      </Flex>
      <Collapse in={isOpenFilter} animateOpacity style={{overflow: 'visible'}}>
        <FilterSpecialPrice
          startDate={startDate}
          endDate={endDate}
          selectedChoice={selectedPropertyId}
          handleChangeStartDate={(item) => setStartDate(item.target.valueAsDate)}
          handleChangeEndDate={(item) => setEndDate(item.target.valueAsDate)}
          options={properties}
          handlePropertiesSelect={selectedChoices => {
            setSelectedPropertyId(selectedChoices.map(choice => choice.value))
          }}
        />
      </Collapse>
      {/*control panel ends*/}

      <TableContainer fontSize="12px" color="black" my="20px">
        <Table variant="simple">
          <Thead bg="rgba(217, 217, 217, 1)">
            <Tr>
              <Th textAlign={'center'}>Room</Th>
              <Th textAlign={'center'}>Duration</Th>
              <Th textAlign={'center'}>Price</Th>
              <Th textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {
              specialPrices.map(specialPrice => {
                return (
                  <Tr key={`specialPrice-${specialPrice.id}`}>
                    <Td onClick={() => {
                      setModalContent(
                        <UpdateSpecialPriceForm specialPrice={specialPrice}
                                                disclosure={{isOpen, onOpen, onClose}}
                                                fetchSpecialPrices={fetchSpecialPrices}
                        />
                      )
                      onOpen()
                    }} cursor={'pointer'} display={'flex'}>
                      <Box w="40px" h="30px" my={'auto'} mr={2} overflow="hiden">
                        <Image
                          h={'100%'}
                          objectFit="cover" src={Image1}
                          alt="room picture"
                        />
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize={'sm'}>
                          {specialPrice.Room.Property.name} - {specialPrice.Room.name}
                        </Text>
                        <Text fontWeight="reguler" fontSize={'xs'}>
                          Last Modified: {new Date(specialPrice.updatedAt).toLocaleDateString()}
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Text fontWeight="reguler" fontSize={'xs'}>
                        {new Date(specialPrice.startDate).toLocaleDateString()} - {new Date(specialPrice.endDate).toLocaleDateString()}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontWeight="reguler" fontSize={'xs'}
                            textAlign={specialPrice.type === 'percentage' ? 'center' : 'left'}>{
                        specialPrice.type === 'percentage' ?
                          specialPrice.discount + '%' :
                          'Rp. ' + specialPrice.discount.toLocaleString() + ',00'
                      }</Text>
                    </Td>
                    <Td>
                      <Button colorScheme={'red'} size={'sm'} onClick={() => {
                        onOpen()
                        setModalContent(
                          <DeleteSpecialPriceForm specialPrice={specialPrice}
                                                  disclosure={{isOpen, onOpen, onClose}}
                                                  fetchSpecialPrices={fetchSpecialPrices}
                          />)
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

      <ReactPaginate
        previousLabel={
          <i
            className="fa-solid fa-chevron-left"
            style={{fontSize: 18}}
          ></i>
        }
        nextLabel={
          <i
            className="fa-solid fa-chevron-right"
            style={{
              fontSize: 18
            }}
          ></i>
        }
        pageCount={totalPage}
        onPageChange={(page) => setPage(page.selected)}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <PageModalContent title={'Special Price'} modalContent={modalContent} disclosure={{isOpen, onOpen, onClose}}/>
      </Modal>
    </Box>
  );
}


function AddRoomUnavailabilityForm(props) {

  const [selectedPropeties, setSelectedProperties] = useState([])
  const [selectedRooms, setSelectedRooms] = useState([])

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        startDate: '',
        endDate: '',
        selectedRooms: [],
      },
      validationSchema: Yup.object().shape({
        startDate: Yup.string().required(),
        endDate: Yup.string().required(),
        selectedRooms: Yup.array().min(1),
      }),
      onSubmit: async (values) => {
        const url = `${process.env.REACT_APP_API_BASE_URL}/roomunavailalbility/add`
        try {
          const response = await axios.post(url, values)
          alert('success add room unavailalbility')
          props.fetchRoomUnavailability()
          props.disclosure.onClose()
        } catch (err) {
          alert(ERROR_MESSAGE)
        }
      }
    }
  )
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

  return (
    <>
      <ModalBody>
        <FormControl my={5}>
          <FormLabel>Properties</FormLabel>
          <Select2
            isMulti
            name={'properties'}
            options={props.propertyList}
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
      </ModalBody>
      <ModalFooter>
        <Button variant='outline' leftIcon={<i className="fa-solid fa-floppy-disk"></i>}
                onClick={formik.handleSubmit}
                disabled={!formik.isValid || !formik.dirty}
        >
          Save Room Unavailability
        </Button>
      </ModalFooter>
    </>
  )
}

function UpdateRoomUnavailabilityForm(props) {

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        startDate: new Date(props.roomUnavailability.startDate),
        endDate: new Date(props.roomUnavailability.endDate),
      },
      validationSchema: Yup.object().shape({
        startDate: Yup.string().required(),
        endDate: Yup.string().required(),
      }),
      onSubmit: async (values) => {
        values.id = props.roomUnavailability.id
        const url = `${process.env.REACT_APP_API_BASE_URL}/roomunavailalbility/update`
        try {

          const response = await axios.post(url, values)
          alert('success update room unavailalbility')
          props.fetchRoomUnavailability()
          props.disclosure.onClose()
        } catch (err) {
          alert(ERROR_MESSAGE)
        }
      }
    }
  )

  const types = [{value: 'nominal', label: 'Nominal (Rp.)'}, {value: 'percentage', label: 'Percentage (%)'}]

  return (
    <>
      <ModalBody>
        <Heading as={'h1'} size={'md'} mt={5} mb={3}>
          {props.roomUnavailability.Room.name}
        </Heading>
        <Heading as={'h2'} size={'sm'} mb={5}>
          {props.roomUnavailability.Room.Property.name}
        </Heading>

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
      </ModalBody>
      <ModalFooter>
        <Button variant='outline' leftIcon={<i className="fa-solid fa-floppy-disk"></i>}
                onClick={formik.handleSubmit}
                disabled={!formik.isValid || !formik.dirty}
        >
          Save Special Prices
        </Button>
      </ModalFooter>
    </>
  )
}

function DeleteRoomUnavailabilityForm(props) {
  return (
    <>
      <ModalBody>
        <Text mb={3}>Proceed to delete room unavailability for:</Text>
        <Table>
          <Tbody>
            <Tr>
              <Th>Room Name</Th>
              <Td>{props.roomUnavailability.Room.name}</Td>
            </Tr>
            <Tr>
              <Th>Property Name</Th>
              <Td>{props.roomUnavailability.Room.Property.name}</Td>
            </Tr>
            <Tr>
              <Th>Duration</Th>
              <Td>{new Date(props.roomUnavailability.startDate).toLocaleDateString('id')} - {new Date(props.roomUnavailability.endDate).toLocaleDateString('id')}</Td>
            </Tr>
          </Tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme={'red'} leftIcon={<i className="fa-solid fa-trash"></i>}
                onClick={async () => {
                  const url = `${process.env.REACT_APP_API_BASE_URL}/roomunavailalbility/delete`
                  try {
                    const result = await axios.post(url, {id: props.roomUnavailability.id})
                    props.fetchRoomUnavailability()
                    props.disclosure.onClose()
                  } catch (err) {
                    alert(ERROR_MESSAGE)
                  }
                }}
        >
          Delete
        </Button>
      </ModalFooter>
    </>
  )
}

function FilterRoomUnavailability(props) {
  const startDate = props.startDate ? props.startDate.toISOString().substring(0,10) : props.startDate
  const endDate = props.endDate ? props.endDate.toISOString().substring(0,10) : props.endDate
  return <>
    <Flex w="100%">
      <Box w="50%" mr={2}>
        <Text>Start date</Text>
        <Input
          size="md" type="date"
          onChange={props.handleChangeStartDate}
          defaultValue={startDate}
        />
      </Box>
      <Box w="50%">
        <Text>End date</Text>
        <Input
          size="md" type="date"
          onChange={props.handleChangeEndDate}
          min={new Date(props.startDate).toISOString().split('T')[0]}
          defaultValue={endDate}
        />
      </Box>
    </Flex>

    <FormControl my={5}>
      <FormLabel>Properties</FormLabel>
      <Select2
        isMulti
        name={"properties"}
        options={props.options.map(option => {
          return {value: option.id, label: option.name}
        })}
        onChange={props.handlePropertiesSelect}
      />
    </FormControl>
  </>;
}

function RoomAvailability(props) {
  const user = props.user

  const properties = props.properties

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [roomUnavailabilities, setRoomUnavailabilities] = useState([])

  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)

  const fetchRoomUnavailability = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/roomunavailalbility/all`
    const params = {uid: user.id}

    if (selectedPropertyId) params.propertyId = selectedPropertyId
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await axios.get(url, {params: params})

    setRoomUnavailabilities(response.data.result.roomUnavailabilities)
    setTotalPage(response.data.result.totalPage)
  }, [endDate, selectedPropertyId, startDate, user.id, page])


  useEffect(() => {
    if (user.id) fetchRoomUnavailability()
  }, [fetchRoomUnavailability, user])

  const {isOpen, onOpen, onClose} = useDisclosure()
  const [modalContent, setModalContent] = React.useState(null)

  const {isOpen: isOpenFilter, onToggle: onToggleFilter} = useDisclosure()
  
  return (
    <Box mt="20px">
      <Flex justifyContent={'space-between'} my={5}>
        <Button variant="primary" fontSize={"sm"} w={'0.3 vw'} leftIcon={<i className="fa-solid fa-plus"/>}
                onClick={() => {
                  const propertyList = properties.map(property => {
                    return {value: property.id, label: property.name}
                  })
                  setModalContent(
                    <AddRoomUnavailabilityForm propertyList={propertyList}
                                               disclosure={{isOpen, onOpen, onClose}}
                                               fetchRoomUnavailability={fetchRoomUnavailability}
                    />
                  )
                  onOpen()
                }}
        >
          Add New Room Unavailability
        </Button>

        <Button variant="secondary" fontSize={"sm"} w={'0.3 vw'} leftIcon={<i className="fa-solid fa-filter"/>}
                onClick={onToggleFilter}>
          Filter
        </Button>
      </Flex>

      <Collapse in={isOpenFilter} animateOpacity style={{overflow: 'visible'}}>
        <FilterRoomUnavailability
          startDate={startDate}
          endDate={endDate}
          handleChangeStartDate={(item) => setStartDate(item.target.valueAsDate)}
          handleChangeEndDate={(item) => setEndDate(item.target.valueAsDate)}
          options={properties}
          handlePropertiesSelect={selectedChoices => {
            setSelectedPropertyId(selectedChoices.map(choice => choice.value))
          }}
        />
      </Collapse>

      <TableContainer fontSize="12px" color="black" my="20px">
        <Table variant="simple">
          <Thead bg="rgba(217, 217, 217, 1)">
            <Tr>
              <Th>PROPERTY NAME</Th>
              <Th>ROOM UNAVAILABILITY</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              roomUnavailabilities.map(roomUnavailability => {
                return (
                  <Tr key={`roomUnavalailability-${roomUnavailability.id}`}>
                    <Td onClick={() => {
                      setModalContent(
                        <UpdateRoomUnavailabilityForm roomUnavailability={roomUnavailability}
                                                      disclosure={{isOpen, onOpen, onClose}}
                                                      fetchRoomUnavailability={fetchRoomUnavailability}
                        />
                      )
                      onOpen()
                    }} cursor={'pointer'} display={'flex'}>
                      <Box w="40px" h="30px" my={'auto'} mr={2} overflow="hiden">
                        <Image
                          h={'100%'}
                          objectFit="cover" src={Image1}
                          alt="room picture"
                        />
                      </Box>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm">
                          {roomUnavailability.Room.Property.name} - {roomUnavailability.Room.name}
                        </Text>
                        <Text fontWeight="reguler" fontSize="xs">
                          Last Modified: {new Date(roomUnavailability.updatedAt).toISOString().split('T')[0]}
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Text fontSize="12px" fontWeight="reguler">
                        Starts : {new Date(roomUnavailability.startDate).toLocaleDateString('id')}<br/>
                        Ends&emsp;: {new Date(roomUnavailability.endDate).toLocaleDateString('id')}
                      </Text>
                    </Td>
                    <Td>
                      <Button colorScheme={'red'} size={'sm'} onClick={() => {
                        onOpen()
                        setModalContent(
                          <DeleteRoomUnavailabilityForm roomUnavailability={roomUnavailability}
                                                        disclosure={{isOpen, onOpen, onClose}}
                                                        fetchRoomUnavailability={fetchRoomUnavailability}
                          />
                        )
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

      <ReactPaginate
        previousLabel={
          <i
            className="fa-solid fa-chevron-left"
            style={{fontSize: 18}}
          ></i>
        }
        nextLabel={
          <i
            className="fa-solid fa-chevron-right"
            style={{
              fontSize: 18
            }}
          ></i>
        }
        pageCount={totalPage}
        onPageChange={(page) => setPage(page.selected)}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <PageModalContent title={'Room Unavailability'} modalContent={modalContent}
                          disclosure={{isOpen, onOpen, onClose}}/>
      </Modal>
    </Box>
  );
}


function Price() {
  const user = useSelector(state => state.user)
  const history = useHistory()

  const [properties, setProperties] = useState([])

  const fetchProperties = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/property/all`
    const response = await axios.get(url, {params: {uid: user.id}})
    setProperties(response.data.result)
  }, [setProperties, user])

  useEffect(() => {
    if (user.id) fetchProperties()
  }, [fetchProperties, user])

  return (
    <Layout>
      <Box mt="80px">
        <Container maxW="1140px">
          <Text fontSize="20px" fontWeight="bold" mb="30px">
            Special Price / Room Unavailability
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
                Room Unavailability
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0px">
                <SpecialPrice user={user} properties={properties} history={history}/>
              </TabPanel>
              <TabPanel p="0px">
                <RoomAvailability user={user} properties={properties}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Layout>
  );
}

export default Price;
