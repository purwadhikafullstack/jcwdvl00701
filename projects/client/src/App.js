import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./Components/Test";
import LoginUser from "./Page/User/loginUser";
import RegisterUser from "./Page/User/registerUser";
import LoginTenant from "./Page/Tenant/loginTenant";
import RegisterTenant from "./Page/Tenant/registerTenant";
import BookingHistory from "./Page/User/bookingHistory";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={RegisterTenant} path="/tenant/register" />
          <Route component={LoginTenant} path="/tenant/login" />
          <Route component={RegisterUser} path="/register" />
          <Route component={LoginUser} path="/login" />

          <Route component={BookingHistory} path="/booking-history" />
          <Route component={Test} path="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
