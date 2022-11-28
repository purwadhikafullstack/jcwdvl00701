import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import NavbarTuru from "./Components/NavbarTuru";
import Footer from "./Components/Footer";
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

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarTuru />
        <Switch>
          {/* page tenant */}
          <Route component={RegisterTenant} path="/tenant/register" />
          <Route component={LoginTenant} path="/tenant/login" />
          <Route component={PropertyListTenant} path="/tenant/property" />
          <Route component={RoomListTenant} path="/tenant/room" />
          <Route component={EditProperty} path="/tenant/edit-property" />
          <Route component={AddProperty} path="/tenant/add-property" />
          <Route component={EditRoom} path="/tenant/edit-room" />
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
          <Route component={ChangePassword} path="/change-password" />
          <Route component={ResetPassword} path="/reset-password" />
          <Route component={ForgotPassword} path="/forgot-password" />
          <Route component={RegisterUser} path="/register" />
          <Route component={LoginUser} path="/login" />
          <Route component={BookingHistory} path="/booking-history" />
          <Route component={Booking} path="/booking" />
          <Route component={Payment} path="/payment" />
          <Route component={Home} path="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
