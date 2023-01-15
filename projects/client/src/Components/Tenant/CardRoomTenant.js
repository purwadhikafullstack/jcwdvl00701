import {
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import Foto from "../../Assets/bookingHistory3.png";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";

function CardRoomTenant(props) {
  let {
    id,
    name,
    defaultPrice,
    description,
    capacity,
    propertyId,
    Property,
    updateAt,
    createdAt,
  } = props.roomData;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const date = createdAt.split("T");

  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(defaultPrice);

  //kirim ke halaman edit-room
  const handleBtnEdit = (id) => {
    history.push(`/tenant/edit-room/${id}`);
  };

  const deleteBtnHandler = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/room/delete-room`, {
        id,
      })
      .then((res) => {
        props.setRandomNumber(Math.random());
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Box
        borderBottom="1px"
        borderColor="gray.200"
        p="5px"
        mb="20px"
        pb="10px"
        display={{ ss: "block", sl: "none" }}
      >
        <Text fontSize="16px" fontWeight="bold">
          {Property.name}
        </Text>
        <Flex mb="10px">
          <Image
            src={process.env.REACT_APP_API_BASE_URL + Property.pic}
            alt="Room image"
            width="90px"
            height="60px"
            me="10px"
            mt="5px"
          />
          <Box>
            <Text fontSize="16px" fontWeight="reguler">
              {name}
            </Text>
            <Text color="rgba(175, 175, 175, 1)" fontSize="12">
              Modified: {date[0]}
            </Text>
          </Box>
          <Spacer />
          {/* ikon utk edit room */}
          <Tooltip label="Edit room" aria-label="A tooltip">
            <Box
              as="button"
              h="25px"
              w="25px"
              fontSize="12px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{
                bg: "black",
                color: "white",
              }}
              bg="primary"
              onClick={() => handleBtnEdit(id)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Box>
          </Tooltip>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Price: {price}/ per night</Text>
          {/* ikon utk delete */}
          <Tooltip label="Delete room" aria-label="A tooltip">
            <Box
              as="button"
              h="25px"
              w="25px"
              fontSize="12px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              color="white"
              _hover={{
                bg: "black",
              }}
              bg="rgba(251, 38, 38, 1)"
              onClick={onOpen}
            >
              <i className="fa-solid fa-trash-can"></i>
            </Box>
          </Tooltip>
        </Flex>
      </Box>
      <Box
        display={{ ss: "none", sm: "none", sl: "block" }}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Flex my="20px">
          <Box width="90px" me="20px">
            <Image
              src={process.env.REACT_APP_API_BASE_URL + Property.pic}
              alt="property image"
              width="90px"
              height="60px"
              overflow="hiden"
              objectFit="cover"
            />
          </Box>
          <HStack me="20px" w="300px">
            <Text fontSize="14px" fontWeight="reguler">
              {Property.name}
            </Text>
          </HStack>
          <HStack me="20px" w="150px">
            <Text fontSize="14px" fontWeight="reguler">
              {name}
            </Text>
          </HStack>
          <HStack me="20px" w="210px">
            <Text fontSize="14px" fontWeight="reguler">
              {price}
            </Text>
          </HStack>
          <HStack me="20px" w="150px">
            <Text fontSize="14px" fontWeight="reguler">
              {date[0]}
            </Text>
          </HStack>
          <HStack me="20px" w="80px">
            <Tooltip label="Edit Property" aria-label="A tooltip">
              <Box
                as="button"
                h="25px"
                w="25px"
                fontSize="12px"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                _hover={{
                  bg: "black",
                  color: "white",
                }}
                bg="primary"
                onClick={() => handleBtnEdit(id)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Box>
            </Tooltip>

            <Tooltip label="Delete Property" aria-label="A tooltip">
              <Box
                as="button"
                h="25px"
                w="25px"
                fontSize="12px"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                color="white"
                _hover={{
                  bg: "black",
                }}
                bg="rgba(251, 38, 38, 1)"
                onClick={onOpen}
              >
                <i className="fa-solid fa-trash-can"></i>
              </Box>
            </Tooltip>
          </HStack>
        </Flex>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader> Delete room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this room?</ModalBody>
          <ModalCloseButton />
          <ModalCloseButton />
          <ModalBody pb={6}>are you sure want delete this room?</ModalBody>

          <ModalFooter>
            <Button
              onClick={deleteBtnHandler}
              borderRadius={0}
              colorScheme="red"
              mr={3}
            >
              Delete
            </Button>
            <Button borderRadius={0} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardRoomTenant;
