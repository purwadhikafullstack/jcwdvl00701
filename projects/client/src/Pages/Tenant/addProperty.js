import {
  Box,
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Image,
  Select,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../../Components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";

function AddProperty() {
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  let history = useHistory();
  const tenantId = "test";

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    let preview = document.getElementById("imgpreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
    formik.setFieldValue("picture", event.target.files[0]);
  };

  // formik

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      picture: selectedFile,
      categoryId: 0,
      rules: "",
      tenantId: 1,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("required"),
      description: Yup.string().required("required"),
      picture: Yup.string().required("required"),
      categoryId: Yup.number().required("required"),
      rules: Yup.string().required("required"),
    }),

    validateOnChange: false,
    onSubmit: async (value) => {
      console.log("tess", value);
      const { name, description, picture, categoryId, rules, tenantId } = value;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("picture", picture);
      formData.append("categoryId", categoryId);
      formData.append("rules", rules);
      formData.append("tenantId", tenantId);

      console.log("berhasil masuk formik");

      await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/property/post`, formData)
        .then(async (res) => {
          console.log(res.data);
          history.push("/tenant/property");
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  });

  return (
    <Layout>
      <Box mt="80px">
        <Container mt="100px" maxW="1140px">
          <Flex mb="10px" w="100%" mx="auto">
            <Link to="/tenant/property">
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
              Add New Property
            </Text>
          </Flex>
        </Container>
        <Container maxW="1140px">
          <Image
            src={"/Assets/add_photo.png"}
            id="imgpreview"
            alt="Room image"
            width="100%"
            height="210px"
            me="10px"
            mt="5px"
            mb="20px"
            overflow="hiden"
            objectFit="cover"
          />

          <FormControl pb="20px" id="name">
            <Input
              type="text"
              placeholder="Name Property"
              borderRadius="0"
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
            />
            {formik.errors.name ? (
              <FormHelperText color="red" textAlign="center">
                {formik.errors.name}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl>
            <Select
              mb="20px"
              placeholder="Location"
              borderRadius={0}
              borderColor="rgba(175, 175, 175, 1)"
              onChange={(e) => {
                formik.setFieldValue("categoryId", parseInt(e.target.value));
              }}
            >
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
            {formik.errors.categoryId ? (
              <FormHelperText color="red" textAlign="center">
                {formik.errors.categoryId}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <Textarea
              id="description"
              height="180px"
              mb="20px"
              borderRadius="0px"
              placeholder="add description"
              onChange={(e) =>
                formik.setFieldValue("description", e.target.value)
              }
            />
            {formik.errors.description ? (
              <FormHelperText color="red" textAlign="center">
                {formik.errors.description}
              </FormHelperText>
            ) : null}
          </FormControl>
          <FormControl>
            <Textarea
              id="rules"
              height="180px"
              mb="20px"
              borderRadius="0px"
              placeholder="add rules"
              onChange={(e) => formik.setFieldValue("rules", e.target.value)}
            />
            {formik.errors.rules ? (
              <FormHelperText color="red" textAlign="center">
                {formik.errors.rules}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <Input
              onChange={handleFile}
              ref={inputFileRef}
              accept="image/png, image/jpeg"
              display="none"
              type="file"

              // hidden="hidden"
            />
            {formik.errors.picture ? (
              <FormHelperText color="red" textAlign="center">
                {formik.errors.picture}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button
            variant="secondary"
            w="100%"
            mb="20px"
            onClick={() => inputFileRef.current.click()}
          >
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

export default AddProperty;
