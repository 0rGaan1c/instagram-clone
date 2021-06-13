import React from "react";
import { UserProvider } from "../contexts/UserProvider";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ImageUpload from "./ImageUpload";
import Post from "./Post";

const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />
            <PrivateRoute
              exact
              path="/:username/upload"
              component={ImageUpload}
            />
            <PrivateRoute exact path="/:username" component={Profile} />
            <PrivateRoute
              exact
              path="/:username/edit"
              component={EditProfile}
            />
            <Route path="/:username/post/:id" component={Post} />
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
