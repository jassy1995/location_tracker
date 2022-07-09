import React, { useState, useContext } from "react";
import { Store } from "../store";
import FeedbackModal from "../components/feedbackModal";
import DisplayInfo from "./empty";
import { toast } from "react-toastify";

function TableItem() {
  const {
    state: { requests, loading },
  } = useContext(Store);

  const [requestId, setRequestId] = useState(null);
  const [open, setOpen] = useState(false);

  const giveFeedback = (id, checkFeedback) => {
    console.log(checkFeedback);
    if (checkFeedback?.toString() === "0") {
      setRequestId(id);
      setOpen(true);
    } else return;
  };

  const closeModal = () => {
    setOpen(false);
  };

  const copyLink = (phone) => {
    let link = `https://merchants.creditclan.com/forgot-password?identity=${phone}`;
    const input = document.createElement("input");
    input.value = link;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    toast.success("Link copied to clipboard");
    input.remove();
  };

  return (
    <>
      <FeedbackModal
        open={open}
        setOpen={setOpen}
        setClose={closeModal}
        requestId={requestId}
      />
      {loading ? (
        <DisplayInfo children="Loading..." />
      ) : requests.length === 0 && !loading ? (
        <DisplayInfo children="No Request" />
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-auto">
                <table className="min-w-full table-fixed">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        s/n
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        Store link
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-lef border  border-slate-300"
                      >
                        Reset password link
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left border  border-slate-300"
                      >
                        feedback
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-center  border border-slate-300"
                      >
                        date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900 border border-slate-300">
                          {request?.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.phone}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.store_link}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          <button
                            onClick={() => copyLink(request.phone)}
                            className="bg-yellow-100 px-2 py-1 text-yellow-700 text-sm font-medium rounded-full text-center"
                          >
                            copy link
                          </button>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300 text-center">
                          <button
                            className={
                              request?.feedback_provided?.toString() === "1"
                                ? "bg-green-100 px-2 py-1 text-green-700 text-sm font-medium rounded-lg"
                                : "bg-red-100 px-2 py-1 text-red-700 text-sm font-medium rounded-full"
                            }
                            onClick={() =>
                              giveFeedback(
                                request.id,
                                request.feedback_provided
                              )
                            }
                          >
                            feedback
                          </button>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.created_at}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableItem;
