import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Image,
  Center,
  Stack,
  Checkbox,
  Textarea,
  Select,
  FormHelperText
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";

import Foto from "../../Assets/bookingHistory3.png";
import {useParams} from "react-router-dom"
import axios from "axios"
import { useEffect,useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

function EditRoom() {
  // const [editRoom, setEditRoom] = useState({})
  const {id} = useParams()
  const [nama, setNama] = useState("")
  const [price, setPrice] = useState("")
  const [capacity, setCapacity] = useState("")
  const [caption , setCaption] = useState("")
  const [property, setProperty] = useState([])
  const [propertyId, setPropertyId] = useState("")
  console.log(propertyId);

  // utk get data berdasarkan id yg dikirm dari cardRoomTenant
  useEffect(() => {
    const fetchDataEdit = () => {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/room-one/${id}`)
      .then((res) => {
        setNama(res.data.roomOne.name)
        setPrice(res.data.roomOne.defaultPrice)
        setCapacity(res.data.roomOne.capacity)
        setCaption(res.data.roomOne.description)
        setPropertyId(res.data.roomOne.Property.id)
  
        //set values
        formik.values.nameRoom = res.data.roomOne.name;
        formik.values.price = res.data.roomOne.defaultPrice;
        formik.values.capacity = res.data.roomOne.capacity
        formik.values.caption = res.data.roomOne.description
      })
      .catch((err) => {
        console.error(err)
      })
    }
    fetchDataEdit()
    fetchDataAll()
    optionDropdown()
  }, [])

  // get data propety secara keseluruhan
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

  // mengatasi input propertId
  const inputHandler = (e, field) => {
    const {value} = e.target

    setPropertyId(value)
  }

  // pasang dormik dan validation
  // configure yup
  YupPassword(Yup)
  //formik initialization
  const formik = useFormik({
    initialValues : {
      nameRoom : nama,
      price : price,
      capacity : capacity,
      caption : caption
    },
    validationSchema : Yup.object().shape({
      nameRoom : Yup.string().required("required"),
      price : Yup.number("input number").required("required please input type number"),
      capacity : Yup.number("input number").required("required please input type number").min(1).max(10),
      caption : Yup.string().required("required").min(2, "To Short").max(255, "To Long")
    }),
    onSubmit : async (values) => {
      console.log(values);
      const {nameRoom, price, capacity, caption} = values

      axios.patch(`${process.env.REACT_APP_API_BASE_URL}/room/update-room/${id}` ,{
        name : nameRoom,
        defaultPrice : parseInt(price),
        description : caption,
        capacity : parseInt(capacity),
        propertyId : parseInt(propertyId),
      })
      .then((res) => {
        // alert("berhasil update data")
        alert(res.data.message)
      })
      .catch((err) => {
        console.error(err)
      })
    }
  })
  return (
    <Layout>
      <Box mt="80px">
        <Container mt="100px" maxW="1140px">
          <Flex mb="10px" w="100%" mx="auto">
            <Link to="/tenant/room">
              <Button
                position="relative"
                borderRadius="0px"
                border="1px"
                borderColor="gray.200"
                bg="white"
                h="40px"
                me="20px"
                _hover={{
                  background: "black",
                  color: "white",
                  borderColor: "black",
                }}
              >
                <i className="fa-solid fa-caret-left"></i>
              </Button>
            </Link>

            <Text fontWeight="900" fontSize="20px" color="black" px="5px">
              Edit Room
            </Text>
          </Flex>
        </Container>
        <Container maxW="1140px">
          <Image
            src={Foto}
            alt="Room image"
            width="100%"
            height="210px"
            me="10px"
            mt="5px"
            mb="20px"
            overflow="hiden"
            objectFit="cover"
          />
          <FormControl>
            <Select
              mb="20px"
              borderRadius={0}
              borderColor="rgba(175, 175, 175, 1)"
              value={propertyId}
              onChange={(e) => inputHandler(e)}
            >
                {optionDropdown()}
            </Select>
              {formik.errors.property ? (
                <FormHelperText color="red" textAlign="center">
                  {formik.errors.property}
                </FormHelperText>
              ) : null}
          </FormControl>
          <FormControl pb="20px">
            <Input 
            id = "nameRoom"
            type="text" 
            placeholder="Name Room" 
            borderRadius="0" 
            value={formik.values.nameRoom}
            onChange={(e) => {
              formik.setFieldValue("nameRoom", e.target.value)
            }}
            />
            {formik.errors.nameRoom ? (
                <FormHelperText color="red" textAlign="center">
                  {formik.errors.nameRoom}
                </FormHelperText>
              ) : null}
          </FormControl>
          <FormControl pb="20px">
            <Input 
            type="number" 
            placeholder="Price" 
            borderRadius="0" 
            value={formik.values.price}
            onChange={(e) => {
              formik.setFieldValue("price", e.target.value)
            }}
            />
            {formik.errors.price ? (
                <FormHelperText color="red" textAlign="center">
                  {formik.errors.price}
                </FormHelperText>
              ) : null}
          </FormControl>
          <FormControl pb="20px">
            <Input type="number"
            placeholder="capacity" 
            borderRadius="0" 
            value={formik.values.capacity}
            onChange={(e) => {
              formik.setFieldValue("capacity", e.target.value)
            }}
            />
            {formik.errors.capacity ? (
                <FormHelperText color="red" textAlign="center">
                  {formik.errors.capacity}
                </FormHelperText>
              ) : null}
          </FormControl>
          <FormControl>
            <Textarea
              height="180px"
              mb="20px"
              borderRadius="0px"
              placeholder="Edit caption"
              value={formik.values.caption}
              onChange={(e) => {
                formik.setFieldValue("caption", e.target.value)
              }}
            />
            {formik.errors.caption ? (
                <FormHelperText color="red" textAlign="center">
                  {formik.errors.caption}
                </FormHelperText>
              ) : null}
          </FormControl>
          <Button variant="secondary" w="100%" mb="20px">
            Edit Photo
          </Button>
          <Button 
          variant="primary" 
          w="100%" 
          mb="40px" 
          onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Container>
      </Box>
    </Layout>
  );
}

export default EditRoom;
