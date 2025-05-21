import { useAppSelector } from "../app/store";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Hi, {user?.userName}</h2>
      <img src={user?.avatar} alt="userImage" width={"100px"} />
    </>
  );
};

export default Dashboard;
