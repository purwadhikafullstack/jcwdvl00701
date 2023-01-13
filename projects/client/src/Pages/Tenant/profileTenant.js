import React, { useEffect, useState } from "react";
import {
  Flex,
  Spacer,
  Image,
  Box,
  Heading,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Avatar,
  Container,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";

import { useFormik } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";

import Footer from "../../Components/Footer";
import NavbarMobile from "../../Components/NavbarMobile";
import { getValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";

function renderInput(isEditActive, props) {
  return React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      disabled: !isEditActive,
    });
  });
}

function UpdateInput(props) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [isEditingForm, setIsEditingForm] = props.formState;
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    if (props.errorMsg) return; // if there's error prevent submission

    if (isEditActive) {
      setIsLoading(true);
      props.formik.submitForm();
    }
    setIsEditActive((current) => !current);
    setIsEditingForm((current) => !current);
    setIsLoading(false);
  };

  return (
    <Box h="max-content" mt={5}>
      <Flex justifyContent="space-between" align="center">
        <Text>{props.inputDisplayName}</Text>
        <Button
          onClick={handleEdit}
          variant="link"
          disabled={isEditingForm && !isEditActive}
          isLoading={isLoading}
        >
          {!isEditActive ? "Edit" : "Save"}
        </Button>
      </Flex>

      {renderInput(isEditActive, props)}

      {props.errorMsg ? <Text color={"red"}>*{props.errorMsg}</Text> : null}
    </Box>
  );
}

const UpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  bank: Yup.string().required("Required"),
  account: Yup.number().required().positive(),
});

function Profile() {
  const userId = "test";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");

  const [firebaseProviderId, setfirebaseProviderId] = useState("password");

  const [isEditingForm, setIsEditingForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
      bank: bank,
      account: account,
    },
    validationSchema: UpdateSchema,
    onSubmit: async (values, { props }) => {
      // if values unchanged then prevent submission
      if (
        values.name === name &&
        values.email === email &&
        values.bank === bank &&
        values.account === account
      )
        return;

      // values.id = userId; // dummy id
      // await axios.post(
      //   `${process.env.REACT_APP_API_BASE_URL}/`,
      //   values
      // );

      setName(values.name);
      setEmail(values.email);
      setBank(values.bank);
      setAccount(values.account);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.get(
      //   `${process.env.REACT_APP_API_BASE_URL}/user/getById`,
      //   { params: { id: userId } }
      // );
      // setName(response.data.result.name);
      // setEmail(response.data.result.email);
      // setBank(response.data.response.bank);
      // setAccount(response.data.response.account);
      // formik.values.name = response.data.result.name;
      // formik.values.email = response.data.result.email;
      // formik.values.bank = response.date.result.bank;
      // formik.values.account = response.date.result.account;
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Container maxW="container.sm" p={0} mt={20}>
        <Container maxW="1140px">
          <Flex
            justifyContent="center"
            alignItems="center"
            direction={["column"]}
          >
            <Box
              width="360px"
              height="max-content"
              pb="20px"
              pl="20px"
              pr="20px"
              mb={{ sm: "0", md: "4em" }}
            >
              {/*Profile header*/}
              <Flex pt="10">
                <Box mr="20px" w="80px" h="80px">
                  <Avatar w="80px" h="80px" />
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="600">
                    {name}
                  </Text>

                  <Text
                    textDecoration="underline"
                    fontSize="16px"
                    fontWeight="400"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    Update Photo
                  </Text>
                </Box>
              </Flex>
              {/*Profile header ends*/}

              {/*Profile form*/}
              <Box pt="10">
                <Heading as="h1" size="md">
                  Tenant Info
                </Heading>

                <UpdateInput
                  inputDisplayName={"Name"}
                  formik={formik}
                  errorMsg={formik.errors.name}
                  formState={[isEditingForm, setIsEditingForm]}
                >
                  <Input
                    style={{ borderBottom: "1px solid" }}
                    id="name"
                    type="text"
                    variant="flushed"
                    placeholder="insert your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </UpdateInput>

                {firebaseProviderId === "password" ? (
                  <UpdateInput
                    inputDisplayName={"Email"}
                    formik={formik}
                    errorMsg={formik.errors.email}
                    formState={[isEditingForm, setIsEditingForm]}
                  >
                    <Input
                      style={{ borderBottom: "1px solid" }}
                      id="email"
                      type="text"
                      variant="flushed"
                      placeholder="insert your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </UpdateInput>
                ) : null}
              </Box>
              {/*Profile form ends*/}

              {/*bank form*/}
              <Box pt="10">
                <Heading as="h1" size="md">
                  Bank Account
                </Heading>

                <UpdateInput
                  inputDisplayName={"Bank"}
                  formik={formik}
                  errorMsg={formik.errors.bank}
                  formState={[isEditingForm, setIsEditingForm]}
                >
                  <Input
                    style={{ borderBottom: "1px solid" }}
                    id="bank"
                    type="text"
                    variant="flushed"
                    placeholder="Bank name"
                    value={formik.values.bank}
                    onChange={formik.handleChange}
                  />
                </UpdateInput>

                <UpdateInput
                  inputDisplayName={"Account"}
                  formik={formik}
                  errorMsg={formik.errors.account}
                  formState={[isEditingForm, setIsEditingForm]}
                >
                  <Input
                    style={{ borderBottom: "1px solid" }}
                    id="account"
                    type="text"
                    variant="flushed"
                    placeholder="insert your Account Bank"
                    value={formik.values.account}
                    onChange={formik.handleChange}
                  />
                </UpdateInput>
              </Box>
              {/*bank form ends*/}

              <Box h="max-content" pt="16px" pb="30px">
                <Text
                  textDecoration="underline"
                  _hover={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  <Link to="/reset-password">Change Password</Link>
                </Text>
              </Box>
            </Box>
          </Flex>

          <Flex justifyContent="center"></Flex>
        </Container>
      </Container>
    </Layout>
  );
}

export default Profile;
