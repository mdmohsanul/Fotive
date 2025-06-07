import { useAppDispatch, useAppSelector } from "@/app/store";
import { getAllRegisteredUsers } from "@/features/auth/authThunks";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";


type SharedFormProps = {
  setSharedUserForm: React.Dispatch<React.SetStateAction<boolean>>;
};
const SharedUserForm = ({ setSharedUserForm }: SharedFormProps) => {
  const dispatch = useAppDispatch();
  const { registeredUsers,user } = useAppSelector((state) => state.auth);
  // remove current user from the list
const users = registeredUsers?.filter(usr => usr.userId !== user?.userId)
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    dispatch(getAllRegisteredUsers());
  }, [dispatch]);
  console.log(registeredUsers);
  console.log(users);


  const handleShare = () => {
console.log(selectedUser)
  }
  return (
    <div className=" p-5 min-w-xl bg-white rounded-3xl">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl text-gray-800">Share Album</h1>
        <button
          onClick={() => setSharedUserForm(false)}
          className="text-gray-700 cursor-pointer"
        >
          <RxCrossCircled size={27} />
        </button>
      </div>
      <div>
        <div className="bg-gray-100 rounded-md p-3 w-3/4">
          {selectedUser ? (
            <span>{selectedUser}</span>
          ) : (
            <span>Select user ...</span>
          )}
        </div>
        <div className="bg-gray-100 my-3 max-h-52  overflow-auto rounded-md">
          {users?.map((user) => (
            <li
              key={user.userId}
              className="flex items-center gap-5 p-4 hover:bg-gray-300 cursor-pointer"
              onClick={() => setSelectedUser(user?.email)}
            >
              <span className="p-2 bg-blue-400 text-white rounded-full w-10 flex items-center justify-center">
                {user.userName.charAt(0)}
              </span>
              {user.userName}
            </li>
          ))}
        </div>
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 curspor-pointer my-2" onClick={handleShare}>Share</button>
       
      </div>
    </div>
  );
};

export default SharedUserForm;
