import { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Store } from "../store";

export default function FilterModal({ open, setOpen, setClose }) {
  const { state, dispatch } = useContext(Store);
  const { marketers } = state;
  const [searchFeedback, setSearchFeedback] = useState(null);
  const [startDateValue, setStartDateValue] = useState(null);
  const [endDateValue, setEndDateValue] = useState(null);
  const [marketer, setMarketer] = useState(null);

  const handleStartDateUpdate = (e) => {
    const dateValue = e.target.value;
    setStartDateValue(dateValue);
  };

  const handleEndDateUpdate = (e) => {
    const dateValue = e.target.value;
    setEndDateValue(dateValue);
  };

  const fetchFilter = () => {
    dispatch({ type: "RESET_SINGLE_FILTER" });
    dispatch({ type: "RESET_GROUP_FILTER" });
    dispatch({
      type: "UPDATE_GROUP_FILTER",
      payload: {
        feedback: searchFeedback,
        marketer: marketer,
        startDate: startDateValue,
        endDate: endDateValue,
      },
    });
    setStartDateValue(null);
    setEndDateValue(null);
    setSearchFeedback(null);
    setMarketer(null);
    setClose();
  };

  const handleSelectedChange = (event) => {
    dispatch({ type: "RESET_GROUP_FILTER" });
    dispatch({ type: "UPDATE_SINGLE_FILTER", payload: event.target.value });

    setClose();
  };

  const handleSelectedMarketer = (event) => {
    setMarketer(event.target.value);
  };

  const handleSelectedFeedbackSearch = (event) => {
    setSearchFeedback(event.target.value);
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
                          Filter panel{" "}
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
                            <div className="flex py-6">
                              <div className="ml-4 flex flex-1 flex-col">
                                <h2 className="font-mono font-medium text-slate-700">
                                  filter by feedback only
                                </h2>
                                <div className="mt-3">
                                  <select
                                    onChange={handleSelectedChange}
                                    className="w-full form-select form-select-sm mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    aria-label=".form-select-lg example"
                                  >
                                    <option defaultValue>select...</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="busy">Busy</option>
                                    <option value="call-back">Call-back</option>
                                    <option value="not reachable">
                                      Not reachable
                                    </option>
                                    <option value="wrong number">
                                      Wrong number
                                    </option>
                                    <option value="no answer">No answer</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="border-t divide-y divide-gray-200"></div>
                            <div className="flex py-2 flex-wrap">
                              <div className="ml-4 flex flex-1 flex-col">
                                <h3 className="font-mono font-bold text-slate-700">
                                  filter by :
                                </h3>
                                <div className="mt-4 flex flex-col space-y-4">
                                  <div className="flex flex-col space-y-1">
                                    <div className="text-md ml-1 font-thin">
                                      feedback
                                    </div>
                                    <select
                                      onChange={handleSelectedFeedbackSearch}
                                      className="w-full form-select form-select-sm mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                      aria-label=".form-select-lg example"
                                    >
                                      <option defaultValue>select...</option>
                                      <option value="yes">Yes</option>
                                      <option value="no">No</option>
                                      <option value="busy">Busy</option>
                                      <option value="call-back">
                                        Call-back
                                      </option>
                                      <option value="not reachable">
                                        Not reachable
                                      </option>
                                      <option value="wrong number">
                                        Wrong number
                                      </option>
                                      <option value="no answer">
                                        No answer
                                      </option>
                                    </select>
                                  </div>

                                  <div className="flex flex-col space-y-1">
                                    <div className="text-md ml-1 font-thin">
                                      marketer name
                                    </div>
                                    <select
                                      onChange={handleSelectedMarketer}
                                      className="w-full form-select form-select-sm mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none md:w-full"
                                      aria-label=".form-select-lg example"
                                    >
                                      <option defaultValue>select...</option>
                                      {marketers?.map((mark, index) => (
                                        <option key={index} value={mark.id}>
                                          {mark.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-1 mt-3">
                                  <div>
                                    <div className="text-md ml-1 font-thin">
                                      start date
                                    </div>
                                    <input
                                      type="date"
                                      onChange={(e) => handleStartDateUpdate(e)}
                                      className="w-full mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    ></input>
                                  </div>
                                  <div>
                                    <div className="text-md ml-1 font-thin">
                                      end date
                                    </div>
                                    <input
                                      type="date"
                                      onChange={(e) => handleEndDateUpdate(e)}
                                      className="w-full mb-3 appearance-none block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    ></input>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="font-medium text-white hover:text-slate-200 bg-myColor rounded-md mt-2 p-2 disabled:opacity-75 disabled:cursor-not-allowed"
                                  disabled={
                                    !endDateValue ||
                                    !startDateValue ||
                                    !marketer
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
