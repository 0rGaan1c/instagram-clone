import React from "react";
import { UserProvider } from "../contexts/UserProvider";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ImageUpload from "./ImageUpload";

const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />
            <PrivateRoute path="/upload" component={ImageUpload} />
            <PrivateRoute exact path="/:username" component={Profile} />
            <PrivateRoute path="/:username/edit" component={EditProfile} />
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
