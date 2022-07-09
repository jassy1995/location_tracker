import React, { useState, useEffect, useContext } from "react";

import TableHistory from "../components/TableHistory";
import FilterModal from "../components/filterModal";
import { Store } from "../store";
import axios from "axios";
import { toast } from "react-toastify";
import { FilterIcon } from "@heroicons/react/outline";
import Downloader from "../components/downloader";

function HistoryPage() {
  const {
    state: {
      start2,
      loading,
      wesabiUser,
      filterValue,
      histories,
      fetchHistory,
      filterFeedback,
      filterName,
      filterStartDate,
      filterEndDate,
      count,
      start4,
    },
    dispatch,
  } = useContext(Store);

  const id = wesabiUser?.id;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("first");
    async function getCustomerRequestData() {
      if (filterValue) {
        dispatch({ type: "START_FETCHING", payload: true });
        try {
          let startingPoint = start2 > -1 ? start2 : 0;
          const { data } = await axios.post(
            `https://sellbackend.creditclan.com/parent/index.php/globalrequest/getmerchantscalled/${startingPoint}/${filterValue}`,
            { user_id: id }
          );
          let dpoint = 0;
          const downloads = await axios.post(
            `https://sellbackend.creditclan.com/parent/index.php/globalrequest/getmerchantscalled/${dpoint}/${filterValue}`,
            { user_id: id, download: 1 }
          );
          dispatch({ type: "UPDATE_DOWNLOAD", payload: downloads.data.data });
          dispatch({ type: "UPDATE_HISTORY", payload: data.data });
          dispatch({ type: "SET_COUNT", payload: data.count });
          dispatch({ type: "END_FETCHING", payload: false });
        } catch (error) {
          dispatch({ type: "END_FETCHING", payload: false });
          let msg = error?.message
            ? error.message
            : "no or poor internet connection, try it again";
          toast.error(msg);
          console.log(error);
        }
      }
    }
    getCustomerRequestData();
  }, [id, filterValue, dispatch, start2]);

  useEffect(() => {
    console.log("second");
    async function getMarketers() {
      dispatch({ type: "START_FETCHING", payload: true });
      try {
        const { data } = await axios.get(
          "https://sellbackend.creditclan.com/parent/index.php/globalrequest/telemarketers"
        );
        dispatch({ type: "UPDATE_MARKETER", payload: data.data });
      } catch (error) {
        dispatch({ type: "END_FETCHING", payload: false });
        let msg = error?.message
          ? error.message
          : "no or poor internet connection, try it again";
        toast.error(msg);
        console.log(error);
      }
    }
    getMarketers();
  }, [dispatch]);

  useEffect(() => {
    async function getCustomerRequestData() {
      if (
        (filterName && filterStartDate && filterEndDate) ||
        (filterFeedback && filterName && filterStartDate && filterEndDate)
      ) {
        const filterByFeedback = filterFeedback ? filterFeedback : -1;
        console.log(filterByFeedback);
        dispatch({ type: "START_FETCHING", payload: true });
        try {
          const startingPoint = start4 > -1 ? start4 : 0;
          const { data } = await axios.post(
            `https://sellbackend.creditclan.com/parent/index.php/globalrequest/getmerchantscalled/${startingPoint}/${filterByFeedback}/${filterName}`,
            {
              user_id: id,
              start_date: filterStartDate,
              end_date: filterEndDate,
            }
          );
          let dpoint = 0;
          const downloads = await axios.post(
            `https://sellbackend.creditclan.com/parent/index.php/globalrequest/getmerchantscalled/${dpoint}/${filterByFeedback}/${filterName}`,
            {
              user_id: id,
              start_date: filterStartDate,
              end_date: filterEndDate,
              download: 1,
            }
          );
          console.log(data.data);
          dispatch({ type: "UPDATE_DOWNLOAD", payload: downloads.data.data });
          dispatch({ type: "UPDATE_HISTORY", payload: data.data });
          dispatch({ type: "SET_COUNT", payload: data.count });
          dispatch({ type: "END_FETCHING", payload: false });
        } catch (error) {
          dispatch({ type: "END_FETCHING", payload: false });
          let msg = error?.message
            ? error.message
            : "no or poor internet connection, try it again";
          toast.error(msg);
          console.log(error);
        }
      }
    }

    getCustomerRequestData();
  }, [
    id,
    dispatch,
    start4,
    filterFeedback,
    filterName,
    filterStartDate,
    filterEndDate,
    fetchHistory,
  ]);

  const next_function = async () => {
    if (
      (filterName && filterStartDate && filterEndDate) ||
      (filterFeedback && filterName && filterStartDate && filterEndDate)
    ) {
      dispatch({ type: "INCREASE_START4", payload: start4 + 20 });
    } else {
      dispatch({ type: "INCREASE_START2", payload: start2 + 20 });
    }
  };

  const pre_function = async () => {
    if (
      (filterName && filterStartDate && filterEndDate) ||
      (filterFeedback && filterName && filterStartDate && filterEndDate)
    ) {
      dispatch({ type: "INCREASE_START4", payload: start4 - 20 });
    } else {
      dispatch({ type: "REDUCE_START2", payload: start2 - 20 });
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <main className="overflow-auto mt-5">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 overflow-auto">
          <div className="px-4 py-2 sm:px-0">
            <FilterModal open={open} setOpen={setOpen} setClose={closeModal} />
            <div className="flex justify-between items-center space-x-6 mt-5 cursor:pointer">
              <div className="flex items-center space-x-6">
                <Downloader />
              </div>
              <div className="flex items-center space-x-4">
                <div className="font-mono font-bold text-lg">
                  Total: {count}
                </div>
                <div
                  onClick={() => setOpen(true)}
                  className="flex space-x-2 rounded-lg w-20 cursor:pointer ring-1 bg-transparent border-1 border-gray-600 hover:border-blue-500 hover:bg-gray-200 hover:ring-2 hover:ring-blue-300 p-2"
                >
                  <span className="text-sm font-medium text-slate-400 cursor:pointer">
                    filter
                  </span>
                  <FilterIcon
                    className="h-4 text-blue-500 mt-1  hover:text-blue-700 text-sm cursor:pointer"
                    aria-hidden="true"
                    onClick={() => setOpen(true)}
                  />
                </div>
              </div>
            </div>

            <TableHistory />
            {!loading && histories.length > 0 && (
              <div className="flex justify-end  mb-2 pr-5 ">
                <button
                  onClick={pre_function}
                  className="border text-myColor font-bold py-2 px-2 mr-3 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={start2 <= 0 && start4 <= 0}
                >
                  Previous
                </button>
                <button
                  onClick={next_function}
                  className="border text-myColor font-bold  py-2 px-2  disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={histories.length < 20}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default HistoryPage;
