import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import CompleteFormTenant from "./Pages/Tenant/completeFormTenant";
import CompleteFormUser from "./Pages/User/completeFromUser";
import { authFirebase } from "./Config/firebase";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import auth_types from "./Redux/Reducers/Types/userTypes";
import UserRoute from "./Components/User/UserRoute";
import TenantRoute from "./Components/Tenant/TenantRoute";
import Loading from "./Components/Loading";
import NotFound from "./Pages/notFound";

function App() {
  const [emailVerified, setEmailVerified] = useState("");
  const [userLogin, setUserLogin] = useState({});
  const [firebaseProvider, setFirebaseProvider] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id, email, UserRoles, Tenant } = useSelector((state) => state.user);

  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // untuk dpt info user auth
    const auth = getAuth();
    //pengecekan user ada yg login atau tidak
    onAuthStateChanged(auth, (user) => {
      // console.log("onAuthStateChanged :", user);

      if (user) {
        // console.log(user);
        setUserLogin(user);
        setUserId(user.uid);
        setFirebaseProvider(user.providerData[0].providerId);
        setEmailVerified(user.emailVerified);
        console.log("ada yg login");
        history.push("/");
        // kondisi jika sudah terverifikasi
        if (user.emailVerified) {
          console.log("your account has been verified");
        } else {
          // kirim email jika belum terverfikasi
          sendEmailVerification(user)
            .then(() => {
              alert("check your email verification");
            })
            .catch((err) => {
              console.error(err);
            });
          console.log("Your account has not been verified");
        }
      } else {
        console.log("tidak ada yg login");
        // jika tidak ada akan di logout
        auth.signOut();
        history.push("/login");
      }
    });
    //get data dan dimasukan ke redux
    // utk get data ke back-end dan di simpan di redux
    const getDataGlobal = () => {
      setIsLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/user/redux-user`, {
          params: {
            id: userId,
          },
        })
        .then((res) => {
          // console.log("data get1 :", res.data.globalState);
          // console.log("data get2 :", res.data.results.UserRoles);
          // console.log("data get3 :", res.data.results.Tenant.id);
          if (res.data.globalState === null) {
            console.log("loading...");
          } else {
            res.data.globalState.UserRoles = res.data.globalState.UserRoles.map(
              (val) => {
                // console.log(val);
                return val.roleId;
              }
            );
            if (res.data.globalState.Tenant === null) {
              res.data.globalState.Tenant = 0;
            }
            if (res.data.globalState.Profile === null) {
              res.data.globalState.Profile = 0;
            }
            // console.log("data get2 :", res.data.globalState);
            dispatch({
              type: auth_types.Redux,
              payload: {
                id: res.data.globalState.id,
                email: res.data.globalState.email,
                emailVerified,
                firebaseProviderId: res.data.globalState.firebaseProviderId,
                UserRoles: res.data.globalState.UserRoles,
                TenantId: res.data.globalState.Tenant.id || 0,
                TenantName: res.data.globalState?.Tenant?.name,
                ProfileName: res.data.globalState?.Profile?.name,
                ProfilePic: res.data.globalState?.Profile?.profilePic,
              },
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          // alert("please registered your account in form register")
          console.error(err.message);
          setIsLoading(false);
        });
    };
    getDataGlobal();
  }, [userId]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <BrowserRouter>
        <Switch>
          {/* page tenant */}
          <TenantRoute
            component={RegisterTenant}
            path="/tenant/register"
            exact
          />
          <TenantRoute component={LoginTenant} path="/tenant/login" exact />
          <TenantRoute
            component={PropertyListTenant}
            path="/tenant/property"
            exact
          />
          <TenantRoute component={RoomListTenant} path="/tenant/room" exact />
          <TenantRoute
            component={EditProperty}
            path="/tenant/edit-property/:propertyId"
            exact
          />
          <TenantRoute
            component={AddProperty}
            path="/tenant/add-property"
            exact
          />
          <TenantRoute
            component={EditRoom}
            path="/tenant/edit-room/:id"
            exact
          />
          <TenantRoute component={AddRoom} path="/tenant/add-room" exact />
          <TenantRoute component={Report} path="/tenant/report" exact />
          <TenantRoute component={Order} path="/tenant/order" exact />
          <TenantRoute component={Price} path="/tenant/price" exact />
          <TenantRoute component={Dashboard} path="/tenant/dashboard" exact />
          <TenantRoute component={ProfileTenant} path="/tenant/profile" exact />
          <Route
            component={CompleteFormTenant}
            path="/tenant/complete-register"
            exact
          />

          {/* page user */}

          <UserRoute component={Profile} path="/profile" exact />
          <UserRoute component={VerifyAccount} path="/verify-account" exact />
          <UserRoute component={BookingHistory} path="/booking-history" exact />
          <UserRoute component={Booking} path="/booking/:id" exact />
          <UserRoute component={Payment} path="/payment/:id" exact />
          <UserRoute component={ResetPassword} path="/reset-password" exact />

          <Route component={RegisterUser} path="/register" exact />
          <Route component={ChangePassword} path="/settings/password" exact />
          <Route component={LoginUser} path="/login" exact />
          <Route component={ForgotPassword} path="/forgot-password" exact />
          <Route component={PropertyList} path="/list" exact />
          <Route component={PropertyDetail} path="/detail/:id" exact />
          <Route component={CompleteFormUser} path="/complete-user" exact />
          <Route component={Home} path="/" exact />
          <Route component={NotFound} path="*" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
