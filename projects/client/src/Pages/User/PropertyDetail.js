import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";

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
  const [idRoom, setIdRoom] = useState(roomButton[0]?.id); // untuk menyimpan roomId
  const [finalCountPrice, setFinalCountPrice] = useState(0);
  const {id} = useSelector(state => state.user)
  const [start , setStart] = useState("")
  const [end , setEnd] = useState("")
  let history = useHistory()
  // const [totalHarga, setTotalHarga] = useState(0)
  // console.log("start", start);
  // console.log("end ",end);

  // menyimpan tanggal-tanggal yang di pilih
  let datesRanges = [];
  const datepickerOnChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const date = new Date(start.getTime());

    while (date <= end) {
      /**
       * NOTE: convert date ke string dulu, lalu convert lagi ke date supaya timenya 00.00
       */
      const found = roomData.RoomUnavailabilities.find((element, idx) => {
        if (
          new Date(date.toDateString()) >
            new Date(new Date(element.startDate).toDateString()) &&
          new Date(date.toDateString()) <=
            new Date(new Date(element.endDate).toDateString())
        ) {
          return true;
        }
        return false;
      });

      if (!found) {
        datesRanges.push(new Date(date).toISOString().split("T")[0]);
      }

      date.setDate(date.getDate() + 1);
    }

    countFinalPrice(datesRanges);
    setStart(datesRanges[0])
    setEnd(datesRanges[datesRanges.length - 1])
    console.log(datesRanges);
    return datesRanges;
  };

  // untuk menghitung total harga
  let totalPrice = 0;
  const countFinalPrice = () => {

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

  const idProperty = 4;
  // const idProperty = props.match.params.propertyId;

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
    if (roomData?.defaultPrice) {
      const price = roomData?.defaultPrice;

      const renderDayContents = (day, date) => {
        let finalPrice = price;

        // untuk menampilkan special price di kalender
        const found = roomData?.SpecialPrices.find((element) => {
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
      const disabledDateRanges = roomData?.RoomUnavailabilities.map(
        (range) => ({
          start: new Date(range.startDate),
          end: new Date(range.endDate),
        })
      );
      return (
        <Box my={3}>
          <Text mb={1}>{roomData?.description}</Text>
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
              {roomData?.capacity} Guest
              {/* guest count ddapatnya dari state roomData*/}
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
              _focus={{
                bg: "black",
                color: "white",
              }}
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
  async function fetchReview(e) {
    await axios(
      `${process.env.REACT_APP_API_BASE_URL}/product/get/review/${idProperty}?show=${e}`
    )
      .then((res) => {
        setReviewData(res.data.results.Rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  }

    const btnHandlerReservation = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/reservation/add-reservation`, {
        startDate : start,
        endDate : end,
        status : 1,
        guestCount : roomData?.capacity ,
        userId : id,
        roomId : idRoom,
        finalPrice : finalCountPrice
      })
      console.log(response.data);
      
      history.push(`/booking/${idRoom}`)
      } catch (err) {
        console.error(err.data.message)
      }
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
          console.log(res.data.results.Tenant);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    fetchProperty();
    fetchReview();
    renderCalendar();
    fetchRoom();
    renderReview();
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
          </Box>
          <Box my={8}>
            <Text>{desProperty}</Text>

            <Flex align="center" my={8}>
              {renderRoomButton()}
            </Flex>
            {renderCalendar()}
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              Total:
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(finalCountPrice)}
            </Text>

            {
              finalCountPrice ?
              <Button w="100%" variant="primary" my={2} onClick={btnHandlerReservation}>
                Reserve
              </Button>
              :
              <Button w="100%" variant="primary" my={2} onClick={btnHandlerReservation} disabled={true}>
                Reserve
              </Button>
            }

          </Box>
          <Flex border="3px solid lightgrey" p={5}>
            <Image
              src={"tenantData.User.Profile.profilePic"}
              width="50px"
              height="50px"
              me="10px"
              overflow="hiden"
              objectFit="cover"
            />
            <Box>
              <Text fontWeight="bold" fontSize="md">
                {tenantData.name}
              </Text>
              <Text fontSize="md" color="grey">
                Joined since {tenantData.createdAt}
              </Text>
            </Box>
          </Flex>
          <Box my={3}>
            <Text fontWeight="bold" fontSize="xl" mb={1}>
              <i className="fa-solid fa-star" /> Review
            </Text>
          </Box>
          {renderReview()}
          <Button
            w="100%"
            variant="secondary"
            my={2}
            onClick={() => fetchReview("show")}
          >
            Show All
          </Button>
        </Container>
      </div>
    </Layout>
  );
}

export default PropertyDetail;
