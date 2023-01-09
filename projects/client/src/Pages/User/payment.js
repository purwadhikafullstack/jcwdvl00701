import {
  Box,
  Flex,
  Button,
  Text,
  OrderedList,
  ListItem,
  useMediaQuery,
  Container,
  Image,
  FormControl,
  Input,
  FormHelperText,
  Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  HStack
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import Layout from "../../Components/Layout";
import { Link, useHistory, useParams } from "react-router-dom";
import bookingImage from "../../Assets/image/booking.png";
import axios from "axios"
import { useDisclosure } from "@chakra-ui/react";

function Payment() {
  const [dataPayment, setDataPayment] = useState({})
  const [dataTenant , setDataTenant] = useState({})
  const [dataProperty, setDataProperty] = useState({})
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const {id} = useParams()
  const inputFileRef = useRef(null)
  const [fileSizeMsg, setFileSizeMsg] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [prove, setProve] = useState(false)
  const [err, setErr] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  let history = useHistory()
  const [loading, setLoading] = useState(true)
  
  const handleFile = (event) => {
    if (event.target.files[0].size / 1024 > 1024) {
      setFileSizeMsg("File size is greater than maximum limit");
      setProve(false)
      setErr(true)
    } else {
      setSelectedFile(event.target.files[0]);
      setProve(true)
      setErr(false)
    }
  };

  const sDate = startDate.split("T")
  const sDate2 = sDate[0].split("-")
  
  const eDate = endDate.split("T")
  const eDate2 = eDate[0].split("-")
  
  const bulan = ["Januari", "Februari", "Maret", "April" ,"Mei" , "Juni" , "Juli" , "Agustus" , "September" , "Oktober", "November", "Desember"]
  const searchBulan = (bln) => {
    const angka = ["01","02","03","04","05","06","07","08","09","10","11","12"]
    let bulanNow = ""
    for (let i = 0; i < bln.length; i++) {
      if(sDate2[1] == angka[i]){

        return bulanNow += bln[i]
      }
    }
  }
  let resultBulan = searchBulan(bulan)
  console.log(resultBulan);

  let price = dataPayment?.finalPrice
  const priceRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price)

  let tax = price/ 10
  const taxRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(tax)

  let finalPrice = price + tax
  // console.log(finalPrice);

  const finalPriceRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(finalPrice)


  useEffect(() => {
    setLoading(true)
    const fetchDataPayment = async() => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/payment/get-payment` , {
          // params nya reservation id
          params: {
            id : id
          }
        })
  
        // console.log(response?.data?.result)
        setDataPayment(response?.data?.result)
        setDataTenant(response?.data?.result.User.Tenant)
        setDataProperty(response?.data?.result.Room.Property)
        setStartDate(response?.data?.result.startDate)
        setEndDate(response?.data?.result.endDate)
      } catch (err) {
        console.error(err.message)
      }
    }

    fetchDataPayment()
    setLoading(false)
  }, [id])

  const btnHandlerUpload = async () => {
    try {
      const formData = new FormData()

    formData.append("image", selectedFile)
    formData.append("reservationId", id)
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/payment/add-payment`, formData)
    console.log(response.data);
    onClose()
    history.push("/booking-history")
    } catch (err) {
      console.error(err.message)
    }
  }

  return loading ?
  <Flex justifyContent="center" mt="24%">
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='yellow.500'
        size='xl'
      />
    </Flex>
  :
  <Layout>
      <Box
        mb={{ ss: "60px", sm: "60px", sl: "0px" }}
        mt={{ ss: "0px", sm: "0px", sl: "80px" }}
      >
        <Container
          maxW="1140px"
          display={{ ss: "none", sm: "none", sl: "flex" }}
        >
          <Flex mt="40px" mb="10px" w="100%" mx="auto">
            <Text fontWeight="900" fontSize="36px" color="black" px="5px">
              Payment
            </Text>
          </Flex>
        </Container>

        <Container maxW="1140px" px={{ sm: "0px", sl: "15px" }} mb="40px">
          <Flex>
            <Box w={{ ss: "100%", sm: "100%", sl: "350px" }}>
              <Box bg="primary" w="100%" p="20px">
                <Flex bg="white" color="black" px="10px" pt="10px">
                  <Box me="10px">
                    <i className="fa-solid fa-bed"></i>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="18px">
                      {dataProperty?.name}
                    </Text>
                  </Box>
                </Flex>

                <Text
                  fontWeight="regular"
                  fontSize="14px"
                  bg="white"
                  color="rgba(175, 175, 175, 1)"
                  px="10px"
                >
                  {sDate2[2]}-{eDate2[2]} {resultBulan} | {dataPayment?.guestCount} Guest
                </Text>
                <Flex bg="white" border="1px" borderColor="gray.200">
                  <Box p="10px">
                    <Text
                      fontWeight="regular"
                      fontSize="16px"
                      color="black"
                      px="5px"
                    >
                      {/* final price + tax */}
                      {finalPriceRupiah}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Box bg="white" p="20px">
                  <Text fontWeight="regular" fontSize="16px" color="black">
                    payment steps
                  </Text>
                  <OrderedList
                    fontSize="14px"
                    ps="10px"
                    color="rgba(17, 17, 17, 0.6)"
                  >
                    <ListItem>
                      transfer money according to the total price to {dataTenant?.Bank?.name} with account number: {dataTenant?.bankAccountNumber}
                    </ListItem>
                    <ListItem>save your proof of payment</ListItem>
                    <ListItem>
                      Upload your proof of payment to this page
                    </ListItem>
                  </OrderedList>
                </Box>
                <Flex direction={"column"} justifyContent="center" alignItems={"center"}>
                  <FormControl>
                    <FormHelperText ms="22px">Max size : 1MB</FormHelperText>
                    <Flex direction={"column"} alignItems={"center"} >
                      <Input
                      type="file"
                      accept="image/png, image/jpg"
                      ref={inputFileRef}
                      onChange={handleFile}
                      display={"none"}
                      />
                      <Button mx="20px" variant="secondary" w="305px" onClick={() => inputFileRef.current.click()}>
                        <Text fontWeight="regular" fontSize="14px">
                          upload image
                        </Text>
                      </Button>

                    </Flex>
                        {err ? 
                          (
                            <Alert status="error" color="red" text="center">
                              <i className="fa-solid fa-circle-exclamation"></i>
                              <Text ms="10px">{fileSizeMsg}</Text>
                            </Alert>
                          ) 
                          : 
                          null
                        }

                          {prove ? 
                          (
                            <Alert status="info" color="green" text="center">
                              <i class="fa-solid fa-check"></i>
                              <Text ms="10px">image uploaded</Text>
                            </Alert>
                          )
                          :
                          null
                      }
                      </FormControl>
                    

                  {
                    selectedFile ? 
                  <Button mx="20px" mt="20px" variant="secondary" w="305px" onClick={onOpen}>
                      <Text fontWeight="regular" fontSize="14px">
                        upload payment proof
                      </Text>
                    </Button>
                    :
                    <Button mx="20px" mt="20px" variant="secondary" w="305px" disabled="true">
                      <Text fontWeight="regular" fontSize="14px">
                        upload payment proof
                      </Text>
                    </Button>
                  }
                </Flex>
                <Text fontWeight="Bold" fontSize="18px" p="20px" pb="5px">
                  Price Details
                </Text>
                <Box
                  bg="white"
                  p="10px"
                  mx="20px"
                  mb="100px"
                  border="1px"
                  borderColor="gray.200"
                >
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text fontWeight="Bold" fontSize="14px">
                        Total Price:
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="Bold" fontSize="14px">
                        {/* final price + tax */}
                        {finalPriceRupiah}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text fontWeight="reguler" fontSize="12px">
                        Price:
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="reguler" fontSize="12px">
                        {/* price */}
                        {priceRupiah}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text fontWeight="reguler" fontSize="12px">
                        Taxes and fees:
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight="reguler" fontSize="12px">
                        {/* tax */}
                        {taxRupiah}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Box ms="20px" display={{ ss: "none", sm: "none", sl: "inline" }}>
              <Image
                w="100%"
                h="618px"
                overflow="hiden"
                objectFit="cover"
                src={ process.env.REACT_APP_API_BASE_URL + dataProperty?.pic}
              ></Image>
            </Box>
          </Flex>
        </Container>
      </Box>
      {/* utk modal sebelum pay*/}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Are you sure to pay room ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>

          <ModalFooter>
            <Button
              onClick={btnHandlerUpload}
              borderRadius={0}
              colorScheme="red"
              mr={3}
            >
              pay
            </Button>
            <Button borderRadius={0} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
}

export default Payment;
