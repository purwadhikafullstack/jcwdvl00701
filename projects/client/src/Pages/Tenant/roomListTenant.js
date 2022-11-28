import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
} from "@chakra-ui/react";
import CardRoomTenant from "../../Components/Tenant/CardRoomTenant";
import { Link } from "react-router-dom";

function RoomListTenant() {
  return (
    <Box mt="80px">
      <Container maxW="1140px">
        <Flex mb="20px" justifyContent="space-between">
          <Text fontSize="20px" fontWeight="bold">
            16 Rooms
          </Text>
          <Link to="/tenant/add-room">
            <Box
              as="button"
              h="40px"
              w="40px"
              fontSize="20px"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              _hover={{
                bg: "black",
                color: "white",
              }}
              bg="primary"
            >
              <i class="fa-solid fa-plus"></i>
            </Box>
          </Link>
        </Flex>
        <FormControl pb="20px">
          <Input type="name" placeholder="Search Room" borderRadius="0" />
        </FormControl>
        <CardRoomTenant />
        <CardRoomTenant />
        <CardRoomTenant />
        <CardRoomTenant />
        <CardRoomTenant />
        <CardRoomTenant />
        <CardRoomTenant />
      </Container>
    </Box>
  );
}

export default RoomListTenant;
