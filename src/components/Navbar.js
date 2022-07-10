import React, { useContext } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../store";

const user = {
  name: "Admin",
  email: "admin@gmail.com",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzri64e5uqwijVhAvvNecVwmSmQdWmiJ4dpA&usqp=CAU",
  // "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { isAdmin, wesabiUser } = state;
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
    <div className="fixed top-0 left-0 w-full">
      <Disclosure as="nav" className="bg-myColor">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 font-thin text-xl text-white bg-myColor-transparent rounded-full md:capitalize md:first-letter:font-medium first-letter:text-3xl  md:first-letter:text-4xl first-letter:font-bold">
                    {/* <img
                      className="h-8 w-8 text-white bg-myColor-500 rounded-full"
                      src="assets/img/crlogo.png"
                      alt="Workflow"
                    /> */}
                    Dashboard
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {!isAdmin && wesabiUser && (
                        <Link to="/dashboard">
                          <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium  ring-1 ring-myColor hover:bg-myColor hover:text-slate-200">
                            Dashboard
                          </button>
                        </Link>
                      )}
                      {isAdmin && wesabiUser && (
                        <Link to="/dashboard/history">
                          <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium  ring-1 ring-myColor hover:bg-myColor hover:text-slate-200">
                            History
                          </button>
                        </Link>
                      )}

                      {!isAdmin && wesabiUser && (
                        <Link to="/dashboard/history/myrecord">
                          <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium  ring-1 ring-myColor hover:bg-myColor hover:text-slate-200">
                            History
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="bg-myColor p-1 rounded-full hover:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    </button>

                    <Menu as="div" className="ml-3 relative">
                      <div className="flex">
                        <Menu.Button className="max-w-xs mr-2 bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="/assets/img/av3.JPG"
                            alt=""
                          />
                        </Menu.Button>

                        {/* <Menu.Button
                          className="font-bold text-red-500 bg-white py-1 px-2 rounded-full ml-2 font-mono"
                          onClick={logout}
                        >
                          logout
                        </Menu.Button> */}
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <div>Dashboard</div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="bg-myColor inline-flex  text-white items-center justify-center p-2 rounded-md text-white-400 hover:text-white hover:bg-myColor focus:outline-none focus:ring-1 focus:p-1 focus:ring-offset-1 focus:ring-offset-gray-200 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden bg-myColor">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {!isAdmin && wesabiUser && (
                  <Link to="/dashboard">
                    <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium mhover:text-gray-300 hover:bg-myColor hover:text-white">
                      Dashboard
                    </button>
                  </Link>
                )}
                {isAdmin && wesabiUser && (
                  <Link to="/dashboard/history">
                    <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium mhover:text-gray-300 hover:bg-myColor hover:text-white">
                      History
                    </button>
                  </Link>
                )}
                {!isAdmin && wesabiUser && (
                  <Link to="/dashboard/history/myrecord">
                    <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium mhover:text-gray-300 hover:bg-myColor hover:text-white">
                      History
                    </button>
                  </Link>
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-white">
                <div className="flex justify-between items-center px-5">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-thin leading-none text-white ">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-red-500 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={logout}
                      className="ml-auto font-mono bg-white flex-shrink-0 p-1 rounded-full text-red-500 hover:text-red-300 text-sm focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      logout
                    </button>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Navbar;
