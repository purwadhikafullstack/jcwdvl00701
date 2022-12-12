import "./App.css";
import React, { useEffect, useState } from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import {getAuth} from "firebase/auth"

import PropertyList from "./Pages/User/PropertyList";
import PropertyDetail from "./Pages/User/PropertyDetail";
import LoginUser from "./Pages/User/loginUser";
import RegisterUser from "./Pages/User/registerUser";
import LoginTenant from "./Pages/Tenant/loginTenant";
import RegisterTenant from "./Pages/Tenant/registerTenant";
import BookingHistory from "./Pages/User/bookingHistory";
import Booking from "./Pages/User/booking";
import Payment from "./Pages/User/payment";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/resetPassword";
import ChangePassword from "./Pages/changePassword";
import VerifyAccount from "./Pages/verifyAccount";
import Home from "./Pages/User/Home";
import Profile from "./Pages/User/profile";

import PropertyListTenant from "./Pages/Tenant/propertyListTenant";
import RoomListTenant from "./Pages/Tenant/roomListTenant";
import EditProperty from "./Pages/Tenant/editProperty";
import EditRoom from "./Pages/Tenant/editRoom";
import AddProperty from "./Pages/Tenant/addProperty";
import AddRoom from "./Pages/Tenant/addRoom";
import Report from "./Pages/Tenant/report";
import Order from "./Pages/Tenant/order";
import Price from "./Pages/Tenant/price";
import Dashboard from "./Pages/Tenant/dashboard";
import ProfileTenant from "./Pages/Tenant/profileTenant";
import { authFirebase } from "./Config/firebase";
import {getAuth, onAuthStateChanged, sendEmailVerification, signOut} from "firebase/auth"
import {useHistory} from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import auth_types from "./Redux/Reducers/Types/userTypes";

function App() {
    const [emailVerified, setEmailVerified] = useState("")
    const [userLogin, setUserLogin] = useState({})
    const [firebaseProvider, setFirebaseProvider ] = useState("")
    const [userId , setUserId] = useState("")

    const {id, name, email ,isVerified, firebaseProviderId, tenantId, roleId} = useSelector(state => state.user)
    
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {

    // untuk dpt info user auth
    const auth = getAuth()
    //pengecekan user ada yg login atau tidak
    onAuthStateChanged(auth, (user) => {
      // console.log("onAuthStateChanged :", user);
      if (user) {
        setUserLogin(user)
        setUserId(user.uid)
        alert("ada yg login")
        setFirebaseProvider(user.providerData[0].providerId);
        let emailVerified = user.emailVerified
        setEmailVerified(emailVerified)
        // user.reload()

        // kondisi jika sudah terverifikasi
          if(user.emailVerified){
              alert("your account has been verified")
          } else {
            // kirim email jika belum terverfikasi
            sendEmailVerification(user)
              .then(() => {
                alert("check your email verification")
              })
              .catch((err) => {
                console.error(err)
              })
            alert("Your account has not been verified")
        }

      } else {
        alert("tidak ada yg login")
        // jika tidak ada akan di logout
        auth.signOut()
        history.push("/login")
      }
    })
    //get data dan dimasukan ke redux
     // utk get data ke back-end dan di simpan di redux
      const getDataGlobal = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/redux-user` , {
              params : {
                  id : userId
              }
          })
          .then((res) => {
              // console.log("data get1 :", res.data.globalState);
              // console.log("data get2 :", res.data.results.UserRoles[0]);
              // console.log("data get3 :", res.data.results.Tenant.id);
              if(res.data.globalState === null) {
                alert("loading....")
              } else {
                dispatch({
                    type : auth_types.Redux,
                    payload : {...res.data.globalState , emailVerified}
                  })
              }
          })
          .catch((err) => {
              alert("please registered your account in form register")
              console.error(err.message)
          })
      }
    getDataGlobal()
  }, [userId])
  

    return (
      <BrowserRouter>
        <Switch>
          {/* page tenant */}
          <Route component={RegisterTenant} path="/tenant/register" />
          <Route component={LoginTenant} path="/tenant/login" />
          <Route component={PropertyListTenant} path="/tenant/property" />
          <Route component={RoomListTenant} path="/tenant/room" />
          <Route component={EditProperty} path="/tenant/edit-property" />
          <Route component={AddProperty} path="/tenant/add-property" />
          <Route component={EditRoom} path="/tenant/edit-room/:id" />
          <Route component={AddRoom} path="/tenant/add-room" />
          <Route component={Report} path="/tenant/report" />
          <Route component={Order} path="/tenant/order" />
          <Route component={Price} path="/tenant/price" />
          <Route component={Dashboard} path="/tenant/dashboard" />
          <Route component={ProfileTenant} path="/tenant/profile" />

          {/* page user */}
          <Route component={PropertyList} path="/list" />
          <Route component={PropertyDetail} path="/detail/:id" />
          <Route component={Profile} path="/profile" />
          <Route component={VerifyAccount} path="/verify-account" />
          <Route component={ChangePassword} path="/settings/password" />
          <Route component={ResetPassword} path="/reset-password" />
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={RegisterUser} path="/register" />
          <Route component={LoginUser} path="/login" />
          <Route component={BookingHistory} path="/booking-history" />
          <Route component={Booking} path="/booking" />
          <Route component={Payment} path="/payment" />
          <Route component={Home} path="/" />
        </Switch>
      </BrowserRouter>
    );
}

export default App;
