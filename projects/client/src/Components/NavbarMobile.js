import {
  Box,
  Flex,
  Text,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Button, Center
} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {authFirebase} from "../Config/firebase";
import {getAuth, onAuthStateChanged, sendEmailVerification, signOut} from "firebase/auth";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function NavbarMobile() {
  const [isLargerThan576] = useMediaQuery("(min-width: 576px)");
  const {id, ProfilePic, ProfileName, firebaseProviderId} = useSelector(state => state.user)
  const auth = authFirebase
  const auth2 = getAuth()
  const history = useHistory()
  const [dis, setDis] = useState(true)
  const [verifikasi, setVerifikasi] = useState(false)
  const [verifikasi2, setVerifikasi2] = useState(true)

  const logout = () => {
    signOut(auth)
      .then(() => console.log("signed out"))
      .catch((error) => alert(error));
    history.push("/login")
  }

  const switchToTenant = () => {
    history.push("/tenant/complete-register")
  }

  const bookingHistory = () => {
    history.push("/booking-history")
  }

  const search = () => {
    history.push("/")
  }

  useEffect(() => {
    onAuthStateChanged(auth2, (user) => {
      if (user) {
        setVerifikasi(user.emailVerified)
        console.log('is logged in')
        if (!verifikasi) {
          console.log('is not verified')
          setVerifikasi2(false)
        } else {
          console.log('is verified')
          setVerifikasi2(true)
        }
      }
    })
  }, [verifikasi, verifikasi2])

  const btnHandlerVerification = () => {
    onAuthStateChanged(auth2, (user) => {
      sendEmailVerification(user)
        .then(() => {
          console.log("berhasil");
          setDis(false)
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

  return id ?
    <Box
      bg="white"
      pos="fixed"
      bottom="0"
      w="100%"
      borderTop="1px"
      borderColor="gray.200"
      display={{ss: "inline", sm: "inline", sl: "none"}}
    >
      {
        verifikasi && !verifikasi2 && dis ?
          <Center height={'30px'}>
            <Text
              cursor={"pointer"}
              _hover={{
                fontWeight: "bold",
                textDecoration: "underline"
              }}
              onClick={btnHandlerVerification}
            >
              Resend email verification
            </Text>
          </Center>
          :
          null
      }
      <Flex justifyContent="space-around" py="5px">
        <Box fontSize="22px" textAlign="center" color="black" onClick={search} cursor="pointer">
          <i className="fa-solid fa-magnifying-glass-location"></i>
          <Text fontWeight="regular" fontSize="12px" onClick={search}>
            Search
          </Text>
        </Box>

        <Box fontSize="22px" textAlign="center" color="black" onClick={bookingHistory} cursor="pointer">
          <i className="fa-solid fa-bed"></i>
          <Text fontWeight="regular" fontSize="12px" onClick={bookingHistory}>
            Room
          </Text>
        </Box>

        <Box fontSize="22px" textAlign="center" color="black">
          <Menu>
            <MenuButton fontWeight="regular">
              {
                id ?
                  <Avatar size="sm" my="auto" objectFit={"cover"}
                          src={process.env.REACT_APP_API_BASE_URL + ProfilePic}/>
                  :
                  <i className="fa-solid fa-circle-user"></i>
              }
              {
                id ?
                  <Text fontWeight="regular" fontSize="12px">
                    {ProfileName}
                  </Text>
                  :
                  <Text fontWeight="regular" fontSize="12px">
                    Account
                  </Text>
              }
            </MenuButton>
            <MenuList>
              <MenuItem fontSize="14px" onClick={() => history.push("/profile")}>Profile</MenuItem>
              <MenuDivider/>
              {
                firebaseProviderId === "password" ?
                  <MenuItem onClick={switchToTenant} fontSize="14px">Switch To Tenant</MenuItem>
                  :
                  null
              }
              <MenuDivider/>
              <MenuItem onClick={logout} fontSize="14px">Logout</MenuItem>
              <MenuDivider/>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
    :
    null
}

export default NavbarMobile;
