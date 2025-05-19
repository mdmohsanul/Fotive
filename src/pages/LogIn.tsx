import { useGoogleLogin } from "@react-oauth/google"

const LogIn = () => {

    const responseGoogle = async(authResult) => {
        try{

        }catch(error){
            console.log(error)
        }
    }
    // whenever we click on google auth we have to call one hook useGoogleLogin
    const googleLogin = useGoogleLogin({
        onSuccess:() => {},
        onError:() => {},
        flow:"auth-code"
    }) 
  return (
    <>
    <h1>Login Page</h1>
    <button onClick={googleLogin}>Google Login</button>
    </>
  )
}

export default LogIn