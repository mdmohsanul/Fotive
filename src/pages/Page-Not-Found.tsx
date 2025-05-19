import { useNavigate } from "react-router-dom"


const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div>Page-Not-Found

        <button onClick={() => navigate("/")}>Login</button>
    </div>
  )
}

export default PageNotFound