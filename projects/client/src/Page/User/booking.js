import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";

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
    <Box>
      <Flex px="20px" py="12px" justifyContent="space-between">
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

      <Box bg="primary" w="100%" p="20px" color="white">
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
      <Box bg="white" p="15px" mx="20px" border="1px" borderColor="gray.200">
        <Flex>
          <Box boxSize="45px">
            <Image src={"https://bit.ly/dan-abramov"} alt="Picture profile" />
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

      <Footer />
    </Box>
  );
}

export default Booking;
