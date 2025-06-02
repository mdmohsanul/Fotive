import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAppDispatch } from "./app/store";
import { checkAuth } from "./features/auth/authThunks";

function App() {
  const dispatch = useAppDispatch();
  // const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
