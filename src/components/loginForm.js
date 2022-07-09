import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Store } from "../store";
import { toast } from "react-toastify";

function LoginForm() {
  let [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [submitingText, setSubmitingText] = useState("");

  const { dispatch } = useContext(Store);

  let navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (evt) => {
    setIsLoading(true);
    setSubmitingText("logging...");
    evt.preventDefault();
    const data = { email: email.trim(), password: password.trim() };
    console.log(data);
    axios
      .post(
        "https://sellbackend.creditclan.com/parent/index.php/globalrequest/backendlogin",
        data
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setIsLoading(false);
        setSubmitingText("");
        if (response?.data?.user) {
          localStorage.setItem(
            "wesabiUser",
            JSON.stringify(response.data.user)
          );
          localStorage.setItem("isAdmin", true);
        }

        dispatch({ type: "SAVE_USER", payload: response.data.user });

        if (response.data.status) {
          let pathDirection = location.state?.from?.pathname || "/dashboard";
          if (
            Number(response.data.user.id) === 35011 ||
            Number(response.data.user.id) === 35010
          ) {
            dispatch({ type: "UPDATE_ADMIN", payload: true });

            pathDirection =
              location.state?.from?.pathname || "/dashboard/history";
          }
          toast.success("successfully logged in");
          setSubmitingText("logged In");
          setEmail("");
          setPassword("");
          setTimeout(() => {
            setIsLoading(false);
            navigate(pathDirection, { replace: true });
          }, 1000);
        } else {
          setIsLoading(false);
          toast.error("incorrect email or password");
        }
      })
      .catch((error) => {
        let msg = error?.message
          ? error.message
          : "no or poor internet connection, try it again";
        setIsLoading(false);
        toast.error(msg);
        console.log(error);
      });
  };

  return (
    <>
      <form
        className="w-full mx-auto p-5 ring-1 ring-slate-200 rounded-lg max-w-full mt-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap  mb-3 mx-auto text-center mt-4">
          <div className="w-full flex justify-center ">
            {isLoading ? (
              <h2 className="text-center text-green-500 text-2xl font-medium mb-4">
                {submitingText}
              </h2>
            ) : (
              <>
                {!submitingText && (
                  <h2 className="text-center font-thin mb-4 text-2xl">
                    Sign in to your account
                  </h2>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col  space-y-6 mx-auto w-full items-center">
            <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full appearance-none block  bg-gray-200 text-gray-700 border order-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane@gmail.com"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full appearance-none block bg-gray-200 text-gray-700 border order-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="password"
                placeholder="your password"
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
              <input
                type="submit"
                value={isLoading ? "logging.." : "login"}
                className="w-full appearance-none block bg-myColor text-gray-700 border order-gray-200 rounded py-3 px-4 mb-3 leading-tight cursor-pointer focus:outline-none font-medium"
                style={{ color: "white" }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
