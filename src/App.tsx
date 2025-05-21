

import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/store";
import { checkAuth } from "./features/auth/authThunks";

function App() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
