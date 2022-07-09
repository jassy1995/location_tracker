import React, { useContext } from "react";
import { Store } from "../store";

import DisplayInfo from "./empty";

function MyTableHistory() {
  const {
    state: { myHistories, loading },
  } = useContext(Store);

  return (
    <>
      {loading ? (
        <DisplayInfo children="Loading..." />
      ) : myHistories.length === 0 && !loading ? (
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
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                      >
                        s/n
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-center border  border-slate-300"
                      >
                        store name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-center border  border-slate-300"
                      >
                        phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                      >
                        feedback type
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                      >
                        feedback_comments
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                      >
                        opinion
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-6 py-4 text-center  border border-slate-300"
                      >
                        date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myHistories.map((request, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900 border border-slate-300">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-normal text-sm text-left font-medium text-gray-900 border border-slate-300">
                          {request?.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.phone}
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.feedback_type}
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-normal border border-slate-300">
                          {request?.feedback_comments}
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.opinion}
                        </td>
                        <td className="text-sm text-gray-900 font-light text-center px-6 py-4 whitespace-nowrap border border-slate-300">
                          {request?.feedback_date}
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

export default MyTableHistory;
