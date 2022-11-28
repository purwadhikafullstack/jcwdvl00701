import {
  Box,
  Container,
  Flex,
  Button,
  Text,
  FormControl,
  Input,
} from "@chakra-ui/react";
import CardPropertyTenant from "../../Components/Tenant/CardPropertyTenant";
import { Link } from "react-router-dom";

function PropertyListTenant() {
  return (
    <Box mt="80px">
      <Container maxW="1140px">
        <Flex mb="20px" justifyContent="space-between">
          <Text fontSize="20px" fontWeight="bold">
            7 Properties
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
          <Input type="name" placeholder="Search Property" borderRadius="0" />
        </FormControl>
        {/* card property */}
        <CardPropertyTenant />
        <CardPropertyTenant />
        <CardPropertyTenant />
        <CardPropertyTenant />
        <CardPropertyTenant />
        <CardPropertyTenant />
        <CardPropertyTenant />
        <CardPropertyTenant />
      </Container>
    </Box>
  );
}

export default PropertyListTenant;
