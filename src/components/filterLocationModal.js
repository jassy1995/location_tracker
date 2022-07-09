import { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Store } from "../store";

export default function FilterLocationModal({ open, setOpen, setClose }) {
  const { state, dispatch } = useContext(Store);
  const { phones } = state;
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [phone, setPhone] = useState("");

  const handleStartDateUpdate = (e) => setStartDateValue(e.target.value);
  const handleEndDateUpdate = (e) => setEndDateValue(e.target.value);
  const handleSelectedPhone = (e) => setPhone(e.target.value);
  const fetchFilter = () => {
    console.log(startDateValue?.concat(":00"));
    console.log(endDateValue?.concat(":00"));
    dispatch({ type: "RESET_SEARCH_PARAM" });
    dispatch({
      type: "UPDATE_SEARCH_PARAM",
      payload: {
        phone: phone,
        start_time: startDateValue?.concat(":00"),
        end_time: endDateValue?.concat(":00"),
      },
    });
    setStartDateValue("");
    setEndDateValue("");
    setPhone("");
    setClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-thin text-gray-900">
                          {" "}
                          Filter Your Location Here{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={setClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                              onClick={setClose}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <div className="-my-6 divide-y divide-gray-200">
                            <div className="border-t divide-y divide-gray-200"></div>
                            <div className="flex py-2 flex-wrap">
                              <div className="ml-4 flex flex-1 flex-col">
                                <div className="mt-4 flex flex-col space-y-4">
                                  <div className="flex flex-col space-y-1">
                                    <div className="text-md ml-1 font-medium">
                                      phone number
                                    </div>
                                    <select
                                      onChange={handleSelectedPhone}
                                      className="w-full form-select form-select-sm mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none md:w-full overflow-y-auto"
                                      aria-label=".form-select-lg example"
                                    >
                                      <option defaultValue>select ...</option>
                                      {phones?.map((phone, index) => (
                                        <option
                                          key={index}
                                          value={phone.phoneNumber}
                                        >
                                          {phone.phoneNumber}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-4 mt-6">
                                  <div>
                                    <div className="text-md ml-1 font-medium">
                                      Start Time
                                    </div>
                                    <input
                                      type="time"
                                      onChange={(e) => handleStartDateUpdate(e)}
                                      className="w-full mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    ></input>
                                  </div>
                                  <div>
                                    <div className="text-md ml-1 font-medium">
                                      End Time
                                    </div>
                                    <input
                                      type="time"
                                      onChange={(e) => handleEndDateUpdate(e)}
                                      className="w-full mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    ></input>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="font-medium text-white hover:text-slate-200 bg-myColor rounded-md mt-2 p-2 disabled:opacity-75 disabled:cursor-not-allowed"
                                  disabled={
                                    !endDateValue || !startDateValue || !phone
                                  }
                                  onClick={fetchFilter}
                                >
                                  search
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
