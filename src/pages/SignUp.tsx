import SignUpForm from "@/components/SignUpForm";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl text-start">Fotive</h1>
        <div className="max-w-md mx-auto  border border-gray-200 rounded-md p-7 shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-5">
          <h1 className="text-2xl text-gray-900 text-start pb-5 font-bold">
            Sign up
          </h1>
          <SignUpForm setShowPopup={setShowPopup} />
        </div>
        <p>
          <span>Already Registered? </span>
          <Link
            to="/login"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Log in now
          </Link>
        </p>
      </div>
      <div>{showPopup}</div>
    </>
  );
};

export default SignUp;
