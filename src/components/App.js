import React from "react";
import { UserProvider } from "../contexts/UserProvider";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";

const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />
            <PrivateRoute path="/:name" component={Profile} />
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
