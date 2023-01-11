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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

function CardPropertyTenant(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let history = useHistory();
  const date = props.propertyData.updatedAt.split("T");

  async function deleteBtnHandler() {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/property/delete/`, {
        old_img: props.propertyData.pic,
        id: props.propertyData.id,
      })
      .then(() => {
        history.push("/tenant/property");

        props.randomNumber(Math.random());
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  return (
    <>
      <Box
        borderBottom="1px"
        borderColor="gray.200"
        p="5px"
        mb="20px"
        display={{ ss: "block", sl: "none" }}
      >
        <Flex>
          <Image
            src={process.env.REACT_APP_API_BASE_URL + props.propertyData.pic}
            alt="property image"
            width={{ ss: "90px", sm: "70px", sl: "70px" }}
            height={{ ss: "60px", sm: "47px", sl: "47px" }}
            me="10px"
            overflow="hiden"
            objectFit="cover"
          />
          <Box>
            <Text fontSize="16px" fontWeight="bold">
              {props.propertyData.name}
            </Text>
            <Text color="rgba(175, 175, 175, 1)" fontSize="12">
              Modified: {date[0]}
            </Text>
          </Box>
          <Spacer />
          <Link to={`/tenant/edit-property/${props.propertyData.id}`}>
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
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Box>
            </Tooltip>
          </Link>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Number of rooms : {props.propertyData.rooms} Rooms</Text>
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
              src={process.env.REACT_APP_API_BASE_URL + props.propertyData.pic}
              alt="property image"
              width="90px"
              height="60px"
              overflow="hiden"
              objectFit="cover"
            />
          </Box>
          <HStack me="20px" w="300px">
            <Text fontSize="14px" fontWeight="reguler">
              {props.propertyData.name}
            </Text>
          </HStack>
          <HStack me="20px" w="280px">
            <Text fontSize="14px" fontWeight="reguler">
              {props.propertyData.Category.location}
            </Text>
          </HStack>
          <HStack me="20px" w="80px">
            <Text fontSize="14px" fontWeight="reguler">
              2
            </Text>
          </HStack>
          <HStack me="20px" w="110px">
            <Text fontSize="14px" fontWeight="reguler">
              {date[0]}
            </Text>
          </HStack>
          <HStack me="20px" w="120px">
            <Link to={`/tenant/edit-property/${props.propertyData.id}`}>
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
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Box>
              </Tooltip>
            </Link>
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
          <ModalHeader>
            Are you sure you want to delete this property?
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button
              onClick={() => deleteBtnHandler()}
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

export default CardPropertyTenant;
