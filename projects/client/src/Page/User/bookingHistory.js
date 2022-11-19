import {
  Box,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Image1 from "../../Assets/bookingHistory1.png";
import Image2 from "../../Assets/bookingHistory2.png";
import Image3 from "../../Assets/bookingHistory3.png";
import Footer from "../../Components/Footer";
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
  ];
  const [bookingHis, setBookingHis] = useState(booking);

  function renderHistory() {
    return booking.map((val) => {
      if (val.satatus == "finished") {
        return (
          <Box border="1px" borderColor="gray.200">
            <Flex>
              <Box w="50%">
                <Image objectFit="cover" src={val.pic} alt="room picture" />
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
                <Image objectFit="cover" src={val.pic} alt="room picture" />
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
            <Box
              backgroundImage={val.pic}
              backgroundPosition="cover"
              backgroundRepeat="no-repeat"
              height="130px"
            >
              <Box bg="rgba(45, 53, 249, 1)" w="110px" h="30px" color="white">
                <Text py="4px" px="25px" fontSize="15px">
                  {val.satatus}
                </Text>
              </Box>
            </Box>
            <Flex bg="white" color="black" mt="20px" p="10px">
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
        );
      }
    });
  }

  return (
    <Box w="100%" h="90px">
      <Box
        bg="white"
        w="100%"
        p="20px"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Flex>
          <Box boxSize="50px">
            <Image src={"https://bit.ly/dan-abramov"} alt="profile picture" />
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
        <Text fontWeight="Bold" fontSize="22px" pb="20px">
          History Booking:
        </Text>
        <SimpleGrid columns={[1]} spacing="40px">
          {renderHistory()}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
}

export default BookingHistory;
