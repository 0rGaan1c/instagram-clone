import React from "react";
import { StyledAuth } from "../services/auth";
import { useUser } from "../contexts/UserProvider";
import ProfileSetup from "./ProfileSetup";

const Signin = () => {
  const { currentUser } = useUser();

  return (
    <>
      {currentUser ? (
        <div>
          <ProfileSetup />
        </div>
      ) : (
        <main className="w-11/12 mx-auto">
          <div className="mt-64 text-center">
            <h1 className="font-bold text-4xl">Instagram</h1>
            <div className="mt-14 w-80 mx-auto">
              <StyledAuth />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Signin;
