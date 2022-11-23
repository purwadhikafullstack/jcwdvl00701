import { Box, Flex, Button, Text, Image, Container } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import NavbarMobile from "../../Components/NavbarMobile";

import bookingImage from "../../Assets/image/booking.png";

import NavbarDestop from "../../Components/NavbarDestop";

function Booking() {
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
                    {booking[0].name}
                  </Text>
                </Box>
              </Flex>
              <Flex bg="white" color="black" p="10px" pt="0px">
                <Text fontWeight="regular" fontSize="14px" w="110px">
                  Chek-in
                </Text>
                <Text fontWeight="regular" fontSize="14px" w="130px">
                  Sun, {booking[0].start_date} Nov 2022 (14:00-22:00)
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
                  Sun, {booking[0].end_date} Nov 2022 (00:00-12:00)
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
                (1x) {booking[0].roomName}
              </Text>
              <Text
                fontWeight="regular"
                fontSize="12px"
                bg="white"
                color="rgba(175, 175, 175, 1)"
                px="10px"
                pb="20px"
              >
                {booking[0].guest_count} Guests
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
                    src={"https://bit.ly/dan-abramov"}
                    alt="Picture profile"
                  />
                </Box>
                <Box ms="10px">
                  <Text fontWeight="bold" fontSize="16px">
                    Kratos
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="16px"
                    color="rgba(175, 175, 175, 1)"
                  >
                    28 November 1820
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

            <Link to="/payment">
              <Button
                display={{ ss: "none", sm: "none", sl: "inline" }}
                variant="primary"
                w="100%"
              >
                Pay
              </Button>
            </Link>
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

      <Footer />
      <NavbarMobile />
    </Box>
  );
}

export default Booking;
