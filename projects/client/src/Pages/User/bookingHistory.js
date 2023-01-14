import {
  Box,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Center,
  Container,
  Input,
  FormControl,
  Select,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import NavbarTuru from "../../Components/NavbarTuru";
import Footer from "../../Components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import CardBookingHistory from "../../Components/User/CardBookingHistory";
import CardBooking from "../../Components/User/CardBooking";
import ReactPaginate from "react-paginate";
import Loading from "../../Components/Loading";
// import Footer from '../Components/Footer';

function BookingHistory() {
  const [inputStartDate, setInputStartDate] = useState("");
  const [inputEndDate, setInputEndDate] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useSelector((state) => state.user);
  const [dataBooking, setDataBooking] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  console.log(dataBooking);
  console.log(rows);

  // console.log(id);
  console.log(inputStartDate);
  console.log(inputEndDate);
  // console.log(status);

  useEffect(() => {
    setLoading(true);
    const fetchDataBooking = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/history/get-history?userId=${id}&limit=${limit}&page=${page}&startDate=${inputStartDate}&endDate=${inputEndDate}&status=${status}`
        );

        // console.log((await response)?.data);
        // console.log((await response)?.data.bookingHistory.rows);
        // console.log((await response)?.data.result.rows);
        setDataBooking((await response)?.data?.bookingHistory?.rows);
        setPage((await response)?.data?.page);
        setRows((await response)?.data?.totalRows);
        setPages((await response)?.data?.totalPage);
      } catch (err) {
        console.error(err.data.message);
      }
    };
    fetchDataBooking();
    setLoading(false);
  }, [inputStartDate, inputEndDate, status, id, page, randomNumber]);

  const handleChange = (e, field) => {
    const { value } = e.target;
    if (field === "startDate") {
      setInputStartDate(value);
      setPage(0);
    } else if (field === "endDate") {
      setInputEndDate(value);
      setPage(0);
    } else if (field === "status") {
      setStatus(value);
      setPage(0);
    }
  };

  function renderHistory() {
    return dataBooking.map((val) => {
      console.log(val);
      if (val.status === 6) {
        return (
          <CardBookingHistory
            key={val.id}
            id={val.id}
            startDate={val?.startDate}
            endDate={val?.endDate}
            status={val?.status}
            guestCount={val?.guestCount}
            finalPrice={val?.finalPrice}
            userId={val?.userId}
            roomId={val?.roomId}
            Room={val?.Room}
            User={val?.User}
            randomNumber={setRandomNumber}
            Review={val?.Review}
          />
        );
      } else if (val.status == 5) {
        return (
          <CardBookingHistory
            id={val.id}
            startDate={val?.startDate}
            endDate={val?.endDate}
            status={val?.status}
            guestCount={val?.guestCount}
            finalPrice={val?.finalPrice}
            userId={val?.userId}
            roomId={val?.roomId}
            Room={val?.Room}
            User={val?.User}
            randomNumber={setRandomNumber}
            Review={val?.Review}
          />
        );
      } else if (val.status === 4) {
        return (
          <CardBookingHistory
            id={val.id}
            startDate={val?.startDate}
            endDate={val?.endDate}
            status={val?.status}
            guestCount={val?.guestCount}
            finalPrice={val?.finalPrice}
            userId={val?.userId}
            roomId={val?.roomId}
            Room={val?.Room}
            User={val?.User}
            randomNumber={setRandomNumber}
            Review={val?.Review}
          />
        );
      } else if (val.status === 3) {
        return (
          <CardBookingHistory
            id={val.id}
            startDate={val?.startDate}
            endDate={val?.endDate}
            status={val?.status}
            guestCount={val?.guestCount}
            finalPrice={val?.finalPrice}
            userId={val?.userId}
            roomId={val?.roomId}
            Room={val?.Room}
            User={val?.User}
            randomNumber={setRandomNumber}
            Review={val?.Review}
          />
        );
      } else if (val.status === 2) {
        return (
          <CardBookingHistory
            id={val.id}
            startDate={val?.startDate}
            endDate={val?.endDate}
            status={val?.status}
            guestCount={val?.guestCount}
            finalPrice={val?.finalPrice}
            userId={val?.userId}
            roomId={val?.roomId}
            Room={val?.Room}
            User={val?.User}
            randomNumber={setRandomNumber}
            Review={val?.Review}
          />
        );
      } else if (val.status === 1) {
        return (
          <CardBookingHistory
            id={val.id}
            startDate={val?.startDate}
            endDate={val?.endDate}
            status={val?.status}
            guestCount={val?.guestCount}
            finalPrice={val?.finalPrice}
            userId={val?.userId}
            roomId={val?.roomId}
            Room={val?.Room}
            User={val?.User}
            randomNumber={setRandomNumber}
            Review={val?.Review}
          />
        );
      }
    });
  }

  function renderBooking() {
    return dataBooking.map((val) => {
      console.log(val);
      // console.log(val.status);
      if (val.status === 1) {
        return (
          <CardBooking
            key={val.id}
            id={val.id}
            startDate={val?.startDate}
            endDate={val?.endDate}
            status={val?.status}
            guestCount={val?.guestCount}
            userId={val?.userId}
            roomId={val?.roomId}
            Room={val?.Room}
            User={val?.User}
            randomNumber={setRandomNumber}
          />
        );
      }
    });
  }

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return loading ? (
    <Loading />
  ) : (
    <Box>
      <NavbarTuru />
      <Box w="100%" h="90px" mt={{ ss: "0px", sm: "0px", sl: "80px" }}>
        {renderBooking()}
        <Box bg="white" w="100%" py="30px" px="20px">
          <Container maxW="1140px" px={{ sm: "0px", sl: "15px" }}>
            <Flex>
              <FormControl border={"1px"} borderColor="gray.400" me="5px">
                <Text ms="18px">Start Date</Text>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  border={"none"}
                  onChange={(e) => handleChange(e, "startDate")}
                />
              </FormControl>
              <FormControl border={"1px"} borderColor="gray.400">
                {/* buat stardate adnn date dalm flex agar bias sevelahan(dicoba), dijadikan query nanti nya */}
                <Text ms="18px">End Date</Text>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  border={"none"}
                  onChange={(e) => handleChange(e, "endDate")}
                />
              </FormControl>
            </Flex>
            <FormControl mt="15px">
              <Select
                bg="white"
                mb="20px"
                placeholder="All Status"
                borderRadius={0}
                borderColor="rgba(175, 175, 175, 1)"
                onChange={(e) => handleChange(e, "status")}
              >
                <option value={1}>Waiting for payment</option>;
                <option value={2}>unconfirmed</option>;
                <option value={3}>processing</option>;
                <option value={4}>ongoing</option>;
                <option value={5}>cancled</option>;
                <option value={6}>finished</option>;
              </Select>
            </FormControl>
            <Text fontWeight="Bold" fontSize="22px" pb="20px">
              History Booking:
            </Text>
            <SimpleGrid minChildWidth="320px" spacing="30px">
              {renderHistory()}
            </SimpleGrid>
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
                    className="fa-solid fa-chevron-left"
                    style={{ fontSize: 18 }}
                  ></i>
                }
                nextLabel={
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{
                      fontSize: 18,
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
        {/* di simpan footer di box yg bukan terakhir berhasil */}
        <Footer />
      </Box>
    </Box>
  );
}

export default BookingHistory;
