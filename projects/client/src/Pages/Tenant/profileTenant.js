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
import { useSelector } from "react-redux";

// function renderInput(isEditActive, props) {
//   return React.Children.map(props.children, (child) => {
//     return React.cloneElement(child, {
//       disabled: !isEditActive,
//     });
//   });
// }

// function UpdateInput(props) {
//   const [isEditActive, setIsEditActive] = useState(false);
//   const [isEditingForm, setIsEditingForm] = props.formState;
//   const [isLoading, setIsLoading] = useState(false);

//   const handleEdit = async () => {
//     if (props.errorMsg) return; // if there's error prevent submission

//     if (isEditActive) {
//       setIsLoading(true);
//       props.formik.submitForm();
//     }
//     setIsEditActive((current) => !current);
//     setIsEditingForm((current) => !current);
//     setIsLoading(false);
//   };

//   return (
//     <Box h="max-content" mt={5}>
//       <Flex justifyContent="space-between" align="center">
//         <Text>{props.inputDisplayName}</Text>
//         <Button
//           onClick={handleEdit}
//           variant="link"
//           disabled={isEditingForm && !isEditActive}
//           isLoading={isLoading}
//         >
//           {!isEditActive ? "Edit" : "Save"}
//         </Button>
//       </Flex>

//       {renderInput(isEditActive, props)}

//       {props.errorMsg ? <Text color={"red"}>*{props.errorMsg}</Text> : null}
//     </Box>
//   );
// }

// const UpdateSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "Too Short!")
//     .max(255, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   bank: Yup.string().required("Required"),
//   account: Yup.number().required("cant be "),
// });

function Profile() {
  const userId = "test";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [firebaseProviderId, setfirebaseProviderId] = useState("password");
  const [dropBank , serDropBank]= useState([])
  const {id} = useSelector(state => state.user)
  console.log(id);
  
  const fetchDropdown = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/tenant/dropdown-bank`)
    .then((res) => {
      console.log(res.data.dropdownBank);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/tenant/get-tenant`,
        { params: { id: id } }
      );
      // console.log(response.data.result);
      // console.log(response.data.result?.User?.email);
      // console.log(response.data.result?.BankId);
      // console.log(response.data.result?.bankAccountNumber);

      setName(response.data.result?.name);
      setEmail(response.data.result?.User?.email);
      setBank(response.data.result?.BankId);
      setAccount(response.data.result?.bankAccountNumber);
      formik.values.name = response.data?.result?.name;
      formik.values.email = response.data?.result?.User?.email;
      formik.values.bank = response.data?.result?.BankId;
      formik.values.account = response.data?.result?.bankAccountNumber;
    };
    fetchData();
    fetchDropdown()
  }, [name, email, bank, account]);

  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
      bank: bank,
      account: account,
    },
    validationSchema: Yup.object().shape({
      name : Yup.string().required("can't be empty"),
      email : Yup.string().email("must format email").required("can't be empty"),
      bank : Yup.string().required("cant be empty"),
      account : Yup.number("must number").required("can't be empty")
    }),
    onSubmit: async (values) => {
     console.log(values);

      setName(values.name);
      setEmail(values.email);
      setBank(values.bank);
      setAccount(values.account);
    },
  });

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

               <FormControl mt={"10px"}>
                <Text>Name</Text>
                  <Input
                    style={{ borderBottom: "1px solid" }}
                    id="name"
                    type="text"
                    variant="flushed"
                    placeholder="insert your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
               </FormControl>
                

                {firebaseProviderId === "password" ? (
                <FormControl mt={"10px"}>
                  <Text>Email</Text>
                  <Input
                    style={{ borderBottom: "1px solid" }}
                    id="email"
                    type="text"
                    variant="flushed"
                    placeholder="insert your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
               </FormControl>
                ) : null}
              </Box>
              {/*Profile form ends*/}

              {/*bank form*/}
              <Box pt="10">
                <Heading as="h1" size="md">
                  Bank Account
                </Heading>

                {/* <UpdateInput
                  inputDisplayName={"Bank"}
                  formik={formik}
                  errorMsg={formik.errors.bank}
                  // formState={[isEditingForm, setIsEditingForm]}
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
                </UpdateInput> */}

                <FormControl mt={"10px"}>
                  <Text>Account</Text>
                  <Input
                    style={{ borderBottom: "1px solid" }}
                    id="Account"
                    type="text"
                    variant="flushed"
                    placeholder="insert your Account Bank"
                    value={formik.values.account}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Box>
              {/*bank form ends*/}

              <Box h="max-content" pt="16px" pb="30px" border={"1px"}>
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
