import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Image,
  Center,
  Stack,
  Checkbox,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";

import Foto from "../../Assets/bookingHistory3.png";

function EditRoom() {
  return (
    <Layout>
      <Box mt="80px">
        <Container mt="100px" maxW="1140px">
          <Flex mb="10px" w="100%" mx="auto">
            <Link to="/tenant/room">
              <Button
                position="relative"
                borderRadius="0px"
                border="1px"
                borderColor="gray.200"
                bg="white"
                h="40px"
                me="20px"
                _hover={{
                  background: "black",
                  color: "white",
                  borderColor: "black",
                }}
              >
                <i className="fa-solid fa-caret-left"></i>
              </Button>
            </Link>

            <Text fontWeight="900" fontSize="20px" color="black" px="5px">
              Edit Room
            </Text>
          </Flex>
        </Container>
        <Container maxW="1140px">
          <Image
            src={Foto}
            alt="Room image"
            width="100%"
            height="210px"
            me="10px"
            mt="5px"
            mb="20px"
            overflow="hiden"
            objectFit="cover"
          />
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
            <Input type="name" placeholder="Name Room" borderRadius="0" />
          </FormControl>
          <FormControl pb="20px">
            <Input type="name" placeholder="Price" borderRadius="0" />
          </FormControl>
          <Text mb="10px"> Fasility:</Text>
          <Flex align="center" mb="20px">
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-wifi" />
              </Center>
              <Center>
                <Checkbox defaultChecked>wifi</Checkbox>
              </Center>
            </Stack>
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-box-archive" />
              </Center>
              <Center>
                <Checkbox defaultChecked>locker</Checkbox>
              </Center>
            </Stack>
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-utensils" />
              </Center>
              <Center>
                <Checkbox defaultChecked>menu</Checkbox>
              </Center>
            </Stack>
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-couch" />
              </Center>
              <Center>
                <Checkbox defaultChecked>sofa</Checkbox>
              </Center>
            </Stack>
          </Flex>
          <Textarea
            height="180px"
            mb="20px"
            borderRadius="0px"
            placeholder="Edit caption"
          />
          <Button variant="secondary" w="100%" mb="20px">
            Edit Photo
          </Button>
          <Button variant="primary" w="100%" mb="40px">
            Save
          </Button>
        </Container>
      </Box>
    </Layout>
  );
}

export default EditRoom;
