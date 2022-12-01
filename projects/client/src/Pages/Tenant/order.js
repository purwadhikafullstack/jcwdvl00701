import {
  Box,
  Container,
  Text,
  Input,
  FormControl,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  Select,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import CardBooking from "../../Components/Tenant/CardBooking";
import Image3 from "../../Assets/bookingHistory3.png";

function Order() {
  return (
    <Layout>
      <Box mt="70px">
        <Container maxW="1140px" px="0px">
          <Text ms="20px" mt="90px" fontSize="20px" fontWeight="bold">
            12 Orders
          </Text>
          <Box bg="primary" px="20px" py="10px" mt="20px">
            <CardBooking
              pic={Image3}
              user="kratos"
              status="ongoing"
              name="name Property"
              start_date={12}
              end_date={13}
              roomName="room1"
              guest_count={3}
              price="300000"
            />
            <CardBooking
              pic={Image3}
              user="kratos"
              status="ongoing"
              name="name Property"
              start_date={12}
              end_date={13}
              roomName="room1"
              guest_count={3}
              price="300000"
            />
          </Box>
        </Container>
        <Container maxW="1140px" mt="20px">
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
          <Tabs>
            <TabList>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                All
              </Tab>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Ongoing
              </Tab>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Finished
              </Tab>
              <Tab
                fontSize="14px"
                w="25%"
                py="3px"
                _selected={{ bg: "primary" }}
              >
                Cancled
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0px">
                <CardBooking
                  pic={Image3}
                  user="kratos"
                  status="ongoing"
                  name="name Property"
                  start_date={12}
                  end_date={13}
                  roomName="room1"
                  guest_count={3}
                  price="300000"
                />
                <CardBooking
                  pic={Image3}
                  user="kratos"
                  status="ongoing"
                  name="name Property"
                  start_date={12}
                  end_date={13}
                  roomName="room1"
                  guest_count={3}
                  price="300000"
                />
                <CardBooking
                  pic={Image3}
                  user="kratos"
                  status="ongoing"
                  name="name Property"
                  start_date={12}
                  end_date={13}
                  roomName="room1"
                  guest_count={3}
                  price="300000"
                />
              </TabPanel>
              <TabPanel>Ongoing</TabPanel>
              <TabPanel>Finished</TabPanel>
              <TabPanel>Cancled</TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </Layout>
  );
}

export default Order;
