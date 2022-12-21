import {
  Box,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Center,
  Container,
  propNames,
} from "@chakra-ui/react";

function CardBooking(props) {
  return (
    <Box border="1px" borderColor="gray.200" bg="white" my="20px">
      <Flex>
        <Box w="50%">
          <Image
            w="100%"
            h="120px"
            overflow="hiden"
            objectFit="cover"
            src={process.env.REACT_APP_API_BASE_URL + props.pic}
            alt="room picture"
          />
          <Center
            color="white"
            height="30px"
            fontWeight="Bold"
            fontSize="15px"
            bg={
              props.status == 1
                ? "blue"
                : props.status == 2
                ? "yellow"
                : props.status == 3
                ? "red"
                : "white"
            }
          >
            {props.status == 1
              ? "ongoing"
              : props.status == 2
              ? "Finished"
              : props.status == 3
              ? "Cancled"
              : "tes"}
          </Center>
        </Box>
        <Box w="50%">
          <Box px="10px">
            <Text fontWeight="Bold" fontSize="14px" pb="5px">
              <i class="fa-solid fa-building"></i> : {props.name}
            </Text>
            <Text fontWeight="reguler" fontSize="14px" pb="5px">
              <i class="fa-solid fa-bed"></i> : {props.roomName}
            </Text>
            <Text fontWeight="reguler" fontSize="14px" pb="5px">
              <i class="fa-solid fa-circle-user"></i> : {props.user}
            </Text>
            <Text
              fontWeight="reguler"
              fontSize="12px"
              pb="10px"
              color="rgba(175, 175, 175, 1)"
              borderBottom="1px"
              borderColor="gray.200"
            >
              <i class="fa-solid fa-calendar-days"></i> : {props.start_date}-
              {props.end_date} Nov | {props.guest_count}
              Guest
            </Text>

            <Text fontWeight="Bold" fontSize="14px">
              Rp. {props.price},00
            </Text>
          </Box>
        </Box>
      </Flex>
      <Box>
        <Box>
          <Box bg="rgba(251, 38, 38, 1)" w="100%"></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CardBooking;
