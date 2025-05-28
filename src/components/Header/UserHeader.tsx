import { useAppDispatch, useAppSelector } from "@/app/store";
// import Fotive from "/fotive-logo-dark-small.png";
import Fotive from "/test.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/features/auth/authThunks";
import { RxCross2 } from "react-icons/rx";

const UserHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showUser, setShowUser] = useState<boolean>(false);

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
    <>
      <div className="fixed top-0 w-full z-30">
        <div className="max-w-screen mx-auto  backdrop-blur-2xl">
          <div className="flex items-center justify-between py-1 px-7">
            <img src={Fotive} alt="logo" loading="lazy" className="" />
            <div className="relative">
              <button
                onMouseOver={hoverHandler}
                onMouseLeave={() => setShowDetails(false)}
                onClick={userHandler}
                className="cursor-pointer"
              >
                <img
                  src={user?.avatar}
                  alt="user_image"
                  loading="lazy"
                  className="h-10 w-10"
                />
              </button>
              {showDetails && (
                <p className="absolute -bottom-12 right-2 rounded-md bg-black/65 text-white py-1 px-2 text-sm">
                  <span>{user?.userName.toUpperCase()}</span>
                  <span> {user?.email}</span>
                </p>
              )}
              {showUser && (
                <div className="absolute -bottom-[300px] right-2 rounded-md bg-[#f0f4f9] text-stone-800 p-4 w-96 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div className="h-4 w-4 absolute -top-2 right-10 bg-[#f0f4f9] rotate-45"></div>
                  <div className="flex items-center justify-center flex-col gap-3">
                    <span className="text-black"> {user?.email}</span>

                    <img
                      src={user?.avatar}
                      alt="user_image"
                      loading="lazy"
                      className="h-24 w-24 "
                    />
                    <span className="text-stone-950 text-xl">
                      Hi, {user?.userName.toUpperCase()}!
                    </span>
                    <button
                      onClick={logoutHandler}
                      className="bg-emerald-800 text-white px-3 py-2 cursor-pointer my-3"
                    >
                      Logout
                    </button>
                    <button
                      className="absolute top-4 right-5 cursor-pointer "
                      onClick={() => setShowUser(false)}
                    >
                      {" "}
                      <RxCross2 size={25} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default UserHeader;
