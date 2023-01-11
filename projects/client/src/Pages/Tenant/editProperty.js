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
  Alert,
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
  const [pic, setPic] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [category, setCategory] = useState([]);
  const [id, setId] = useState(0);
  const [fileSizeMsg, setFileSizeMsg] = useState("");

  const tenantId = 1;
  let history = useHistory();

  const handleFile = (event) => {
    if (event.target.files[0].size / 1024 > 1024) {
      setFileSizeMsg("File size is greater than maximum limit");
    } else {
      setSelectedFile(event.target.files[0]);
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(event.target.files[0]);
      formik.setFieldValue("pic", event.target.files[0]);
    }
  };
  // get data kategori (lokasi)
  async function fetchCategory() {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/property/seeders`)
      .then((res) => {
        setCategory(res.data.results);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  function renderCategory() {
    return category.map((val) => {
      return (
        <option key={val.id} value={val.id}>
          {val.location}
        </option>
      );
    });
  }

  async function fetchProperty() {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/property/get/edit/${props.match.params.propertyId}`
      )
      .then((res) => {
        setName(res.data.name);
        setOld_img(res.data.pic);
        setCategoryId(res.data.categoryId);
        setDescription(res.data.description);
        setRules(res.data.rules);
        setId(res.data.id);

        formik.values.name = res.data.name;

        formik.values.categoryId = res.data.categoryId;
        formik.values.description = res.data.description;
        formik.values.rules = res.data.rules;
        formik.values.old_img = res.data.pic;
        formik.values.id = res.data.id;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      name,
      description,
      pic: selectedFile,
      categoryId,
      rules,
      id,
      old_img,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("name cannot be empty"),
      description: Yup.string().required("description cannot be empty"),

      categoryId: Yup.number().required("category cannot be empty"),
      rules: Yup.string().required("rules cannot be empty"),
      old_img: Yup.string().required("required old img"),
    }),

    validateOnChange: false,
    onSubmit: async (value) => {
      const { name, description, pic, categoryId, rules, id, old_img } = value;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("pic", pic);
      formData.append("categoryId", categoryId);
      formData.append("rules", rules);
      formData.append("id", id);
      formData.append("old_img", old_img);

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
            src={process.env.REACT_APP_API_BASE_URL + old_img}
            alt="Room image"
            id="imgpreview"
            width="100%"
            height={{ ss: "210px", sm: "210px", sl: "650px" }}
            me="10px"
            mt="5px"
            mb="20px"
            overflow="hiden"
            objectFit="cover"
          />
          <FormControl my="20px">
            <FormHelperText>Max size: 1MB</FormHelperText>
            <Button
              variant="secondary"
              w="100%"
              onClick={() => inputFileRef.current.click()}
            >
              Edit Photo
            </Button>
            {fileSizeMsg ? (
              <Alert status="error" color="red" text="center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <Text ms="10px">{fileSizeMsg}</Text>
              </Alert>
            ) : null}
          </FormControl>
          <FormControl mt="20px" id="name">
            <Input
              type="text"
              placeholder="Name Property"
              borderRadius="0"
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <Alert status="error" color="red" text="center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <Text ms="10px">{formik.errors.name}</Text>
              </Alert>
            ) : null}
          </FormControl>
          <FormControl mt="20px">
            <Select
              mb="20px"
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
              <Alert status="error" color="red" text="center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <Text ms="10px">{formik.errors.categoryId}</Text>
              </Alert>
            ) : null}
          </FormControl>
          <FormControl mb="20px">
            <Textarea
              id="description"
              height="180px"
              borderRadius="0px"
              placeholder="add description"
              value={formik.values.description}
              onChange={(e) =>
                formik.setFieldValue("description", e.target.value)
              }
            />
            {formik.errors.description ? (
              <Alert status="error" color="red" textAlign="center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <Text ms="10px">{formik.errors.description}</Text>
              </Alert>
            ) : null}
          </FormControl>
          <FormControl mb="20px">
            <Textarea
              id="rules"
              height="180px"
              borderRadius="0px"
              placeholder="add rules"
              value={formik.values.rules}
              onChange={(e) => formik.setFieldValue("rules", e.target.value)}
            />
            {formik.errors.rules ? (
              <Alert status="error" color="red" text="center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <Text ms="10px">{formik.errors.rules}</Text>
              </Alert>
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
          </FormControl>

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
