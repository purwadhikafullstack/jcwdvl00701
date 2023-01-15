import {
  Box,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Center,
  Container,
  Input,
  FormControl,
  Select,
  Spacer,
  FormHelperText,
  Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner, Avatar
} from "@chakra-ui/react";
import {useState, useRef} from "react";
import {useHistory} from "react-router-dom";
import {useDisclosure} from "@chakra-ui/react";
import axios from "axios"

function CardBooking(props) {
  const {id, startDate, endDate, status, guestCount, userId, roomId, finalPrice, Room, User, randomNumber} = props
  const [fileSizeMsg, setFileSizeMsg] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [prove, setProve] = useState(false)
  const [err, setErr] = useState(false)
  const {isOpen: isPaymentOpen, onOpen: onPaymentOpen, onClose: onPaymentClose} = useDisclosure();
  const {isOpen: isCancelOpen, onOpen: onCancelOpen, onClose: onCancelClose} = useDisclosure();
  let history = useHistory()
  const inputFileRef = useRef(null)
  console.log(Room);
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
  let strStatus
  let color
  let size
  if (status === 1) {
    strStatus = "Waiting for Payment"
    color = "Orange"
    size = "200px"
  } else if (status === 2) {
    strStatus = "unconfirmed"
    color = "Gray"
    size = "150px"
  }

  let startDate2 = startDate.split("T")[0].split("-")
  // console.log(startDate2);
  let endDate2 = endDate.split("T")[0].split("-")

  const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sept", "Okt", "Nov", "Des"]
  const searchBulan = (bln) => {
    const angka = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    let bulanNow = ""
    for (let i = 0; i < bln.length; i++) {
      // console.log(angka[i]);
      if (startDate2[1] == angka[i]) {
        return bulanNow += bln[i]
      }
    }
  }
  let resultBulan = searchBulan(bulan)
  // console.log(resultBulan);

  const btnHandlerUpload = async () => {
    try {
      const formData = new FormData()

      formData.append("image", selectedFile)
      formData.append("reservationId", id)
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/payment/add-payment`, formData)
      console.log(response.data);
      randomNumber(Math.random())
      onPaymentClose()
      history.push("/booking-history")
    } catch (err) {
      console.error(err.message)
    }
  }

  const btnCanceled = () => {
    console.log(id);
    axios.patch(`${process.env.REACT_APP_API_BASE_URL}/history/cancel-history`, {
      id: id
    })
      .then((res) => {
        alert(res.data.message)
        randomNumber(Math.random())
        onCancelClose()
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
  return (
    <Box bg="primary" w="100%" p="20px" color="white">
      <Box bg={"white"} mb="5px" display={{sl: "none"}} h="70px">
        <Flex py={'auto'} ps={2} h={'100%'}>
          {/*<Box boxSize="50px" mt="2px" ms="1px">*/}
          {/*  <Image*/}
          {/*    src={process.env.REACT_APP_API_BASE_URL + User?.Profile?.profilePic}*/}
          {/*    alt="foto profile"*/}
          {/*    overflow="hidden"*/}
          {/*    objectFit="cover"*/}
          {/*  />*/}
          {/*</Box>*/}
          <Box boxSize="50px" my={'auto'}>
            <Avatar
              src={
                User?.Profile?.profilePic
                  ? process.env.REACT_APP_API_BASE_URL + User?.Profile?.profilePic
                  : ''
              }
              width="50px"
              height="50px"
              me="10px"
              objectFit="cover"
              borderRadius={0}
            />
          </Box>
          <Center ms="15px" mt="5px">
            <Text fontWeight="semibold" fontSize="22px" color={"black"}>
              {User?.Profile?.name}
            </Text>
          </Center>
        </Flex>

      </Box>
      <Container maxW="1140px" px={{sm: "0px", sl: "15px"}}>
        <Flex
          direction={{ss: "column", sm: "column", sl: "row"}}
          position="relative"
        >
          <Box
            mb="20px"
            w={{ss: "100%", sm: "100%", sl: "750px"}}
            me="20px"
          >
            <Image
              w="100%"
              h={{ss: "150px", sm: "150px", sl: "340px"}}
              overflow="hiden"
              objectFit="cover"
              // src={val.pic}
              src={process.env.REACT_APP_API_BASE_URL + Room?.Property?.pic}
              alt="room picture"
            />
            <Box
              bg={color}
              w={size}
              h="30px"
              color="white"
              position="absolute"
              top={0}
            >
              <Text py="4px" px="25px" fontSize="15px">
                {strStatus}
                {/* waiting for payment */}
              </Text>
            </Box>
          </Box>
          <Box w={{ss: "100%", sm: "100%", sl: "360px"}}>
            <Box
              bg="white"
              w="100%"
              p="14px"
              display={{ss: "none", sm: "none", sl: "flex"}}
            >
              <Flex>
                <Box boxSize="50px">
                  <Avatar
                    src={
                      User?.Profile?.profilePic
                        ? process.env.REACT_APP_API_BASE_URL + User?.Profile?.profilePic
                        : ''
                    }
                    width="50px"
                    height="50px"
                    me="10px"
                    objectFit="cover"
                    borderRadius={0}
                  />
                </Box>
                <Box ms="10px">
                  <Text
                    fontWeight="semibold"
                    fontSize="20px"
                    color="black"
                    mt={"10px"}
                  >
                    {User?.Profile?.name}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Flex bg="white" color="black" p="10px" w="100%" mt="20px">
              <Box me="10px">
                <i className="fa-solid fa-bed"></i>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="18px">
                  {Room?.Property?.name}
                </Text>
              </Box>
            </Flex>
            <Flex bg="white" color="black" p="10px" pt="0px">
              <Text fontWeight="regular" fontSize="14px" w="110px">
                Chek-in
              </Text>
              <Text fontWeight="regular" fontSize="14px" w="130px">
                {/* Sun, {val.start_date} Nov 2022 (14:00-22:00) */}
                {/* {startDate?.split("T")[0]} */}

                {startDate2[2]} {resultBulan} {startDate2[0]} (14:00-22:00)
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
                {/* Sun, {val.end_date} Nov 2022 (00:00-12:00) */}
                {/* {endDate?.split("T")[0]} */}
                {endDate2[2]} {resultBulan} {endDate2[0]} (00:00-12:00)
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
              (1x) {Room?.name}
            </Text>
            <Text
              fontWeight="regular"
              fontSize="12px"
              bg="white"
              color="rgba(175, 175, 175, 1)"
              px="10px"
              pb="10px"
            >
              {guestCount} Guests
            </Text>
            <Text
              fontWeight="regular"
              fontSize="12px"
              bg="white"
              color="black"
              px="10px"
              // pt="10px"
              pb="12px"
            >
              {Room?.Property?.Tenant?.Bank?.name} : {Room?.Property?.Tenant?.bankAccountNumber}
            </Text>
            <Flex direction={"column"}>
              <Flex justifyContent={"space-between"}>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpg"
                    ref={inputFileRef}
                    onChange={handleFile}
                    display={"none"}
                  />
                  {/* <FormHelperText color={"black"}>Max size : 1MB</FormHelperText> */}
                  <Button variant="secondary" w="100%" mt="10px" _hover={{bg: "black", color: "white"}}
                          onClick={() => inputFileRef.current.click()}>
                    <Text fontWeight="regular" fontSize="14px">
                      Upload Image
                    </Text>
                  </Button>
                </FormControl>

                {
                  selectedFile ?
                    <Button variant="secondary" w="100%" mt="10px" _hover={{bg: "black", color: "white"}}
                            onClick={onPaymentOpen}>
                      <Text fontWeight="regular" fontSize="14px">
                        Payment
                      </Text>
                    </Button>
                    :
                    <Button variant="secondary" w="100%" mt="10px" _hover={{bg: "black", color: "white"}}
                            disabled={"true"}>
                      <Text fontWeight="regular" fontSize="14px">
                        Payment
                      </Text>
                    </Button>
                }
                <Button variant="secondary" w="100%" mt="10px" bg="red.500" _hover={{bg: "red.700"}}
                        onClick={onCancelOpen}>
                  <Text fontWeight="regular" fontSize="14px">
                    Cancel
                  </Text>
                </Button>
              </Flex>
              {/* di simpan flex yg column agar posisi menyeluruh sampai samping */}
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
            </Flex>
          </Box>
        </Flex>
      </Container>
      {/* utk modal payment*/}
      <Modal closeOnOverlayClick={false} isOpen={isPaymentOpen} onClose={onPaymentClose}>
        <ModalOverlay/>
        <ModalContent borderRadius={0}>
          <ModalHeader>Are you sure to pay room?</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}></ModalBody>

          <ModalFooter>
            <Button
              // onClick={btnCanceled}
              onClick={btnHandlerUpload}
              borderRadius={0}
              colorScheme="green"
              mr={3}
            >
              Pay
            </Button>
            <Button borderRadius={0} onClick={onPaymentClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* utk modal canceled*/}
      <Modal closeOnOverlayClick={false} isOpen={isCancelOpen} onClose={onCancelClose}>
        <ModalOverlay/>
        <ModalContent borderRadius={0}>
          <ModalHeader>Are you sure to canceled room ?</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}></ModalBody>

          <ModalFooter>
            <Button
              onClick={btnCanceled}
              borderRadius={0}
              colorScheme="red"
              mr={3}
            >
              cancel
            </Button>
            <Button borderRadius={0} onClick={onCancelClose}>
              back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CardBooking