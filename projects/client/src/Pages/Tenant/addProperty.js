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
import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../../Components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import axios from "axios";

function AddProperty() {
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [fileSizeMsg, setFileSizeMsg] = useState("");
  let history = useHistory();
  const { TenantId, firebaseProviderId } = useSelector((state) => state.user);
  console.log(TenantId);

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

  // formik

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      pic: selectedFile,
      categoryId: null,
      rules: "",
      tenantId: TenantId,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("name cannot be empty"),
      description: Yup.string().required("description cannot be empty"),
      pic: Yup.string().required("picture cannot be empty"),
      categoryId: Yup.number().required("category cannot be empty").typeError("category cannot be empty"),
      rules: Yup.string().required("rules cannot be empty"),
    }),

    validateOnChange: false,
    onSubmit: async (value) => {
      console.log("tess", value);
      const { name, description, pic, categoryId, rules, tenantId } = value;

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("pic", pic);
      formData.append("categoryId", categoryId);
      formData.append("rules", rules);
      formData.append("tenantId", TenantId);

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

  useEffect(() => {
    fetchCategory();
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
                me="10px"
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
          <FormControl>
            <Image
              src={"/Assets/add_photo.png"}
              id="imgpreview"
              alt="Room image"
              width="100%"
              height={{ ss: "210px", sm: "210px", sl: "650px" }}
              me="10px"
              mt="20px"
              overflow="hiden"
              objectFit="cover"
            />
            {formik.errors.pic ? (
              <Alert status="error" color="red" text="center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <Text ms="10px">picture cannot be empty</Text>
              </Alert>
            ) : null}
          </FormControl>
          <FormControl mt="20px">
            <FormHelperText>Max size: 1MB</FormHelperText>
            <Button
              variant="secondary"
              w="100%"
              onClick={() => inputFileRef.current.click()}
            >
              Add Photo
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
            />
            {formik.errors.name ? (
              <Alert status="error" color="red" text="center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <Text ms="10px">{formik.errors.name}</Text>
              </Alert>
            ) : null}
          </FormControl>
          <FormControl>
            <Select
              mt="20px"
              placeholder="Location"
              borderRadius={0}
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

          <FormControl>
            <Textarea
              id="description"
              height="180px"
              mt="20px"
              borderRadius="0px"
              placeholder="add description"
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
          <FormControl>
            <Textarea
              id="rules"
              height="180px"
              mt="20px"
              borderRadius="0px"
              placeholder="add rules"
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
            mt="20px"
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
