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
import { Link, useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Layout from "../../Components/Layout";

import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";

function EditProperty(props) {
  const [propertyData, setPropertyData] = useState([]);
  const [old_img, setOld_img] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [category, setCategory] = useState([]);

  const tenantId = 1;
  let history = useHistory();

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    let preview = document.getElementById("imgpreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
    formik.setFieldValue("picture", event.target.files[0]);
  };
  // get data kategori (lokasi)
  async function fetchCategory() {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/property/seeders`)
      .then((res) => {
        console.log(res.data.results);
        setCategory(res.data.results);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function renderCategory() {
    return category.map((val) => {
      return <option value={val.id}>{val.location}</option>;
    });
  }

  async function fetchProperty() {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/property/get/edit/${props.match.params.propertyId}`
      )
      .then((res) => {
        console.log(res.data);

        setName(res.data.name);
        setPicture(res.data.picture);
        setCategoryId(res.data.categoryId);
        setDescription(res.data.description);
        setRules(res.data.rules);

        formik.values.name = res.data.name;
        formik.values.picture = res.data.picture;
        formik.values.categoryId = res.data.categoryId;
        formik.values.description = res.data.description;
        formik.values.rules = res.data.rules;
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      name,
      description,
      picture: selectedFile,
      categoryId,
      rules,
      tenantId: 1,
      old_img,
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
      formData.append("old_img", old_img);

      console.log("berhasil masuk formik");

      await axios
        .patch(`${process.env.REACT_APP_API_BASE_URL}/property/edit`, formData)
        .then(async (res) => {
          console.log(res.data);
          history.push("/tenant/property");
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
  });

  useEffect(() => {
    fetchCategory();
    fetchProperty();
  }, []);

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
              Edit Property
            </Text>
          </Flex>
        </Container>
        <Container maxW="1140px">
          <Image
            src={
              process.env.REACT_APP_API_BASE_URL + "/" + formik.values.old_img
            }
            alt="Room image"
            id="imgpreview"
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
              value={formik.values.name}
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
              value={formik.values.categoryId}
              borderColor="rgba(175, 175, 175, 1)"
              onChange={(e) => {
                formik.setFieldValue("categoryId", parseInt(e.target.value));
              }}
            >
              {renderCategory()}
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
              value={formik.values.description}
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
              value={formik.values.rules}
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

export default EditProperty;
