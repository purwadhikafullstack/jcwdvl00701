import {
  Box,
  Container,
  Flex,
  IconButton,
  Text,
  FormControl,
  Input,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import CardPropertyTenant from "../../Components/Tenant/CardPropertyTenant";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";

function PropertyListTenant() {
  const [propertyData, setPropertyData] = useState([]);
  const tenantId = 1;
  const [randomNumber, setRandomNumber] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [alfabet, setAlfabet] = useState("");
  const [time, setTime] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // reender data property
  function renderPropertyList() {
    return propertyData.map((val) => {
      console.log(val.name);
      return (
        <CardPropertyTenant propertyData={val} randomNumber={setRandomNumber} />
      );
    });
  }

  function inputHandler(event) {
    console.log(event.target.value);
    const { value } = event.target;

    setKeyword(value);
  }

  function selectHandler(event) {
    console.log(event.target.value);
    const { value } = event.target;
    setAlfabet(value);
    setTime(value);
  }

  useEffect(() => {
    async function fetchProperty() {
      await axios(
        `${process.env.REACT_APP_API_BASE_URL}/property/get/${tenantId}?search_query=${keyword}&alfabet=${alfabet}&time=${time}`
      )
        .then((res) => {
          console.log(res.data);
          console.log(keyword);
          setPropertyData(res.data.result);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    fetchProperty();
  }, [randomNumber, keyword, time, alfabet]);
  return (
    <Layout>
      <Box mt="80px">
        <Container maxW="1140px">
          <Flex mb="20px" justifyContent="space-between">
            <Text fontSize="20px" fontWeight="bold">
              {/* {propertyData.length} Properties */}
            </Text>
            <Link to="/tenant/add-property">
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
            <HStack>
              <Input
                onChange={inputHandler}
                type="name"
                placeholder="Search Property"
                borderRadius="0"
                borderColor="rgba(175, 175, 175, 1)"
              />
              <IconButton
                onClick={onOpen}
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
          {/* card property */}
          {renderPropertyList()}
        </Container>
      </Box>
      {/* moddal */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Shory by:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} onChange={selectHandler} name="alfabet">
            <Select
              placeholder="short by name"
              borderRadius={0}
              onChange={selectHandler}
            >
              <option value="ASC">name: A-Z</option>
              <option value="DESC">name: Z-A</option>
            </Select>
          </ModalBody>
          <ModalBody pb={6} name="time">
            <Select
              placeholder="short by time"
              borderRadius={0}
              onChange={selectHandler}
            >
              <option value="DESC">Newest </option>
              <option value="ASC">Latest</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={selectHandler}
              variant="primary"
              borderRadius={0}
              colorScheme="red"
              mr={0}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

export default PropertyListTenant;
