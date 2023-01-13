import {
  Box,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function CardBooking(props) {
  console.log(props);
  // console.log(props.name);
  const start = props.start_date.split("T");
  const end = props.end_date.split("T");
  // console.log(start[0]);
  // console.log(end[0]);
  let history = useHistory();
  const [status, setStatus] = useState(null);
  const {
    isOpen: isCancleOpen,
    onOpen: onCancleOpen,
    onClose: onCancleClose,
  } = useDisclosure();
  const {
    isOpen: isAcceptOpen,
    onOpen: onAcceptOpen,
    onClose: onAcceptClose,
  } = useDisclosure();
  const {
    isOpen: isRejectOpen,
    onOpen: onRejectOpen,
    onClose: onRejectClose,
  } = useDisclosure();
  const {
    isOpen: isPicOpen,
    onOpen: onPicOpen,
    onClose: onPicClose,
  } = useDisclosure();

  async function updateOrder(status) {
    await axios
      .patch(
        `${process.env.REACT_APP_API_BASE_URL}/report/update/${props.id}?status=${status}`
      )
      .then((res) => {
        onCancleClose();
        onAcceptClose();
        onRejectClose();
        props.randomNumber(Math.random());
        // akan menyimpan endpoint utk kirim email (data yg dikirim akan di buat fleksibel )
        if(status == 3){
          axios.post(`${process.env.REACT_APP_API_BASE_URL}/report/email-order`, {
            property : props.name,
            
            room : props.roomName,
            checkIn : start[0],
            checkOut : end[0],
            guest : props.guest_count,
            name: props.user,
            totalPrice : props.price,
            email : props.email,
            address : props.address,
            rules : props.rules
          })
          .catch((err) => {
            console.error(err)
          })
        }
        
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  return (
    <>
      <Box
        border="1px"
        borderColor="gray.200"
        bg="white"
        mt="10px"
        maxWidth="500px"
        boxShadow={{
          ss: "none",
          sm: "md",
          sl: "md",
        }}
      >
        <Flex>
          <Box w="50%" position="relative">
            <Image
              w="100%"
              h="165px"
              overflow="hiden"
              objectFit="cover"
              src={process.env.REACT_APP_API_BASE_URL + props.pic}
              alt="room picture"
            />
          </Box>
          <Box w="50%">
            <Box p="10px">
              <Text fontWeight="Bold" fontSize="14px" pb="5px">
                <i
                  className="fa-solid fa-building"
                  style={{ marginRight: "9px" }}
                ></i>
                : {props.name}
              </Text>
              <Text fontWeight="reguler" fontSize="14px" pb="5px">
                <i style={{ fontSize: "11px" }} className="fa-solid fa-bed"></i>{" "}
                : {props.roomName}
              </Text>
              <Text fontWeight="reguler" fontSize="14px" pb="5px">
                <i className="fa-solid fa-circle-user"></i> : {props.user}
              </Text>
              <Text
                fontWeight="reguler"
                fontSize="12px"
                pb="10px"
                color="rgba(175, 175, 175, 1)"
                borderColor="gray.200"
              >
                <i className="fa-solid fa-calendar-days"></i> : {start[0]}-
                {end[0]} Nov | {props.guest_count}
                Guest
              </Text>
            </Box>
          </Box>
        </Flex>
        <Flex>
          <Center
            w="50%"
            color="white"
            height="30px"
            fontWeight="Bold"
            fontSize="15px"
            bg={
              props.status == 1
                ? "Orange"
                : props.status == 2
                ? "Gray"
                : props.status == 3
                ? "blue"
                : props.status == 4
                ? "yellow.700"
                : props.status == 5
                ? "red"
                : "green"
            }
          >
            {props.status == 1
              ? "Waiting for payment"
              : props.status == 2
              ? "unconfirmed"
              : props.status == 3
              ? "processing"
              : props.status == 4
              ? "ongoing"
              : props.status == 5
              ? "cancled"
              : "finished"}
          </Center>
          <Box w="50%" px="10px">
            <Divider orientation="horizontal" />
            <Text fontWeight="Bold" fontSize="14px">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(props.price)}
            </Text>
          </Box>
        </Flex>
      </Box>
      {props.status === 1 ? (
        <>
          <Button
            bg="white"
            color="rgba(251, 38, 38, 1)"
            border="1px"
            borderColor="rgba(251, 38, 38, 1)"
            mt="10px"
            fontSize="12px"
            borderRadius="0px"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            _hover={{
              bg: "rgba(251, 38, 38, 1)",
              color: "white",
            }}
            onClick={onCancleOpen}
          >
            <Text>cancel order</Text>
          </Button>
        </>
      ) : props.status === 2 ? (
        <>
          <Flex maxWidth="500px">
            <Button
              me="5px"
              bg="primary"
              color="black"
              mt="10px"
              fontSize="12px"
              borderRadius="0px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{
                bg: "black",
                color: "white",
              }}
              onClick={onAcceptOpen}
            >
              Accept Order
            </Button>
            <Button
              bg="white"
              color="rgba(251, 38, 38, 1)"
              border="1px"
              borderColor="rgba(251, 38, 38, 1)"
              mt="10px"
              fontSize="12px"
              borderRadius="0px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{
                bg: "rgba(251, 38, 38, 1)",
                color: "white",
              }}
              onClick={onRejectOpen}
            >
              <Text>Reject Order</Text>
            </Button>
            <Spacer />
            <Box
              color="white"
              mt="10px"
              as="button"
              h="40px"
              w="35px"
              fontSize="16px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{
                bg: "black",
                color: "white",
              }}
              bg="grey"
              onClick={onPicOpen}
            >
              <i className="fa-solid fa-file-invoice"></i>
            </Box>
          </Flex>
        </>
      ) : null}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isCancleOpen}
        onClose={onCancleClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>cancle order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to cancle this order?</ModalBody>

          <ModalFooter>
            <Button
              onClick={() => updateOrder(5)}
              borderRadius={0}
              colorScheme="red"
              mr={3}
            >
              reject
            </Button>
            <Button borderRadius={0} onClick={onCancleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* //////////// */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isAcceptOpen}
        onClose={onAcceptClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader> Accept order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to accept this order?</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => updateOrder(3)}
              borderRadius={0}
              colorScheme="green"
              mr={3}
            >
              Accept
            </Button>
            <Button borderRadius={0} onClick={onAcceptClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* //////////// */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isRejectOpen}
        onClose={onRejectClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Reject order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to reject this order?</ModalBody>

          <ModalFooter>
            <Button
              onClick={() => updateOrder(1)}
              borderRadius={0}
              colorScheme="red"
              mr={3}
            >
              Reject
            </Button>
            <Button borderRadius={0} onClick={onRejectClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* //////////// */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isPicOpen}
        onClose={onPicClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalBody>
            <Image
              src={process.env.REACT_APP_API_BASE_URL + props.paymentProof}
              alt="paymentProof"
              width="100%"
              height="60px"
              overflow="hiden"
              objectFit="cover"
            />
          </ModalBody>
          <ModalCloseButton />

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardBooking;
