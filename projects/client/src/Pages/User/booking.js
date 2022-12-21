import { Box, Flex, Button, Text, Image, Container,Spinner,HStack,VStack} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../../Components/Layout";
import bookingImage from "../../Assets/image/booking.png";
import NavbarDestop from "../../Components/NavbarDestop";
import axios from "axios"
import { useParams } from "react-router-dom";

function Booking() {
  // akan menerima 1 id params utk get data, dari page detail/id
  // const {id} = useParams()
  const [dataBooking, setDataBooking] = useState({});
  const [dataRoom, setDataRoom] = useState({})
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [dataProfile, setDataProfile] = useState({})
  const [birthdate , setBirthdate] = useState("")
  let history = useHistory()

  useEffect(() => {
    setLoading(true)
      const fetchDataBooking = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reservation/get-reservation`, {
            // masih nembak sampai page mas imam beres
            params : {
              id : 2
            }
          })
          // console.log((await response)?.data.result);
          setDataBooking((await response)?.data.result)
          setDataRoom((await response)?.data.result.Room)
          setStartDate((await response)?.data.result.startDate)
          setEndDate((await response)?.data.result.endDate)
          setDataProfile((await response)?.data.result.User.Profile)
          setBirthdate((await response)?.data.result.User.Profile.birthdate)
  
        } catch (err) {
          console.error(err.data.message)
        }
      }
    fetchDataBooking()
    setLoading(false)
  }, [])

  let sDate = startDate.split("T")
  // console.log(sDate);
  let eDate = endDate.split("T")
  let bDate = birthdate.split("T")



  const btnHandlerPayment = (id) => {
    console.log(id);
    history.push(`/payment/${id}`)
  }

  let dataPrice = dataBooking?.finalPrice
  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(dataPrice)

  let dataTax = (dataBooking?.finalPrice / 10)
  const tax = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(dataTax)

  let dataTotalPrice = dataPrice + dataTax
  const totalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(dataTotalPrice)

    return loading ?
    <Flex justifyContent="center" mt="21%">
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
    : 
    <Layout>
      <Box
        mb={{ ss: "60px", sm: "60px", sl: "0px" }}
        mt={{ ss: "0px", sm: "0px", sl: "80px" }}
      >
        <NavbarDestop />
        <Flex
          display={{ ss: "flex", sm: "flex", sl: "none" }}
          px="20px"
          py="12px"
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Button
            borderRadius="0px"
            bg="white"
            border="1px"
            borderColor="gray.200"
            my="auto"
            _hover={{
              background: "black",
              color: "white",
            }}
          >
            <i className="fa-solid fa-caret-left"></i>
          </Button>
          <Box>
            <Text fontWeight="semibold" fontSize="16px">
              Rp. 625.000,00
            </Text>
            <Text
              fontWeight="regular"
              fontSize="12px"
              color="rgba(175, 175, 175, 1)"
            >
              12-16 Nov | 1 Guest
            </Text>
          </Box>
          <Link to="/payment">
            <Button variant="primary" w="135px">
              Pay
            </Button>
          </Link>
        </Flex>
        <Container maxW="1140px">
          <Flex
            mt="120px"
            mb="10px"
            w="100%"
            mx="auto"
            display={{ ss: "none", sm: "none", sl: "flex" }}
          >
            <Button
              position="relative"
              borderRadius="0px"
              border="1px"
              borderColor="gray.200"
              bg="white"
              h="40px"
              me="20px"
              _hover={{
                background: "black",
                color: "white",
                borderColor: "black",
              }}
            >
              <i className="fa-solid fa-caret-left"></i>
            </Button>

            <Text fontWeight="900" fontSize="36px" color="black" px="5px">
              Confirm Booking
            </Text>
          </Flex>
        </Container>
        {/* Navbar Destop */}
        <Container maxW="1140px" px={{ sm: "0px", sl: "15px" }}>
          <Flex w="100%" mb="40px">
            <Box w={{ ss: "100%", sm: "100%", sl: "420px" }}>
              <Box bg="primary" p="20px" color="white">
                <Flex bg="white" color="black" mt="20px" p="10px">
                  <Box me="10px">
                    <i className="fa-solid fa-bed"></i>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="18px">
                      {/* name property */}
                      {dataRoom?.Property?.name}
                    </Text>
                  </Box>
                </Flex>
                <Flex bg="white" color="black" p="10px" pt="0px">
                  <Text fontWeight="regular" fontSize="14px" w="110px">
                    Chek-in
                  </Text>
                  <Text fontWeight="regular" fontSize="14px" w="130px">
                    {sDate[0]}
                  </Text>
                </Flex>
                <Flex
                  bg="white"
                  color="black"
                  p="10px"
                  pt="0px"
                  borderBottom="1px"
                  borderColor="gray.200"
                >
                  <Text fontWeight="regular" fontSize="14px" w="110px">
                    Chek-out
                  </Text>
                  <Text fontWeight="regular" fontSize="14px" w="130px">
                    {eDate[0]}
                  </Text>
                </Flex>
                <Text
                  fontWeight="regular"
                  fontSize="14px"
                  bg="white"
                  color="black"
                  px="10px"
                  pt="10px"
                >
                  {/* name room */}
                  (1x) {dataRoom?.name}
                </Text>
                <Text
                  fontWeight="regular"
                  fontSize="12px"
                  bg="white"
                  color="rgba(175, 175, 175, 1)"
                  px="10px"
                  pb="20px"
                >
                  {/* jumlah tamu */}
                  {dataRoom?.capacity} Guests
                </Text>
              </Box>
              <Text fontWeight="Bold" fontSize="18px" p="20px" pb="5px">
                Contact Details
              </Text>
              <Box
                bg="white"
                p="15px"
                mx="20px"
                border="1px"
                borderColor="gray.200"
              >
                <Flex>
                  <Box boxSize="45px">
                    <Image
                      src={process.env.REACT_APP_API_BASE_URL + dataProfile?.profilePic}
                      alt="Picture profile"
                    />
                  </Box>
                  <Box ms="10px">
                    <Text fontWeight="bold" fontSize="16px">
                      {/* name user */}
                      {dataProfile?.name}
                    </Text>
                    <Text
                      fontWeight="regular"
                      fontSize="16px"
                      color="rgba(175, 175, 175, 1)"
                    >
                      {/* ulang tahun user */}
                      {bDate[0]}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Text fontWeight="Bold" fontSize="18px" p="20px" pb="5px">
                Price Details
              </Text>
              <Box
                bg="white"
                p="10px"
                mx="20px"
                mb="30px"
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
                      {/* total harga dari defaultPrice + taxes */}
                      {totalPrice}
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
                      {/* di isi final price*/}
                      {price}
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
                      {/* task persen dari fial price */}
                      {tax}
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Button
                display={{ ss: "none", sm: "none", sl: "inline" }}
                variant="primary"
                w="100%"
                onClick={() => btnHandlerPayment(dataBooking?.id)}
              >
                Pay
              </Button>
            </Box>

            <Box ms="20px" display={{ ss: "none", sm: "none", sl: "inline" }}>
              <Image
                w="100%"
                h="618px"
                overflow="hiden"
                objectFit="cover"
                src={process.env.REACT_APP_API_BASE_URL +  dataRoom?.Property?.pic}
              ></Image>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Layout>
}


export default Booking;
