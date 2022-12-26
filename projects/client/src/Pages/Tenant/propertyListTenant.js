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
import ReactPaginate from "react-paginate";
import "../../Style/pagination.css";
import { useSelector } from "react-redux";

function PropertyListTenant() {
  const [propertyData, setPropertyData] = useState([]);

  const [randomNumber, setRandomNumber] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [alfabet, setAlfabet] = useState("");
  const [time, setTime] = useState("");

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { TenantId, firebaseProviderId, emailVerified } = useSelector(
    (state) => state.user
  );
  console.log(TenantId);

  // reender data property
  function renderPropertyList() {
    return propertyData.map((val) => {
      return (
        <CardPropertyTenant propertyData={val} randomNumber={setRandomNumber} />
      );
    });
  }

  function inputHandler(event) {
    const tes = setTimeout(() => {
      console.log(event.target.value);
      const { value } = event.target;

      setKeyword(value);
    }, 2000);
  }

  function selectHandler(event, field) {
    const { value } = event.target;
    if (field === "name") {
      setAlfabet(value);
    } else if (field === "time") {
      setTime(value);
    }
  }

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  async function fetchProperty() {
    await axios(
      `${process.env.REACT_APP_API_BASE_URL}/property/get/${TenantId}?search_query=${keyword}&alfabet=${alfabet}&time=${time}&page=${page}&limit=${limit}`
    )
      .then((res) => {
        console.log("GET DATA");

        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
        setPropertyData(res.data.result.rows);
        onClose();
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
  useEffect(() => {
    fetchProperty();
  }, [randomNumber, keyword, page, TenantId]);
  return (
    <Layout>
      <Box mt="80px">
        <Container maxW="1140px">
          <Flex mb="20px" justifyContent="space-between">
            <Text fontSize="20px" fontWeight="bold">
              {rows > 1 ? `${rows} Properties` : `${rows} property`}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 20,
              boxSizing: "border-box",
              width: "100%",
              height: "100%",
            }}
          >
            <ReactPaginate
              previousLabel={
                <i
                  class="fa-solid fa-chevron-left"
                  style={{
                    fontSize: 18,
                    height: 40,
                    width: 40,
                    position: "absolute",
                    left: "11px",
                    top: "11px",
                  }}
                ></i>
              }
              nextLabel={
                <i
                  class="fa-solid fa-chevron-right"
                  style={{
                    fontSize: 18,
                    height: 40,
                    width: 40,
                    position: "absolute",
                    left: "11px",
                    top: "11px",
                  }}
                ></i>
              }
              pageCount={pages}
              onPageChange={changePage}
              activeClassName={"item active "}
              breakClassName={"item break-me "}
              breakLabel={"..."}
              containerClassName={"pagination"}
              disabledClassName={"disabled-page"}
              marginPagesDisplayed={2}
              nextClassName={"item next "}
              pageClassName={"item pagination-page "}
              pageRangeDisplayed={2}
              previousClassName={"item previous"}
            />
          </div>
        </Container>
      </Box>
      {/* moddal */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Shory by:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Select
              placeholder="short by name"
              borderRadius={0}
              onClick={(e) => selectHandler(e, "name")}
            >
              <option value="ASC">name: A-Z</option>
              <option value="DESC">name: Z-A</option>
            </Select>
          </ModalBody>
          <ModalBody pb={6} name="time">
            <Select
              placeholder="short by time"
              borderRadius={0}
              onClick={(e) => selectHandler(e, "time")}
            >
              <option value="DESC">Newest </option>
              <option value="ASC">Latest</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={fetchProperty}
              variant="primary"
              borderRadius={0}
              colorScheme="red"
              mr={0}
              w="100%"
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
