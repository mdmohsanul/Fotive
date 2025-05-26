import { useAppSelector } from "@/app/store";
import Fotive from "/fotive-logo-dark-small2.png";
import { useState } from "react";

const UserHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const hoverHandler = () => {
    setShowDetails(true);
  };
  return (
    <>
      <div className="fixed top-0 w-full">
        <div className="max-w-screen mx-auto bg-white shadow-xl">
          <div className="flex items-center justify-between py-2 px-7">
            <img src={Fotive} alt="logo" loading="lazy" className="" />
            <div className="relative">
              <button
                onMouseOver={hoverHandler}
                onMouseLeave={() => setShowDetails(false)}
                className="cursor-pointer"
              >
                <img
                  src={user?.avatar}
                  alt="user_image"
                  loading="lazy"
                  className="h-12 w-12"
                />
              </button>
              {showDetails && (
                <p className="absolute -bottom-15 right-2 rounded-md bg-black/50 text-white py-1 px-2">
                  <span>{user?.userName.toUpperCase()}</span>
                  <span> {user?.email}</span>
                </p>
              )}
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default UserHeader;
