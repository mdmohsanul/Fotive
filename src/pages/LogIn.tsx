import { useEffect } from "react";
import GoogleProvider from "../components/GoogleProvider"
import  {GoogleOAuthProvider} from "@react-oauth/google"
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import LoginForm from "@/components/LoginForm";
import Fotive from "/fotive-logo-dark-big.png";

const LogIn = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <img src={Fotive} alt="logo" loading="lazy" className="pt-3" />

        <div className="max-w-md mx-auto  border border-gray-200 rounded-md p-7 shadow-[0_3px_10px_rgb(0,0,0,0.2)] my-5">
          <h1 className="text-3xl text-gray-900 text-start pb-5 font-medium">
            Sign in
          </h1>
          <LoginForm />
          <div className="flex items-center gap-4 text-gray-500 text-sm py-5">
            <div className="flex-1 border-t border-gray-300" />
            <span className="uppercase">or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          <GoogleOAuthProvider clientId="167949128032-rp6gd2n596a0r7fhhpbhukj06ld8ec9q.apps.googleusercontent.com">
            <GoogleProvider />
          </GoogleOAuthProvider>
        </div>
        <p className="text-center">
          <span>New to Fotive? </span>
          <Link
            to="/signup"
            className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-3 decoration-blue-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </>
  );
};

export default LogIn