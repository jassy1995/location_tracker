import React, { useContext } from "react";
import { Store } from "../store";

import DisplayInfo from "./empty";

function LocationTable() {
  const {
    state: { locations, loading },
  } = useContext(Store);
  console.log(locations);

  const showOnMap = (latlng) => {
    const lat = latlng?.split(",")[0];
    const long = latlng?.split(",")[1];
    const map = `https://www.google.com/maps/search/${lat},+${long}`;
    const link = document.createElement("a");
    link.href = map;
    link.target = "blank";
    link.click();
  };

  return (
    <>
      {loading ? (
        <DisplayInfo children="Loading..." />
      ) : locations.length === 0 && !loading ? (
        <DisplayInfo children="No Data found" />
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
                        className="text-sm font-medium text-blue-500 px-2 py-2 border  border-slate-300 text-center"
                      >
                        s/n
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-2 py-2 text-center border  border-slate-300"
                      >
                        phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-2 py-2 text-center border  border-slate-300"
                      >
                        count
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-2 py-2 text-center border  border-slate-300"
                      >
                        longitude
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-2 py-2 text-center border  border-slate-300"
                      >
                        latitude
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-2 py-2 text-center border  border-slate-300"
                      >
                        show on map
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-blue-500 px-2 py-2 text-center border  border-slate-300"
                      >
                        time created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((request, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300 text-center">
                          {index + 1}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-3 py-3 whitespace-nowrap border border-slate-300 text-center">
                          {request?.phone ? request.phone : "-"}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-3 py-3 whitespace-nowrap border border-slate-300 text-center">
                          {request?.count ? request.count : "-"}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-3 whitespace-nowrap border border-slate-300 text-center">
                          {request?.latlng
                            ? request.latlng?.split(",")[1]
                            : "-"}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-3 whitespace-normal border border-slate-300 text-center">
                          {request?.latlng
                            ? request.latlng?.split(",")[0]
                            : "-"}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-3 whitespace-normal border border-slate-300 text-center">
                          {request?.latlng ? (
                            <button
                              className="bg-green-100 px-2 py-1 text-green-700 text-sm font-medium rounded-full"
                              onClick={() => showOnMap(request.latlng)}
                            >
                              show on map
                            </button>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-3 whitespace-nowrap border border-slate-300 text-center">
                          {request?.time_created}
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

export default LocationTable;
