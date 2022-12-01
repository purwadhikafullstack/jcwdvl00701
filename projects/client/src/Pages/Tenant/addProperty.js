import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";

function AddProperty() {
  return (
    <Layout>
      <Box mt="80px">
        <Container mt="100px" maxW="1140px">
          <Flex mb="10px" w="100%" mx="auto">
            <Link to="/tenant/property">
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
              Add New Property
            </Text>
          </Flex>
        </Container>
        <Container maxW="1140px">
          <Image
            src={"/Assets/add_photo.png"}
            alt="Room image"
            width="100%"
            height="210px"
            me="10px"
            mt="5px"
            mb="20px"
          />
          <FormControl pb="20px">
            <Input type="name" placeholder="Name Property" borderRadius="0" />
          </FormControl>
          <FormControl pb="20px">
            <Input type="name" placeholder="Search Property" borderRadius="0" />
          </FormControl>
          <Button variant="secondary" w="100%" mb="20px">
            Add Photo
          </Button>
          <Button variant="primary" w="100%" mb="40px">
            Save
          </Button>
        </Container>
      </Box>
    </Layout>
  );
}

export default AddProperty;
