import React, {useCallback, useEffect, useRef, useState} from "react";
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
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select as Select2,
} from "chakra-react-select";
import {Link} from "react-router-dom";
import Layout from "../../Components/Layout";

import {useFormik} from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";

import Footer from "../../Components/Footer";
import NavbarMobile from "../../Components/NavbarMobile";
import {getValue} from "@testing-library/user-event/dist/utils";
import axios from "axios";
import {useSelector} from "react-redux";

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
  const [tenantId, setTenantId] = useState('')
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [firebaseProviderId, setfirebaseProviderId] = useState("password");
  const [dropBank, setDropBank] = useState([])
  const [selectedBank, setSelectedBank] = useState([])
  const [profilePic, setProfilePic] = useState('')
  const {id} = useSelector(state => state.user)

  const fetchDropdown = useCallback(async () => {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tenant/dropdown-bank`)
      .then((res) => {
        setDropBank(res.data.dropdownBank)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [setDropBank])

  useEffect(() => {
    fetchDropdown()
  }, [fetchDropdown])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/tenant/get-tenant`,
        {params: {id: id}}
      );

      setTenantId(response.data.result.id)
      setName(response.data.result.name);
      setPhoneNumber(response.data.result.phoneNumber);
      setEmail(response.data.result.User.email);
      setBank(response.data.result.BankId);
      setAccount(response.data.result.bankAccountNumber);
      setProfilePic(`${process.env.REACT_APP_BACKEND_BASE_URL}${response.data.result.User.Profile?.profilePic}`)

      formik.values.name = response.data.result.name;
      formik.values.phoneNumber = response.data.result.phoneNumber;
      formik.values.email = response.data.result.User.email;
      formik.values.bank = response.data.result.BankId;
      formik.values.account = response.data.result.bankAccountNumber;

      setSelectedBank([{value: 1, label: 'test'}])
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      bank: bank,
      account: account,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("can't be empty"),
      phoneNumber: Yup.string().phone('id').required("can't be empty"),
      email: Yup.string().email("must format email").required("can't be empty"),
      bank: Yup.string().required("cant be empty"),
      account: Yup.string().required("can't be empty")
    }),
    onSubmit: async (values) => {
      values.id = tenantId
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tenant/update`, values)

      setName(values.name);
      setPhoneNumber(values.phoneNumber)
      setEmail(values.email);
      setBank(values.bank);
      setAccount(values.account);
    },
  });

  const updateProfilePic = async (e) => {
    let file = e.target.files[0]

    if (!file.type.match('image.*')) return
    if (file.size > 1048576) return

    let formData = new FormData()
    formData.append("image", e.target.files[0])
    formData.append('id', id)

    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/profilePic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setProfilePic(`${process.env.REACT_APP_BACKEND_BASE_URL}${response.data.result.profilePic}`)
  };
  const proflePicInputRef = useRef(null)

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
              mb={{sm: "0", md: "4em"}}
            >
              {/*Profile header*/}
              <Flex pt="10">
                <Box mr="20px" w="80px" h="80px">
                  <Avatar w="80px" h="80px" src={profilePic}/>
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="600">
                    {name}
                  </Text>

                  <Text
                    textDecoration="underline" fontSize="16px" fontWeight="400" cursor="pointer"
                    _hover={{textDecoration: "underline", fontWeight: "bold"}}
                    onClick={() => proflePicInputRef.current.click()}
                  >
                    Update Photo
                  </Text>
                  <Input type={'file'} accept={'image/*'} onChange={updateProfilePic} hidden ref={proflePicInputRef}/>
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
                    style={{borderBottom: "1px solid"}}
                    id="name"
                    type="text"
                    variant="flushed"
                    placeholder="insert your name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <Text color={'red'}>{formik.errors.name}</Text>
                </FormControl>

                <FormControl mt={"10px"}>
                  <Text>Phone Number</Text>
                  <Input
                    style={{borderBottom: "1px solid"}}
                    id="phoneNumber"
                    type="text"
                    variant="flushed"
                    placeholder="insert your phone number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  />
                  <Text color={'red'}>{formik.errors.phoneNumber}</Text>
                </FormControl>

                <FormControl mt={"10px"}>
                  <Text>Email</Text>
                  <Input
                    style={{borderBottom: "1px solid"}}
                    id="email"
                    type="text"
                    variant="flushed"
                    placeholder="insert your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <Text color={'red'}>{formik.errors.email}</Text>
              </Box>
              {/*Profile form ends*/}

              {/*bank form*/}
              <Box pt="10">
                <Heading as="h1" size="md">
                  Bank Account
                </Heading>

                <FormControl mt={"10px"}>
                  <Text>Bank Name</Text>
                  <Select value={formik.values.bank} onChange={(e) => {
                    formik.setFieldValue('bank', e.target.value)
                  }}>
                    {
                      dropBank.map(bank => <option key={`bank-option-${bank.id}`} value={bank.id}>{bank.name}</option>)
                    }
                  </Select>
                  <Text color={'red'}>{formik.errors.bank}</Text>
                </FormControl>

                <FormControl mt={"10px"}>
                  <Text>Account Number</Text>
                  <Input
                    style={{borderBottom: "1px solid"}}
                    id="account"
                    type="text"
                    variant="flushed"
                    placeholder="insert your Account Bank"
                    value={formik.values.account}
                    onChange={formik.handleChange}
                  />
                  <Text color={'red'}>{formik.errors.account}</Text>
                </FormControl>
              </Box>
              {/*bank form ends*/}

              <Box pt="10">
                <FormControl mt={"10px"}>
                  <Button variant={'primary'} onClick={() => {
                    formik.submitForm()
                  }}>Save Changes</Button>
                </FormControl>
              </Box>

              <Box h="max-content" pt="16px" pb="30px">
                <Text
                  textDecoration="underline"
                  _hover={{textDecoration: "underline", fontWeight: "bold"}}
                >
                  <Link to="/settings/password">Change Password</Link>
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
