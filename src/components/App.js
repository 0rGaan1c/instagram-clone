import React from "react";
import { UserProvider } from "../contexts/UserProvider";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ImageUpload from "./ImageUpload";
import Post from "./Post";
import DiscoverPeople from "./DiscoverPeople";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";
import DislikeList from "./DislikeList";

const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />
            <PrivateRoute
              path="/:username/discover"
              component={DiscoverPeople}
            />
            <PrivateRoute
              exact
              path="/:username/upload"
              component={ImageUpload}
            />
            <PrivateRoute
              exact
              path="/:username/followers"
              component={FollowersList}
            />
            <PrivateRoute
              exact
              path="/:username/following"
              component={FollowingList}
            />
            <PrivateRoute exact path="/:username" component={Profile} />
            <PrivateRoute
              exact
              path="/:username/edit"
              component={EditProfile}
            />
            <PrivateRoute exact path="/:username/post/:id" component={Post} />
            <PrivateRoute
              exact
              path="/:username/post/:id/dislikes"
              component={DislikeList}
            />
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
