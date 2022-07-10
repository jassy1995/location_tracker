import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Store } from "../store";
import DisplayInfo from "./empty";
import { timeFormatter } from "../util/timeFormatter";

export default function ListModal({ open, setOpen, setClose }) {
  const { state } = useContext(Store);
  const { loading, listPhone } = state;

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
                          list{" "}
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
                                    {loading ? (
                                      <DisplayInfo children="Loading..." />
                                    ) : listPhone.length === 0 && !loading ? (
                                      <DisplayInfo children="Empty." />
                                    ) : (
                                      <div className="overflow-auto">
                                        <table className="min-w-full table-fixed">
                                          <thead className="border-b">
                                            <tr>
                                              <th
                                                scope="col"
                                                className="text-sm font-bold text-blue-500 px-6 py-4 text-center border  border-slate-300"
                                              >
                                                s/n
                                              </th>
                                              <th
                                                scope="col"
                                                className="text-sm font-bold text-blue-500 px-6 py-4 text-center border  border-slate-300"
                                              >
                                                Phone
                                              </th>
                                              <th
                                                scope="col"
                                                className="text-sm font-bold text-blue-500 px-6 py-4 text-center border  border-slate-300"
                                              >
                                                Date
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {listPhone.map((request, index) => (
                                              <tr
                                                key={index}
                                                className="border-b"
                                              >
                                                <td className="px-3 py-2 whitespace-nowrap text-sm  text-gray-900 border border-slate-300 text-center">
                                                  {index + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap border border-slate-300 text-center">
                                                  {request?.phone}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap border border-slate-300 text-center">
                                                  <span className="border-r- border-slate-600 pr-1">
                                                    {
                                                      request?.time_created?.split(
                                                        " "
                                                      )[0]
                                                    }
                                                  </span>{" "}
                                                  <span className="pl-1 font-mono font-bold">
                                                    {request?.time_created &&
                                                      timeFormatter(
                                                        new Date(
                                                          request.time_created
                                                        )
                                                      )}
                                                  </span>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                  </div>
                                </div>
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
