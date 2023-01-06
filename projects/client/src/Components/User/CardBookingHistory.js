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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

function CardBookingHistory(props) {
  // console.log(props.dataBooking);
  const {
    id,
    startDate,
    endDate,
    status,
    guestCount,
    userId,
    roomId,
    finalPrice,
    Room,
    User,
  } = props.dataBooking;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputReview, setInputReview] = useState("");

  let strStatus;
  let color;
  if (status === 1) {
    strStatus = "Waiting for Payment";
    color = "Orange";
  } else if (status === 2) {
    strStatus = "unconfirmed";
    color = "Gray";
  } else if (status === 3) {
    strStatus = "accepted";
    color = "green.500";
  } else if (status === 4) {
    strStatus = "ongoing";
    color = "yellow.700";
  } else if (status === 5) {
    strStatus = "canceled";
    color = "red.500";
  }

  let startDate2 = startDate.split("T")[0].split("-");
  // console.log(startDate2);
  let endDate2 = endDate.split("T")[0].split("-");

  const finalPriceRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(finalPrice);

  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agus",
    "Sept",
    "Okt",
    "Nov",
    "Des",
  ];
  const searchBulan = (bln) => {
    const angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let bulanNow = "";
    for (let i = 0; i < bln.length; i++) {
      if (startDate2[1] == angka[i + 1]) {
        return (bulanNow += bln[i + 1]);
      }
    }
  };
  let resultBulan = searchBulan(bulan);
  // console.log(resultBulan);

  const inputHandlerReview = (e, field) => {
    const { value } = e.target;
    console.log(value);
    if (field === "review") {
      setInputReview(value);
    }
  };
  return (
    <Box border="1px" borderColor="gray.200">
      <Flex>
        <Box w="50%">
          <Image
            w="100%"
            h="120px"
            overflow="hiden"
            objectFit="cover"
            // src={val.pic}
            src={process.env.REACT_APP_API_BASE_URL + Room?.Property.pic}
            alt="room picture"
          />
        </Box>
        <Box w="50%">
          <Box px="10px">
            <Text fontWeight="Bold" fontSize="14px" pb="10px">
              {/* {val.name} */}
              {Room?.Property?.name}
            </Text>
            <Text fontWeight="Bold" fontSize="14px" pb="10px">
              {/* {val.name} */}
              {Room?.name}
            </Text>
            <Text
              fontWeight="reguler"
              fontSize="12px"
              pb="10px"
              color="rgba(175, 175, 175, 1)"
              borderBottom="1px"
              borderColor="gray.200"
            >
              {startDate2[2]}-{endDate2[2]} {resultBulan} | {guestCount} Guest
              {/* Guest */}
            </Text>
            <Text fontWeight="Bold" fontSize="14px">
              {/* Rp.{val.price},00 */}
              {finalPriceRupiah}
            </Text>
          </Box>
        </Box>
      </Flex>
      {status === 6 ? (
        <Box>
          <Flex>
            <Button
              variant="primary"
              w="50%"
              height="30px"
              fontWeight="Bold"
              fontSize="15px"
              onClick={onOpen}
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
      ) : (
        <Box>
          <Box>
            <Box bg={color} w="100%">
              <Center
                color="white"
                height="30px"
                fontWeight="Bold"
                fontSize="15px"
              >
                {strStatus}
              </Center>
            </Box>
          </Box>
        </Box>
      )}
      {/* utk modal add review*/}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader> insert your review </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea onChange={(e) => inputHandlerReview(e, "review")} />
          </ModalBody>

          <ModalFooter>
            <Button
              // onClick={btnCanceled}
              borderRadius={0}
              colorScheme="green"
              mr={3}
            >
              Save
            </Button>
            <Button borderRadius={0} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CardBookingHistory;
