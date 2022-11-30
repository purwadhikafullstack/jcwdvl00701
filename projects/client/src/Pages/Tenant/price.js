import {
  Box,
  Container,
  Flex,
  Button,
  Tab,
  TabList,
  TabPanel,
  Text,
  Tabs,
  TabPanels,
  FormControl,
  Input,
} from "@chakra-ui/react";

function SpecialPrice() {
  return <Box>SpcialPrice</Box>;
}

function RoomAvailability() {
  return <Box>Room Availability</Box>;
}

function Price() {
  return (
    <Box mt="80px">
      <Container maxW="1140px">
        <Text fontSize="20px" fontWeight="bold" mb="30px">
          Special Price
        </Text>

        <Tabs>
          <TabList>
            <Tab fontSize="14px" w="50%" py="3px" _selected={{ bg: "primary" }}>
              Special Price
            </Tab>
            <Tab fontSize="14px" w="50%" py="3px" _selected={{ bg: "primary" }}>
              Room Availability
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SpecialPrice />
            </TabPanel>
            <TabPanel>
              <RoomAvailability />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

export default Price;
