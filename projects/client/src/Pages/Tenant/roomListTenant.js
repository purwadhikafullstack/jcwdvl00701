import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  HStack,
  IconButton,
  Select,
} from "@chakra-ui/react";
import Layout from "../../Components/Layout";
import CardRoomTenant from "../../Components/Tenant/CardRoomTenant";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

function RoomListTenant() {
  //state
  const [room, setRoom] = useState([])
  const [property, setProperty] = useState([])
  const [keyWord, setKeyWord] = useState("")
  console.log(keyWord);

  const inputHandler = (e) => {
    const {value} = e.target

    setKeyWord(value)
  }
  //get property berdasarkan tenant id ==> yg di simpan di dropdown
    //buat id nya dari global store ==> tenant id
  useEffect(() => {
    const fetchProperty = () => {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/room-property/1?searchQuery=${keyWord}`)
      .then((res) => {
        // console.log(res.data.roomProperty);
        setRoom(res.data.roomProperty)
      })
      .catch((err) => {
        console.error(err)
      })
    }
    fetchProperty()
    roomData()
    fetchDataAll()
    optionDropdown()
  },[keyWord])

  // get data room, yg akan di loop utk di render
  const roomData = () => {
    return room.map((val, index) => {
      // console.log(val);
      return <CardRoomTenant 
      roomData = {val}
      />
    })
  }

  const fetchDataAll = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/room-property/1`)
    .then((res) => {
      // console.log(res.data.roomProperty);
      setProperty(res.data.roomProperty)

    })
    .catch((err) => {
      console.error(err)
    })
  }

  // loop utk dropdown
  const optionDropdown = () => {
    return property.map((val) => {
      return <option value={val.Property.id}>{val.Property.name}</option>
    })
  }

  return (
    <Layout>
      <Box mt="90px" mb="30px">
        <Container maxW="1140px">
          <Flex mb="20px" justifyContent="space-between">
            <Text fontSize="20px" fontWeight="bold">
              16 Rooms
            </Text>
            <Link to="/tenant/add-room">
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
          <Select
            mb="20px"
            placeholder="Select Property"
            borderRadius={0}
            borderColor="rgba(175, 175, 175, 1)"
          >
            {/* render dropdown */}
            {optionDropdown()}
          </Select>
          <FormControl pb="20px">
            <HStack>
              <Input
                type="name"
                placeholder="Search Room"
                borderRadius="0"
                borderColor="rgba(175, 175, 175, 1)"
                onChange={inputHandler}
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
          {/* render data room  */}
          {roomData()}
        </Container>
      </Box>
    </Layout>
  );
}



export default RoomListTenant;
