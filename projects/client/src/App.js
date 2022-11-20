import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./Components/Test";
import PropertyList from './Pages/PropertyList'

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
              <Route component={PropertyList} path="/list" />
              <Route component={Test} path="/" />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
