import { useAppDispatch, useAppSelector } from "@/app/store";
import FotiveSmall from "../../../public/fotive-small.png";
import Fotive from "/test.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/features/auth/authThunks";
import { RxCross2 } from "react-icons/rx";

const UserHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const hoverHandler = () => {
    setShowDetails(true);
  };

  const userHandler = () => {
    setShowUser(!showUser);
    setShowDetails(false);
  };

  const logoutHandler = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-30  backdrop-blur-md shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-1">
          {/* Logo Section */}
          <div>
            <img
              src={FotiveSmall}
              alt="logo"
              loading="lazy"
              className="block md:hidden "
            />
            <img
              src={Fotive}
              alt="logo"
              loading="lazy"
              className="hidden md:block "
            />
          </div>

          {/* User Section */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={userHandler}
              onMouseOver={hoverHandler}
              onMouseLeave={() => setShowDetails(false)}
              className="cursor-pointer"
            >
              <img
                src={user?.avatar}
                alt="user avatar"
                className="md:h-10 md:w-10 h-8 w-8  rounded-full object-cover"
              />
            </button>

            {/* Hover Tooltip */}
            {showDetails && !showUser && (
              <div className="absolute -bottom-12 right-0 bg-black/70 text-white text-sm rounded-md py-1 px-3 whitespace-nowrap z-10">
                <span>{user?.userName.toUpperCase()}</span>
                <span className="ml-1">{user?.email}</span>
              </div>
            )}

            {/* User Dropdown */}
            {showUser && (
              <div className="absolute top-14 right-0 w-[90vw] max-w-sm bg-[#f0f4f9] text-stone-800 p-4 rounded-lg shadow-lg z-20">
                <div className="absolute -top-2 right-10 w-4 h-4 bg-[#f0f4f9] rotate-45"></div>
                <button
                  className="absolute top-3 right-4 text-gray-600 hover:text-black"
                  onClick={() => setShowUser(false)}
                >
                  <RxCross2 size={24} />
                </button>

                <div className="flex flex-col items-center text-center gap-3 mt-4">
                  <img
                    src={user?.avatar}
                    alt="user avatar"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <span className="text-xl font-semibold text-gray-900">
                    Hi, {user?.userName.toUpperCase()}!
                  </span>
                  <span className="text-gray-700 text-sm">{user?.email}</span>

                  <button
                    onClick={logoutHandler}
                    className="bg-emerald-800 text-white px-4 py-2 rounded-md mt-3 hover:bg-emerald-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
