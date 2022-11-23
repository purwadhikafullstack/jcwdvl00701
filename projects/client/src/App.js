import "./App.css";
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Test from "./Components/Test";
import PropertyList from './Pages/PropertyList';
import PropertyDetail from "./Pages/PropertyDetail";
import LoginUser from "./Page/User/loginUser";
import RegisterUser from "./Page/User/registerUser";
import LoginTenant from "./Page/Tenant/loginTenant";
import RegisterTenant from "./Page/Tenant/registerTenant";
import BookingHistory from "./Page/User/bookingHistory";
import Booking from "./Page/User/booking";
import Payment from "./Page/User/payment";
import ForgotPassword from "./Page/forgotPassword";
import ResetPassword from "./Page/resetPassword";
import ChangePassword from "./Page/changePassword";
import VerifyAccount from "./Page/verifyAccount";
import VerifyForgot from "./Page/verifyForgot";
import Home from "./Pages/Home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={PropertyList} path="/list"/>
          <Route component={PropertyDetail} path="/detail/:id"/>
          <Route component={VerifyForgot} path="/account/password/forgot/verify"/>
          <Route component={VerifyAccount} path="/account/verify"/>
          <Route component={ChangePassword} path="/account/password/change"/>
          <Route component={ResetPassword} path="/account/password/reset"/>
          <Route component={ForgotPassword} path="/account/password/forgot"/>
          <Route component={RegisterTenant} path="/tenant/register"/>
          <Route component={LoginTenant} path="/tenant/login"/>
          <Route component={RegisterUser} path="/register"/>
          <Route component={LoginUser} path="/login"/>
          <Route component={BookingHistory} path="/booking-history"/>
          <Route component={Booking} path="/booking"/>
          <Route component={Payment} path="/payment"/>
          <Route component={Home} path="/"/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
