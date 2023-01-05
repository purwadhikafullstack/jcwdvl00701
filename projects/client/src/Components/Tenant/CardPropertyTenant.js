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
    <Box borderBottom="1px" borderColor="gray.200" p="5px" mb="20px">
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
    </Box>
  );
}

export default CardPropertyTenant;
