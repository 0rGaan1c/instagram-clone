import React from "react";
import { UserProvider } from "../contexts/UserProvider";
import Signin from "../pages/Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ImageUpload from "../pages/ImageUpload";
import Post from "../pages/Post";
import DiscoverPeople from "../pages/DiscoverPeople";
import FollowersList from "../pages/FollowersList";
import FollowingList from "../pages/FollowingList";
import DislikeList from "../pages/DislikeList";
import Comments from "../pages/Comments";

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
            <PrivateRoute
              exact
              path="/:username/post/:id/comments"
              component={Comments}
            />
          </Switch>
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
