import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  HStack,
  IconButton,
  Select,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import CardRoomTenant from "../../Components/Tenant/CardRoomTenant";
import { Link } from "react-router-dom";

function RoomListTenant() {
  return (
    <Layout>
      <Box mt="90px" mb="30px">
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
          <Select
            mb="20px"
            placeholder="Select Property"
            borderRadius={0}
            borderColor="rgba(175, 175, 175, 1)"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <FormControl pb="20px">
            <HStack>
              <Input
                type="name"
                placeholder="Search Room"
                borderRadius="0"
                borderColor="rgba(175, 175, 175, 1)"
              />
              <IconButton
                color="rgba(175, 175, 175, 1)"
                aria-label="toggle filters"
                icon={<i className="fa-solid fa-filter" />}
                backgroundColor="white"
                border="1px"
                borderRadius={0}
                m={2}
                _hover={{
                  bg: "black",
                  color: "white",
                }}
              />
            </HStack>
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
    </Layout>
  );
}

export default RoomListTenant;
