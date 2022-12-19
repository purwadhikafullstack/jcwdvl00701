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
  Skeleton,
  Text,
  Center,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { addDays, subDays } from "date-fns";

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
  const [finalCountPrice, setFinalCountPrice] = useState(0);

  // menyimpan tanggal-tanggal yang di pilih
  const datesRanges = [];
  const datepickerOnChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const date = new Date(start.getTime());

    while (date <= end) {
      // if (
      //   date >=
      //     new Date(roomData.RoomUnavailabilities.startDate)
      //       .toISOString()
      //       .split("T")[0] &&
      //   date <=
      //     new Date(roomData.RoomUnavailabilities.endDate)
      //       .toISOString()
      //       .split("T")[0]
      // ) {

      // }

      const found = roomData.RoomUnavailabilities.find((element, idx) => {
        if (
          addDays(new Date(date), 1).toISOString().split("T")[0] >=
            new Date(element.startDate).toISOString().split("T")[0] &&
          new Date(date).toISOString().split("T")[0] <
            new Date(element.endDate).toISOString().split("T")[0]
        ) {
          return true;
        }

        return false;
      });

      if (!found) {
        datesRanges.push(new Date(date).toISOString().split("T")[0]);

        date.setDate(date.getDate() + 1);
      }
    }

    ////// FilterDate

    console.log(datesRanges);
    countFinalPrice();
    return datesRanges;
  };

  // untuk menghitung total harga
  const countFinalPrice = () => {
    let totalPrice = 0;

    const found = datesRanges.map((element, i) => {
      if (
        element >=
          new Date(roomData.SpecialPrices[0].startDate)
            .toISOString()
            .split("T")[0] &&
        element <=
          new Date(roomData.SpecialPrices[0].endDate)
            .toISOString()
            .split("T")[0]
      ) {
        console.log(i);
        console.log(element);
        console.log(
          new Date(roomData.SpecialPrices[0].startDate)
            .toISOString()
            .split("T")[0]
        );
        console.log(
          new Date(roomData.SpecialPrices[0].endDate)
            .toISOString()
            .split("T")[0]
        );
        console.log(roomData.SpecialPrices[0].discount);
        let finalPrice = 0;
        if (roomData.SpecialPrices[0].type === "nominal") {
          console.log(roomData.SpecialPrices[0].type);
          finalPrice = roomData.SpecialPrices[0].discount;
        } else if (roomData.SpecialPrices[0].type === "persen") {
          console.log(roomData.SpecialPrices[0].type);
          finalPrice =
            roomData.defaultPrice +
            roomData.defaultPrice * (roomData.SpecialPrices[0].discount / 100);
        }

        totalPrice = totalPrice + finalPrice;
        return totalPrice;
      }
      console.log(i);
      console.log(element);
      console.log(
        new Date(roomData.SpecialPrices[0].startDate)
          .toISOString()
          .split("T")[0]
      );
      console.log(
        new Date(roomData.SpecialPrices[0].endDate).toISOString().split("T")[0]
      );
      totalPrice = totalPrice + roomData.defaultPrice;
      return totalPrice;
    });

    console.log(found);
    console.log(totalPrice);

    setFinalCountPrice(totalPrice);
    return totalPrice;
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
    if (roomData.defaultPrice) {
      const price = roomData.defaultPrice;

      const renderDayContents = (day, date) => {
        let finalPrice = price;

        // untuk menampilkan special price di kalender
        const found = roomData.SpecialPrices.find((element) => {
          if (
            addDays(new Date(date), 1).toISOString().split("T")[0] >=
              new Date(element.startDate).toISOString().split("T")[0] &&
            new Date(date).toISOString().split("T")[0] <
              new Date(element.endDate).toISOString().split("T")[0]
          ) {
            return true;
          }

          return false;
        });

        if (found) {
          if (found.type === "nominal") {
            finalPrice = found.discount;
          } else if (found.type === "persen") {
            finalPrice = finalPrice + (finalPrice * found.discount) / 100;
          }
        }
        // find icoockkan tanggalnya
        return (
          <Box>
            {date.getDate()}

            <br />
            <Text fontSize={12}>{Math.ceil(finalPrice / 1000) + "k"}</Text>
          </Box>
        );
      };

      // untuk menampilkan ruangan yang tidak tersedia di kalendar
      const disabledDateRanges = roomData.RoomUnavailabilities.map((range) => ({
        start: new Date(range.startDate),
        end: new Date(range.endDate),
      }));
      return (
        <Box my={3}>
          <Text mb={1}>{roomData.description}</Text>
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
            excludeDateIntervals={disabledDateRanges}
            calendarClassName="rasta-stripes"
          />
          <Box my={3}>
            <Text fontWeight="bold" fontSize="xl" mb={1}>
              Details
            </Text>
          </Box>

          <Box backgroundColor="gray.200" p={3} mb={8}>
            <Text fontWeight="bold" fontSize="lg">
              {roomData.capacity} Guest
            </Text>
          </Box>
        </Box>
      );
    } else {
      <Skeleton height="280px" />;
    }
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

  async function fetchRoom() {
    await axios(
      `${process.env.REACT_APP_API_BASE_URL}/product/get/room/${idRoom}`
    )
      .then((res) => {
        setRoomData(res.data.results[0]);

        setStartDate(new Date());
        setEndDate(null);
      })
      .catch((err) => {
        console.error(err.message);
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
          setReviewData(res.data.results.Rooms);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchProperty();
    fetchReview();
    renderCalendar();
    fetchRoom();
  }, [idRoom]);

  // let joinTime = tenantData.createdAt.split("T");

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
          </Box>
          {/* //////////detail/////////////////// */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Total: Rp. {finalCountPrice}
            </Text>

            <Button w="100%" variant="primary" my={2}>
              Reserve
            </Button>
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
