import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../store";
import { toast } from "react-toastify";

function NotFound() {
  const navigate = useNavigate();

  const { dispatch } = useContext(Store);

  const styleLoader = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "fixed",
    left: "0px",
    top: "268px",
    width: "100%",
    height: "32%",
  };

  const logout = () => {
    localStorage.removeItem("wesabiUser");
    localStorage.removeItem("isAdmin");
    toast.success("successfully logged out");
    dispatch({ type: "SAVE_USER", payload: null });
    dispatch({ type: "UPDATE_ADMIN", payload: false });
    dispatch({ type: "UPDATE_DOWNLOAD", payload: [] });
    navigate("/");
  };
  return (
    <>
      <div style={styleLoader} className="fs-3">
        <div className="pl-4 ml-4  text-slate-400">
          <div className="flex flex-col items-center">
            <h1 className="text-red-500 text-center text-3xl">
              Page not found
            </h1>
            <button
              className="text-blue-500 hover:underline text-lg"
              onClick={logout}
            >
              back to home page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
