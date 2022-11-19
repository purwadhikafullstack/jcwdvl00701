import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

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
      <Flex boxShadow="md" px="20px" py="12px" justifyContent="space-between">
        <Box>
          <Text fontWeight="semibold" fontSize="16px">
            Rp. 600.000,00
          </Text>
          <Text
            fontWeight="regular"
            fontSize="12px"
            color="rgba(175, 175, 175, 1)"
          >
            12-16 Nov | 1 Guest
          </Text>
        </Box>
        <Button variant="primary" w="135px">
          Pay
        </Button>
      </Flex>

      <Box bg="primary" w="100%" p="20px" color="white">
        <Flex bg="white" color="black" mt="20px" p="10px">
          <Box me="10px">
            <i className="fa-solid fa-bed"></i>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="18px">
              {booking.name}
            </Text>
          </Box>
        </Flex>
        <Flex bg="white" color="black" p="10px" pt="0px">
          <Text fontWeight="regular" fontSize="14px" w="110px">
            Chek-in
          </Text>
          <Text fontWeight="regular" fontSize="14px" w="130px">
            Sun, {booking.start_date} Nov 2022 (14:00-22:00)
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
            Sun, {booking.end_date} Nov 2022 (00:00-12:00)
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
          (1x) {booking.roomName}
        </Text>
        <Text
          fontWeight="regular"
          fontSize="12px"
          bg="white"
          color="rgba(175, 175, 175, 1)"
          px="10px"
          pb="20px"
        >
          {booking.guest_count} Guests
        </Text>
      </Box>
    </Box>
  );
}

export default Booking;
