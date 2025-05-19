import GoogleProvider from "../components/GoogleProvider"
import  {GoogleOAuthProvider} from "@react-oauth/google"
const LogIn = () => {

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