import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Stack,
  Heading,
  Text,
  Center,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import Layout from "../../Components/Layout";
import axios from "axios";

function Topbar(props) {
  return (
    <Box>
      <Box w="100%" p={4} boxShadow="lg">
        <Flex justify="space-between" backgroundColor="gray.100" align="center">
          <Box color="gray.600" w="100%" cursor="pointer">
            <Text fontSize="lg" fontWeight="bold">
              Rp. 600.000,00
            </Text>
            <Text fontSize="xs">12-16 Nov | 1 Tamu</Text>
          </Box>
          <Button variant="primary" w="70%">
            Reserve
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

function PropertyDetail(props) {
  const [roomButton, setRoomButton] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [propertyName, setPropertyName] = useState("");
  const [desProperty, setDesProperty] = useState("");
  const [category, setCategory] = useState("");
  const [tenantData, setTenantData] = useState({});
  const [pic, setPic] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [idRoom, setIdRoom] = useState(1);

  const datepickerOnChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const idProperty = 19;

  function Reviews(props) {
    return (
      <Box mb="20px">
        <Box border="1px solid lightgrey" p={5}>
          <Flex mb={2}>
            <Image
              src={
                process.env.REACT_APP_API_BASE_URL +
                props.data.User.Profile.profilePic
              }
              alt="profile picture"
              width="50px"
              height="50px"
              overflow="hiden"
              objectFit="cover"
              mr={5}
            />
            <Box>
              <Text fontWeight="bold" fontSize="md">
                {props.data.User.Profile.name}
              </Text>
              <Text fontSize="md" color="grey">
                {props.data.Review.createdAt}
              </Text>
            </Box>
          </Flex>
          <Text>{props.data.Review.comment}</Text>
        </Box>
      </Box>
    );
  }

  function renderReview() {
    return reviewData.map((room) => {
      return room.Reservations.map((val) => {
        return <Reviews data={val} />;
      });
    });
  }
  function renderCalendar() {
    console.log(roomData);

    const price = Math.ceil(roomData[0].defaultPrice / 1000);
    console.log(roomData[0].SpecialPrices);
    const renderDayContents = (day, date) => {
      let finalPrice = price;

      const found = roomData[0].SpecialPrices.find((element) => {
        if (
          new Date(date) >= new Date(element.startDate) &&
          new Date(date) <= new Date(element.endDate)
        ) {
          console.log(new Date(element.startDate));
          console.log(new Date(date));
          return true;
        }
        console.log(new Date(element.startDate));
        console.log(new Date(date));
        return false;
      });

      if (found) {
        if (found.type === "nominal") {
          finalPrice = found.discount;
        }
      }
      // find icoockkan tanggalnya
      return (
        <Box>
          {date.getDate()}

          <br />
          <Text fontSize={12}>{finalPrice}</Text>
        </Box>
      );
    };
    return (
      <Box my={3}>
        <Text mb={1}>{roomData[0].description}</Text>
        <Text fontWeight="bold" fontSize="xl" mb={1}>
          check availability
        </Text>
        <DatePicker
          selected={startDate}
          onChange={datepickerOnChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          minDate={new Date()}
          renderDayContents={renderDayContents}
          excludeDates={[addDays(new Date("2022-12-25T00:00:00.000Z"), 0)]}
        />
      </Box>
    );
  }

  function renderRoomButton() {
    return roomButton.map((room, idx) => {
      return (
        <Box key={idx}>
          <Stack mx={2}>
            <IconButton
              width={"50px"}
              height={"40px"}
              variant={"primary"}
              borderRadius={0}
              icon={<i className="fa-solid fa-bed" />}
              onClick={() => setIdRoom(room.id)}
            />
            <Center>
              <Text>{room.name}</Text>
            </Center>
          </Stack>
        </Box>
      );
    });
  }

  useEffect(() => {
    const fetchProperty = async () => {
      await axios(
        `${process.env.REACT_APP_API_BASE_URL}/product/get/${idProperty}`
      )
        .then((res) => {
          setPropertyName(res.data.results.name);
          setDesProperty(res.data.results.description);
          setCategory(res.data.results.Category.location);
          setRoomButton(res.data.results.Rooms);
          setTenantData(res.data.results.Tenant);
          setPic(res.data.results.pic);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    async function fetchReview() {
      await axios(
        `${process.env.REACT_APP_API_BASE_URL}/product/get/review/${idProperty}`
      )
        .then((res) => {
          console.log(res.data.results.Rooms);
          setReviewData(res.data.results.Rooms);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function fetchRoom(id) {
      await axios(
        `${process.env.REACT_APP_API_BASE_URL}/product/get/room/${roomButton.id}`
      )
        .then((res) => {
          setRoomData(res.data.results);
          console.log(res.data.results);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
    fetchProperty();
    fetchReview();
    // renderCalendar();
    fetchRoom();
  }, []);

  return (
    <Layout>
      <div>
        <Topbar />
        <Container maxW="container.lg">
          {/* ////////////////////////////// */}
          <Box>
            <Box my={3}>
              <Text fontWeight="bold" fontSize="xl" mb={1}>
                {propertyName}
              </Text>

              <Text fontSize="sm" color="grey">
                {category}
              </Text>
            </Box>

            <Image
              overflow="hiden"
              objectFit="cover"
              width="100%"
              height="210px"
              src={process.env.REACT_APP_API_BASE_URL + pic}
            />

            <Box my={8}>
              <Text>{desProperty}</Text>

              <Flex align="center" my={8}>
                {renderRoomButton()}
              </Flex>
              {renderCalendar()}
            </Box>

            <Flex border="3px solid lightgrey" p={5}>
              <Box h="50px" w="50px" backgroundColor="grey" mr={5}></Box>
              <Box>
                <Text fontWeight="bold" fontSize="md">
                  {tenantData.name}
                </Text>
                <Text fontSize="md" color="grey">
                  {/* Joined since {joinTime[0]} */}
                </Text>
              </Box>
            </Flex>
          </Box>
          {/* //////////detail/////////////////// */}
          <Box>
            <Box my={3}>
              <Text fontWeight="bold" fontSize="xl" mb={1}>
                Details
              </Text>
            </Box>

            <Box backgroundColor="gray.200" p={3} mb={8}>
              <Text fontWeight="bold" fontSize="lg">
                1 Guest
              </Text>
            </Box>

            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Rp. 300.000,00 per bed
            </Text>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Total: Rp. 300.000,00
            </Text>

            <Button w="100%" variant="primary" my={2}>
              Reserve
            </Button>
          </Box>
          <Box my={3}>
            <Text fontWeight="bold" fontSize="xl" mb={1}>
              <i className="fa-solid fa-star" /> 5 Reviews
            </Text>
          </Box>
          {renderReview()}
          <Button w="100%" variant="secondary" my={2}>
            Show All
          </Button>
        </Container>
      </div>
    </Layout>
  );
}

export default PropertyDetail;
