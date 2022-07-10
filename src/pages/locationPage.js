import React, { useState, useEffect, useContext } from "react";

import LocationTable from "../components/locationTable";
import FilterLocationModal from "../components/filterLocationModal";
import { Store } from "../store";
import axios from "axios";
import { toast } from "react-toastify";
import { FilterIcon } from "@heroicons/react/outline";
import ListModal from "../components/listModal";

function LocationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    state: {
      loading,
      locations,
      phone,
      start_time,
      end_time,
      start_group_location,
      start_filter_location,
    },
    dispatch,
  } = useContext(Store);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    async function fetchRequest() {
      if (!phone && !start_time && !end_time) {
        dispatch({ type: "START_FETCHING", payload: true });
        try {
          const startingPoint =
            start_group_location > -1 ? start_group_location : 0;
          const { data } = await axios.post(
            `https://ccendpoints.herokuapp.com/api/v2/filter`,
            {
              start: startingPoint,
              phone: null,
              start_time: null,
              end_time: null,
            }
          );
          dispatch({ type: "UPDATE_LOCATION", payload: data.result });
          dispatch({ type: "END_FETCHING", payload: false });
          setIsLoading(false);
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
    fetchRequest();
  }, [dispatch, start_group_location, start_time, end_time, phone]);

  useEffect(() => {
    async function getPhones() {
      dispatch({ type: "START_FETCHING", payload: true });
      try {
        const { data } = await axios.get(
          "https://ccendpoints.herokuapp.com/api/v2/phone"
        );
        dispatch({ type: "UPDATE_PHONE", payload: data });
      } catch (error) {
        dispatch({ type: "END_FETCHING", payload: false });
        let msg = error?.message
          ? error.message
          : "no or poor internet connection, try it again";
        toast.error(msg);
        console.log(error);
      }
    }
    getPhones();
  }, [dispatch]);

  useEffect(() => {
    async function getPhones() {
      dispatch({ type: "START_FETCHING", payload: true });
      try {
        const { data } = await axios.get(
          "https://ccendpoints.herokuapp.com/api/v2/last-visited"
        );
        dispatch({ type: "PHONE_LIST", payload: data });
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
    getPhones();
  }, [dispatch]);

  useEffect(() => {
    async function getRequest() {
      if (!!phone && !!start_time && !!end_time) {
        dispatch({ type: "START_FETCHING", payload: true });
        try {
          const startingPoint =
            start_filter_location > -1 ? start_filter_location : 0;
          const { data } = await axios.post(
            `https://ccendpoints.herokuapp.com/api/v2/filter`,
            {
              start: startingPoint,
              phone,
              start_time,
              end_time,
            }
          );
          dispatch({ type: "UPDATE_LOCATION", payload: data.result });
          dispatch({ type: "END_FETCHING", payload: false });
          setIsLoading(false);
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

    getRequest();
  }, [dispatch, phone, start_time, end_time, start_filter_location]);

  const next_function = async () => {
    if (!!phone && !!start_time && !!end_time) {
      dispatch({
        type: "INCREASE_START_FILTER_LOCATION",
        payload: start_filter_location + 10,
      });
    } else {
      dispatch({
        type: "INCREASE_START_GROUP_LOCATION",
        payload: start_group_location + 10,
      });
    }
  };

  const pre_function = async () => {
    if ((!!phone && !!start_time, !!end_time)) {
      dispatch({
        type: "REDUCE_START_FILTER_LOCATION",
        payload: start_filter_location - 10,
      });
    } else {
      dispatch({
        type: "REDUCE_START_GROUP_LOCATION",
        payload: start_group_location - 10,
      });
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closeModal1 = () => {
    setOpen1(false);
  };

  return (
    <>
      <main className="overflow-auto mt-5">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 overflow-auto">
          <div className="px-4 py-2 sm:px-0">
            <FilterLocationModal
              open={open}
              setOpen={setOpen}
              setClose={closeModal}
            />
            <ListModal open={open1} setOpen={setOpen1} setClose={closeModal1} />
            <div className="flex justify-between items-center space-x-6 mt-5 cursor:pointer">
              <div className="flex items-center space-x-6">
                {/* <Downloader /> */}
                <button
                  className="hover:border-b-4 hover:border-blue-500 font-mono font-bold cursor:pointer"
                  onClick={() => setOpen1(true)}
                >
                  Check List
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="font-mono font-bold text-lg">Filter</div>
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

            <LocationTable isLoading={isLoading} />
            {!loading && locations.length > 0 && (
              <div className="flex justify-end  mb-2 pr-5 ">
                <button
                  onClick={pre_function}
                  className="border text-myColor font-bold py-2 px-2 mr-3 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={
                    start_group_location <= 0 && start_filter_location <= 0
                  }
                >
                  Previous
                </button>
                <button
                  onClick={next_function}
                  className="border text-myColor font-bold  py-2 px-2  disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={locations.length < 10}
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

export default LocationPage;
