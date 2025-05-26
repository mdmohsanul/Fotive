import UserHeader from "@/components/Header/UserHeader"
import Sidebar from "@/components/Sidebar"
import { Outlet } from "react-router-dom"

const Dashboard_Layout = () => {
  return (
    <div className="relative bg-[#f0f4f9]">
      <UserHeader />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard_Layout