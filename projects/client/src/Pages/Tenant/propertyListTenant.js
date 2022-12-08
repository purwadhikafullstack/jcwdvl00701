import {
  Box,
  Container,
  Flex,
  IconButton,
  Text,
  FormControl,
  Input,
  HStack,
} from "@chakra-ui/react";
import CardPropertyTenant from "../../Components/Tenant/CardPropertyTenant";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";

function PropertyListTenant() {
  const [propertyData, setPropertyData] = useState([]);
  const tenantId = 1;
  const [randomNumber, setRandomNumber] = useState(0);

  // reender data property
  function renderPropertyList() {
    return propertyData.map((val) => {
      console.log(val.name);
      return (
        <CardPropertyTenant propertyData={val} randomNumber={setRandomNumber} />
      );
    });
  }

  useEffect(() => {
    async function fetchProperty() {
      await axios(
        `${process.env.REACT_APP_API_BASE_URL}/property/get/${tenantId}`
      )
        .then((res) => {
          console.log(res.data);
          setPropertyData(res.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    fetchProperty();
  }, [randomNumber]);
  return (
    <Layout>
      <Box mt="80px">
        <Container maxW="1140px">
          <Flex mb="20px" justifyContent="space-between">
            <Text fontSize="20px" fontWeight="bold">
              {propertyData.length} Properties
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
                type="name"
                placeholder="Search Property"
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
          {/* card property */}
          {renderPropertyList()}
        </Container>
      </Box>
    </Layout>
  );
}

export default PropertyListTenant;
