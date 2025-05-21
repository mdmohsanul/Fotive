import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import type { CodeResponse } from "@react-oauth/google";


import { loginWithGoogle } from "../features/auth/authThunks";
import { useAppDispatch } from "../app/store";

import { useLocation, useNavigate } from "react-router-dom";

const GoogleProvider: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<string | null>(null);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/dashboard";

  const handleSuccess = async (authResult: CodeResponse) => {
    try {
      if (authResult.code) {
        const result = await dispatch(loginWithGoogle(authResult.code));

        if ("error" in result && result.error?.message === "Rejected") {
          setErr(result.payload as string);
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setErr("No authorization code received from Google.");
      }
    } catch (error) {
      console.error("Google login failed", error);
      setErr("Something went wrong during login.");
    }
  };

  const handleError = (
    errorResponse: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    console.error("Google login error:", errorResponse);
    setErr(errorResponse.error_description || "Google login failed.");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    flow: "auth-code",
  });

  return (
    <div>
      <button onClick={() => googleLogin()}>Google Login</button>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
};

export default GoogleProvider;
