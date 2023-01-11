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
  Alert,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function CardBookingHistory(props) {
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
    Review,
    randomNumber,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputReview, setInputReview] = useState("");
  const [msg, setMsg] = useState("");

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
    const angka = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let bulanNow = "";
    for (let i = 0; i < bln.length; i++) {
      // console.log(angka[i]);
      if (startDate2[1] == angka[i]) {
        return (bulanNow += bln[i]);
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

  const btnHandlerReview = () => {
    console.log("btn reservation :", id);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/history/add-review`, {
        comment: inputReview,
        reservationId: id,
      })
      .then((res) => {
        console.log(res.data.result);
        setMsg(res.data.message);
        randomNumber(Math.random());
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
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
          {/* <Flex> */}
          {Review ? (
            <Box bg="rgba(12, 211, 140, 1)" w="100%">
              <Center
                color="white"
                height="30px"
                fontWeight="Bold"
                fontSize="15px"
              >
                Finished
              </Center>
            </Box>
          ) : (
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
          )}
          {/* </Flex> */}
          {msg ? (
            <Alert status="info" color="green" text="center">
              <i class="fa-solid fa-check"></i>
              <Text ms="10px">{msg}</Text>
            </Alert>
          ) : null}
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
              onClick={btnHandlerReview}
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
