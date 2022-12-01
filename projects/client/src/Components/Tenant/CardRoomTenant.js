import { Box, Image, Text, Flex, Spacer, Tooltip } from "@chakra-ui/react";
import Foto from "../../Assets/bookingHistory3.png";

function CardRoomTenant() {
  return (
    <Box borderBottom="1px" borderColor="gray.200" p="5px" mb="20px" pb="10px">
      <Text fontSize="16px" fontWeight="bold">
        Apartement in Jakarta Selatan
      </Text>
      <Flex mb="10px">
        <Image
          src={Foto}
          alt="Room image"
          width="90px"
          height="60px"
          me="10px"
          mt="5px"
        />
        <Box>
          <Text fontSize="16px" fontWeight="reguler">
            Room 1
          </Text>
          <Text color="rgba(175, 175, 175, 1)" fontSize="12">
            Modified: 32/13/2022
          </Text>
        </Box>
        <Spacer />
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
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Box>
        </Tooltip>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Price: Rp. 300.000,00/ per night</Text>
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
          >
            <i className="fa-solid fa-trash-can"></i>
          </Box>
        </Tooltip>
      </Flex>
    </Box>
  );
}

export default CardRoomTenant;
