import UserHeader from "@/components/Header/UserHeader"
import Sidebar from "@/components/Sidebar"
import { Outlet, useLocation } from "react-router-dom";

const Dashboard_Layout = () => {
  const { pathname } = useLocation();

  // Routes where you don't want layout
  const hideAlbumLayout = pathname.startsWith("/dashboard/albums/");
  // const hidePhotoLayout = pathname.startsWith("/dashboard/photos");

  if (hideAlbumLayout) {
    return <Outlet />; // ⛔ No Header/Sidebar for this route
  }
  //   if (hideAlbumLayout || hidePhotoLayout) {
  //   return <Outlet />; // ⛔ No Header/Sidebar for this route
  // }
  return (
    <div className="relative bg-[#f0f4f9]">
      <UserHeader />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard_Layout