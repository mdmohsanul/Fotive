import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { logoutUser } from "../features/auth/authThunks";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Hi, {user?.userName}</h2>
      <img src={user?.avatar} alt="userImage" width={"100px"} />
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Dashboard;
