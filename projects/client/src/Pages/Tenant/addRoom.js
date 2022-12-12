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
import { Link, useHistory } from "react-router-dom";
import Layout from "../../Components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import axios from "axios"
import { useEffect, useState } from "react";

function AddRoom() {
  // state
  const [property, setProperty] = useState([])
  const [dropdown, setDropdown] = useState([])
  const history = useHistory()

  useEffect(() => {
     const fetchDataAll = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/room-property/1`)
    .then((res) => {
      console.log(res.data.roomProperty);
      setProperty(res.data.roomProperty)

    })
    .catch((err) => {
      console.error(err)
    })
  }
  fetchDataAll()
  fetchDataDropdown()
  optionDropdown()
  }, [])

  const fetchDataDropdown = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/room/room-dropdown`)
    .then((res) => {
      // console.log(res.data.dropdown);
      setDropdown(res.data.dropdown)

    })
    .catch((err) => {
      console.error(err)
    })
  }

  // loop utk dropdown
  const optionDropdown = () => {
    return dropdown.map((val) => {
      return <option value={val.id}>{val.name}</option>
    })
  }

  // pasang formik utk validation
  //configure yup
  YupPassword(Yup)
  //formik initialization
  const formik = useFormik({
    initialValues: {
      property : "",
      nameRoom : "",
      price : "",
      capacity : "",
      caption : ""
    },
    validationSchema : Yup.object().shape({
      property: Yup.string().required("required"),
      nameRoom : Yup.string().required("required"),
      price : Yup.number("input number").required("required please input type number"),
      capacity : Yup.number("input number").required("required please input type number").min(1).max(10),
      caption : Yup.string().required("required").min(2, "To Short").max(255, "To Long")
    }),
    validateOnChange : false,
    onSubmit: async (values) => {
      console.log(values);
      const {nameRoom, property, price, caption, capacity} = values
      
      // kirim data ke back-end
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/room/add-room`, {
        name : nameRoom,
        defaultPrice : parseInt(price),
        description : caption,
        capacity : parseInt(capacity),
        propertyId : parseInt(property)
      })
      .then((res) => {
        alert(res.data.message)
        history.push("/tenant/room")
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
              Add Room
            </Text>
          </Flex>
        </Container>
        <Container maxW="1140px">
          <FormControl>
            <Select
              mb="20px"
              placeholder="Select Property"
              borderRadius={0}
              borderColor="rgba(175, 175, 175, 1)"
              onChange={(e) => {
                formik.setFieldValue("property", e.target.value)
              }}
              
            >
              {/* render dropdown property */}
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
            type="text" 
            placeholder="Name Room" 
            borderRadius="0" 
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
            <Input type="number"
            placeholder="Price" 
            borderRadius="0" 
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
          <Button variant="primary" w="100%" mb="40px" onClick={formik.handleSubmit}>
            Save
          </Button>
        </Container>
      </Box>
    </Layout>
  );
}

export default AddRoom;
