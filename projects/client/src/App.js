import "./App.css";
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Test from "./Components/Test";
import PropertyList from './Pages/User/PropertyList';
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

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route component={PropertyList} path="/list"/>
            <Route component={PropertyDetail} path="/detail/:id"/>
            <Route component={RegisterTenant} path="/tenant/register" />
            <Route component={LoginTenant} path="/tenant/login" />
            <Route component={Profile} path="/profile" />
            <Route component={VerifyAccount} path="/verify-account" />
            <Route component={ChangePassword} path="/change-password" />
            <Route component={ResetPassword} path="/reset-password" />
            <Route component={ForgotPassword} path="/forgot-password" />
            <Route component={RegisterUser} path="/register" />
            <Route component={LoginUser} path="/login" />
            <Route component={BookingHistory} path="/booking-history" />
            <Route component={Booking} path="/booking" />
            <Route component={Payment} path="/payment" />
            <Route component={Home} path="/"/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
