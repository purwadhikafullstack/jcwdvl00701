import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./Components/Test";
import LoginUser from "./Page/User/loginUser";
import RegisterUser from "./Page/User/registerUser";
import LoginTenant from "./Page/Tenant/loginTenant";
import RegisterTenant from "./Page/Tenant/registerTenant"
import ForgotPassword from "./Page/forgotPassword";
import ResetPassword from "./Page/resetPassword";
import ChangePassword from "./Page/changePassword";
import VerifyAccount from "./Page/verifyAccount";
import VerifyForgot from "./Page/verifyForgot";

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route component={VerifyForgot} path="/account/password/forgot/verify" />
            <Route component={VerifyAccount} path="/account/verify" />
            <Route component={ChangePassword} path="/account/password/change" />
            <Route component={ResetPassword} path="/account/password/reset" />
            <Route component={ForgotPassword} path="/account/password/forgot" />
            <Route component={RegisterTenant} path="/tenant/register" />
            <Route component={LoginTenant} path="/tenant/login" />
            <Route component={RegisterUser} path="/register" />
            <Route component={LoginUser} path="/login" />
            <Route component={Test} path="/" />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
