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
import Foto from "../../Assets/bookingHistory3.png";
import {useHistory} from "react-router-dom"
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios"
import { useEffect } from "react";

function CardRoomTenant(props) {
  console.log(props)
  let {id, name, defaultPrice, description , capacity, propertyId , Property,updateAt, createdAt} = props.roomData
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory()
  
  const date = createdAt.split("T")

  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(defaultPrice)

  //kirim ke halaman edit-room
  const handleBtnEdit = (id) => {
    // console.log(id);
    history.push(`/tenant/edit-room/${id}`)
  }

const deleteBtnHandler = () => {
  alert("berhasil")
  axios.post(`${process.env.REACT_APP_API_BASE_URL}/room/delete-room`,{
    id
  })
  .then((res) => {
    alert(res.data.message)
    props.setRandomNumber(Math.random())

    onClose()
  })
  .catch((err) => {
    console.log(err)
  })
}

  return (
    <Box borderBottom="1px" borderColor="gray.200" p="5px" mb="20px" pb="10px">
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Delete Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            are you sure want delete this room?
          </ModalBody>

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
    </Box>
  );
}

export default CardRoomTenant;
