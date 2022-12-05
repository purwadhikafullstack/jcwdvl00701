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
  FormHelperText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

function AddRoom() {
  // pasang formik utk validation
  //configure yup
  YupPassword(Yup);
  //formik initialization
  const formik = useFormik({
    initialValues: {
      property: "",
      nameRoom: "",
      price: "",
      caption: "",
    },
    validationSchema: Yup.object().shape({
      property: Yup.string().required("required"),
      nameRoom: Yup.string().required("required"),
      price: Yup.number().required("required"),
      caption: Yup.string().required("required"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
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
          <Image
            src={"/Assets/add_photo.png"}
            alt="Room image"
            width="100%"
            height="210px"
            me="10px"
            mt="5px"
            mb="20px"
          />
          <FormControl>
            <Select
              mb="20px"
              placeholder="Select Property"
              borderRadius={0}
              borderColor="rgba(175, 175, 175, 1)"
              onChange={(e) => {
                formik.setFieldValue("property", e.target.value);
              }}
            >
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
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
                formik.setFieldValue("nameRoom", e.target.value);
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
              type="text"
              placeholder="Price"
              borderRadius="0"
              onChange={(e) => {
                formik.setFieldValue("price", e.target.value);
              }}
            />
            {formik.errors.price ? (
              <FormHelperText color="red" textAlign="center">
                {formik.errors.price}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Text mb="10px"> Fasility:</Text>
          <Flex align="center" mb="20px">
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-wifi" />
              </Center>
              <Center>
                <Checkbox defaultChecked>wifi</Checkbox>
              </Center>
            </Stack>
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-box-archive" />
              </Center>
              <Center>
                <Checkbox defaultChecked>locker</Checkbox>
              </Center>
            </Stack>
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-utensils" />
              </Center>
              <Center>
                <Checkbox defaultChecked>menu</Checkbox>
              </Center>
            </Stack>
            <Stack width="25%">
              <Center>
                <i className="fa-solid fa-couch" />
              </Center>
              <Center>
                <Checkbox defaultChecked>sofa</Checkbox>
              </Center>
            </Stack>
          </Flex>
          <FormControl>
            <Textarea
              height="180px"
              mb="20px"
              borderRadius="0px"
              placeholder="Edit caption"
              onChange={(e) => {
                formik.setFieldValue("caption", e.target.value);
              }}
            />
            {formik.errors.caption ? (
              <FormHelperText color="red" textAlign="center">
                {formik.errors.caption}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button variant="secondary" w="100%" mb="20px">
            Add Photo
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

export default AddRoom;
