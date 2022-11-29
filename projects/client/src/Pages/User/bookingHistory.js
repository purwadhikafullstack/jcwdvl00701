import {
  Box,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Center,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Image1 from "../../Assets/bookingHistory1.png";
import Image2 from "../../Assets/bookingHistory2.png";
import Image3 from "../../Assets/bookingHistory3.png";
import Footer from "../../Components/Footer";

import NavbarDestop from "../../Components/NavbarDestop";
import NavbarMobile from "../../Components/NavbarMobile";
// import Footer from '../Components/Footer';

function BookingHistory() {
  const booking = [
    {
      pic: Image1,
      name: "Apartment in Jakarta",
      guest_count: 1,
      start_date: 18,
      end_date: 19,
      price: 800000,
      satatus: "ongoing",
      roomName: "room 2",
    },
    {
      pic: Image2,
      name: "Apartment in Bandung",
      guest_count: 1,
      start_date: 12,
      end_date: 14,
      price: 600000,
      satatus: "finished",
      roomName: "room 2",
    },
    {
      pic: Image3,
      name: "Apartment in Depok",
      guest_count: 2,
      start_date: 12,
      end_date: 15,
      price: 700000,
      satatus: "cancled",
      roomName: "room 2",
    },
    {
      pic: Image3,
      name: "Apartment in Depok",
      guest_count: 2,
      start_date: 12,
      end_date: 15,
      price: 700000,
      satatus: "cancled",
      roomName: "room 2",
    },
  ];
  const [bookingHis, setBookingHis] = useState(booking);

  function renderHistory() {
    return booking.map((val) => {
      if (val.satatus == "finished") {
        return (
          <Box border="1px" borderColor="gray.200">
            <Flex>
              <Box w="50%">
                <Image
                  w="100%"
                  h="120px"
                  overflow="hiden"
                  objectFit="cover"
                  src={val.pic}
                  alt="room picture"
                />
              </Box>
              <Box w="50%">
                <Box px="10px">
                  <Text fontWeight="Bold" fontSize="14px" pb="10px">
                    {val.name}
                  </Text>
                  <Text
                    fontWeight="reguler"
                    fontSize="12px"
                    pb="10px"
                    color="rgba(175, 175, 175, 1)"
                    borderBottom="1px"
                    borderColor="gray.200"
                  >
                    {val.start_date}-{val.end_date} Nov | {val.guest_count}
                    Guest
                  </Text>
                  <Text fontWeight="Bold" fontSize="14px">
                    Rp.{val.price},00
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Box>
              <Flex>
                <Button
                  variant="primary"
                  w="50%"
                  height="30px"
                  fontWeight="Bold"
                  fontSize="15px"
                >
                  Add Review
                </Button>
                <Box bg="rgba(12, 211, 140, 1)" w="50%">
                  <Center
                    color="white"
                    height="100%"
                    fontWeight="Bold"
                    fontSize="15px"
                  >
                    Finished
                  </Center>
                </Box>
              </Flex>
            </Box>
          </Box>
        );
      } else if (val.satatus == "cancled") {
        return (
          <Box border="1px" borderColor="gray.200">
            <Flex>
              <Box w="50%">
                <Image
                  w="100%"
                  h="120px"
                  overflow="hiden"
                  objectFit="cover"
                  src={val.pic}
                  alt="room picture"
                />
              </Box>
              <Box w="50%">
                <Box px="10px">
                  <Text fontWeight="Bold" fontSize="14px" pb="10px">
                    {val.name}
                  </Text>
                  <Text
                    fontWeight="reguler"
                    fontSize="12px"
                    pb="10px"
                    color="rgba(175, 175, 175, 1)"
                    borderBottom="1px"
                    borderColor="gray.200"
                  >
                    {val.start_date}-{val.end_date} Nov | {val.guest_count}
                    Guest
                  </Text>
                  <Text fontWeight="Bold" fontSize="14px">
                    Rp. {val.price},00
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Box>
              <Box>
                <Box bg="rgba(251, 38, 38, 1)" w="100%">
                  <Center
                    color="white"
                    height="30px"
                    fontWeight="Bold"
                    fontSize="15px"
                  >
                    Cancled
                  </Center>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      }
    });
  }

  function renderBooking() {
    return booking.map((val) => {
      if (val.satatus === "ongoing") {
        return (
          <Box bg="primary" w="100%" p="20px" color="white">
            <Container maxW="1140px" px={{ sm: "0px", sl: "15px" }}>
              <Flex
                direction={{ ss: "column", sm: "column", sl: "row" }}
                position="relative"
              >
                <Box
                  mb="20px"
                  w={{ ss: "100%", sm: "100%", sl: "750px" }}
                  me="20px"
                >
                  <Image
                    w="100%"
                    h={{ ss: "150px", sm: "150px", sl: "340px" }}
                    overflow="hiden"
                    objectFit="cover"
                    src={val.pic}
                    alt="room picture"
                  />
                  <Box
                    bg="rgba(45, 53, 249, 1)"
                    w="110px"
                    h="30px"
                    color="white"
                    position="absolute"
                    top={0}
                  >
                    <Text py="4px" px="25px" fontSize="15px">
                      {val.satatus}
                    </Text>
                  </Box>
                </Box>
                <Box w={{ ss: "100%", sm: "100%", sl: "360px" }}>
                  <Box
                    bg="white"
                    w="100%"
                    p="20px"
                    display={{ ss: "none", sm: "none", sl: "flex" }}
                  >
                    <Flex>
                      <Box boxSize="50px">
                        <Image
                          src={"https://bit.ly/dan-abramov"}
                          alt="foto profile"
                        />
                      </Box>
                      <Box ms="10px">
                        <Text
                          fontWeight="semibold"
                          fontSize="22px"
                          color="black"
                        >
                          Kratos
                        </Text>
                        <Text
                          fontWeight="regular"
                          fontSize="14px"
                          color="rgba(175, 175, 175, 1)"
                        >
                          28 November 1820
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
                        {val.name}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex bg="white" color="black" p="10px" pt="0px">
                    <Text fontWeight="regular" fontSize="14px" w="110px">
                      Chek-in
                    </Text>
                    <Text fontWeight="regular" fontSize="14px" w="130px">
                      Sun, {val.start_date} Nov 2022 (14:00-22:00)
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
                      Sun, {val.end_date} Nov 2022 (00:00-12:00)
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
                    (1x) {val.roomName}
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="12px"
                    bg="white"
                    color="rgba(175, 175, 175, 1)"
                    px="10px"
                    pb="20px"
                  >
                    {val.guest_count} Guests
                  </Text>
                </Box>
              </Flex>
            </Container>
          </Box>
        );
      }
    });
  }

  return (
    <Box
      w="100%"
      h="90px"
      mt={{ ss: "0px", sm: "0px", sl: "80px" }}
      mb={{ ss: "160px", sm: "160px", sl: "0px" }}
    >
      <NavbarDestop />
      <Box
        bg="white"
        w="100%"
        p="20px"
        display={{ ss: "flex", sm: "flex", sl: "none" }}
      >
        <Flex>
          <Box boxSize="50px">
            <Image src={"https://bit.ly/dan-abramov"} alt="Dan Abramov" />
          </Box>
          <Box ms="10px">
            <Text fontWeight="semibold" fontSize="22px">
              Kratos
            </Text>
            <Text
              fontWeight="regular"
              fontSize="14px"
              color="rgba(175, 175, 175, 1)"
            >
              28 November 1820
            </Text>
          </Box>
        </Flex>
      </Box>

      {renderBooking()}
      <Box bg="white" w="100%" py="30px" px="20px">
        <Container maxW="1140px" px={{ sm: "0px", sl: "15px" }}>
          <Text fontWeight="Bold" fontSize="22px" pb="20px">
            History Booking:
          </Text>
          <SimpleGrid minChildWidth="320px" spacing="30px">
            {renderHistory()}
          </SimpleGrid>
        </Container>
      </Box>

      <NavbarMobile />
    </Box>
  );
}

export default BookingHistory;
