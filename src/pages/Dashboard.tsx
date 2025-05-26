import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import { logoutUser } from "../features/auth/authThunks";
import UserHeader from "@/components/Header/UserHeader";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };
  return (
    <>
      <div className="relative">
        <UserHeader />
      </div>
      <Sidebar />
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};

export default Dashboard;
