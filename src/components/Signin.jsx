import React from "react";
// import { FaFacebookSquare, FaGooglePlusSquare } from "react-icons/fa";
import { StyledAuth, signOut } from "../services/firebase";
import { useUser } from "../contexts/UserProvider";

const SignUp = () => {
  const { currentUser } = useUser();
  return (
    <>
      {currentUser ? (
        <div>
          <h1>Hello, {currentUser.displayName}</h1>
          <p className="bg-red-500" onClick={signOut}>
            Sign out
          </p>
        </div>
      ) : (
        <StyledAuth />
      )}
      {/* <main className="w-11/12 mx-auto">
        <div className="mt-64 text-center">
          <h1 className="font-bold text-4xl">Instagram</h1>
          <div className="mt-14 w-80 mx-auto">
            <div className="signup-button bg-fblue">
              <FaFacebookSquare className="text-2xl mr-2" />
              SignIn with Facebook
            </div>
            <div className="signup-button bg-gred">
              <FaGooglePlusSquare className="text-2xl mr-2" /> SignIn with
              Google
            </div>
          </div>
        </div>
        <div className="w-11/12 absolute bottom-0 text-center ml-auto mb-2">
          <div className="text-gray-300 font-bold">From </div>
          <div className="text-ipink font-bold text-lg tracking-wide cursor-pointer">
            <a href="https://www.instagram.com/">Instagram</a>
          </div>
        </div>
      </main> */}
    </>
  );
};

export default SignUp;
