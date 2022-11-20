import { Box, Flex, Button, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import Footer from "../../Components/Footer";
import NavbarMobile from "../../Components/NavbarMobile";

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
    <Box mb="60px">
      <Box bg="primary" w="100%" p="20px" color="white">
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
        <Box bg="white" border="1px" borderColor="gray.200" p="10px">
          <Text fontWeight="regular" fontSize="16px" color="black" px="10px">
            Rp. 625.000,00
          </Text>
        </Box>
      </Box>
      <Box bg="white" p="20px">
        <Text fontWeight="regular" fontSize="14px" color="black">
          Cara Pembayaran
        </Text>
        <Text fontWeight="regular" fontSize="14px" color="black">
          1. transfer uang ke rekening 9338838293
        </Text>
        <Text fontWeight="regular" fontSize="14px" color="black">
          2. simpan bukti pembayaran
        </Text>
        <Text fontWeight="regular" fontSize="14px" color="black">
          3. Upload bukti pembayran
        </Text>
      </Box>
      <Button mx="20px" variant="secondary">
        <Text
          fontWeight="regular"
          fontSize="14px"
          color="rgba(175, 175, 175, 1)"
        >
          Upload bukti pembayran
        </Text>
      </Button>
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
      <NavbarMobile />
    </Box>
  );
}

export default Payment;
