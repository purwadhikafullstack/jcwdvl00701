import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./Components/Test";

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route component={Test} path="/" />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
