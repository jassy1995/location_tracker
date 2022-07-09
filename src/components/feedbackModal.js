import React, { useState, useContext, Fragment } from "react";
import { Store } from "../store";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import { toast } from "react-toastify";

export default function FeedbackModal({ open, setOpen, setClose, requestId }) {
  let [isLoading, setIsLoading] = useState(false);
  const [feedbackType, setFeedBackType] = useState("yes");
  const [opinion, setOpinion] = useState("yes");
  const [feedback, setFeedBack] = useState("");
  let [submitingText, setSubmitingText] = useState("");

  const {
    state: { requests, wesabiUser },
    dispatch,
  } = useContext(Store);

  const handleSelectedChange = (event) => {
    setFeedBackType(event.target.value);
  };

  const handleSelectedChangeOpinion = (event) => {
    setOpinion(event.target.value);
  };

  const handleSubmit = (evt) => {
    setIsLoading(true);
    setSubmitingText("Submitting...");
    evt.preventDefault();
    const data = {
      id: requestId,
      user_id: wesabiUser?.id,
      feedback_type: feedbackType,
      feedback_comments: feedback,
      opinion: opinion,
    };
    console.log(data);
    axios
      .post(
        "https://sellbackend.creditclan.com/parent/index.php/globalrequest/provide_feedback",
        data
      )
      .then((response) => {
        if (response.data.status) {
          let newRequest = requests.map((r) =>
            +r.id === +requestId
              ? {
                  ...r,
                  feedback_provided: "1",
                }
              : r
          );
          dispatch({ type: "GET_REQUEST", payload: newRequest });
          setSubmitingText("Submitted");
          toast.success("Feedback Submitted Successfully");
          setFeedBackType("");
          setFeedBack("");
          setIsLoading(false);
          setTimeout(() => {
            setClose();
          }, 1000);
        } else {
          toast.error("unable to submit feedback, retry");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        let msg = error?.message ? error.message : "Internal Server Error";
        toast.error(msg);
        console.log(error);
      });
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
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Feedback{" "}
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
                          <form
                            className="w-full max-w-lg"
                            onSubmit={handleSubmit}
                          >
                            <div className="flex flex-wrap -mx-3 mb-5">
                              <div className="w-full flex justify-center">
                                {isLoading ? (
                                  <h2 className="text-center text-green-500 text-2xl font-bold">
                                    {submitingText}
                                  </h2>
                                ) : (
                                  <h2 className="text-center mb-5">
                                    FILL IN THESE FORM{" "}
                                  </h2>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-5">
                              <div className="w-full px-3">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Feedback Type
                                </label>

                                <select
                                  onChange={handleSelectedChange}
                                  className="appearance-none block  w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
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
                            <div className="flex flex-wrap -mx-3 mb-5">
                              <div className="w-full px-3">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Are you interested?
                                </label>

                                <select
                                  onChange={handleSelectedChangeOpinion}
                                  className="appearance-none block  w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                  <option value="not ready">Not ready</option>
                                  <option value="physical meeting">
                                    Physical Meeting
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-5">
                              <div className="w-full px-3">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Feedback
                                </label>
                                <textarea
                                  value={feedback}
                                  onChange={(e) => setFeedBack(e.target.value)}
                                  className="appearance-none block  w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                  id="grid-password"
                                  type="text"
                                  placeholder="write your comment here"
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                              <div className="w-full px-3">
                                <input
                                  type="submit"
                                  value={isLoading ? "submitting.." : "submit"}
                                  className="appearance-none block  w-full  bg-green-500 text-light-700  rounded py-3 px-4 mb-1 font-bold"
                                  style={{ color: "white" }}
                                />
                              </div>
                            </div>
                          </form>
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
