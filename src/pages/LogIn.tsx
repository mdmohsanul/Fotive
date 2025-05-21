import { useEffect } from "react";
import GoogleProvider from "../components/GoogleProvider"
import  {GoogleOAuthProvider} from "@react-oauth/google"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
const LogIn = () => {
const navigate = useNavigate()
const {user,accessToken} = useAppSelector(state => state.auth)

console.log(accessToken)
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user,navigate]);
  return (
    <>
    <h1>Login Page</h1>
    
<GoogleOAuthProvider clientId="167949128032-rp6gd2n596a0r7fhhpbhukj06ld8ec9q.apps.googleusercontent.com">
<GoogleProvider/>
</GoogleOAuthProvider>
    </>
  )
}

export default LogIn