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
} from "@chakra-ui/react";
import { useState } from "react";

import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import NavbarDestop from "../../Components/NavbarDestop";
import bookingImage from "../../Assets/image/booking.png";

function Payment() {
  const bookingUser = [
    {
      pic: "Image1",
      name: "Apartment in Jakarta",
      guest_count: 1,
      start_date: 18,
      end_date: 19,
      price: 800000,
      satatus: "ongoing",
      roomName: "room 2",
    },
  ];

  const [booking, setBooking] = useState(bookingUser);

  return (
    <Layout>
      <Box
        mb={{ ss: "60px", sm: "60px", sl: "0px" }}
        mt={{ ss: "0px", sm: "0px", sl: "80px" }}
      >
        <NavbarDestop />
        <Container
          maxW="1140px"
          display={{ ss: "none", sm: "none", sl: "flex" }}
        >
          <Flex mt="40px" mb="10px" w="100%" mx="auto">
            <Link to="/booking">
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
            </Link>

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
                      {booking[0].name}
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
                  12-16 Nov | 1 Guest
                </Text>
                <Flex bg="white" border="1px" borderColor="gray.200">
                  <Link to="/booking">
                    <Button
                      display={{ ss: "inline", sm: "inline", sl: "none" }}
                      borderRadius="0px"
                      borderRight="1px"
                      borderColor="gray.200"
                      bg="white"
                      h="100%"
                      _hover={{
                        background: "black",
                        color: "white",
                        borderColor: "black",
                      }}
                    >
                      <i className="fa-solid fa-caret-left"></i>
                    </Button>
                  </Link>
                  <Box p="10px">
                    <Text
                      fontWeight="regular"
                      fontSize="16px"
                      color="black"
                      px="5px"
                    >
                      Rp. 625.000,00
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
                      transfer money according to the total price to BNI bank
                      with account number: 22222112121212
                    </ListItem>
                    <ListItem>save your proof of payment</ListItem>
                    <ListItem>
                      Upload your proof of payment to this page
                    </ListItem>
                  </OrderedList>
                </Box>
                <Button mx="20px" variant="secondary" w="305px">
                  <Text fontWeight="regular" fontSize="14px">
                    upload payment proof
                  </Text>
                </Button>
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
                        Rp.625.000,00
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
                        Rp.300.000,00
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
                        Rp.25.000,00
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
                src={bookingImage}
              ></Image>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Layout>
  );
}

export default Payment;
