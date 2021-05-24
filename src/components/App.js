import React from "react";
import { UserProvider } from "../contexts/UserProvider";
import Signin from "./Signin";

const App = () => {
  return (
    <>
      <UserProvider>
        <Signin />
      </UserProvider>
    </>
  );
};

export default App;
