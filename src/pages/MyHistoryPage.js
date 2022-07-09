import React, { useEffect, useContext } from "react";

import MyTableHistory from "../components/MyTableHistory";
import { Store } from "../store";
import axios from "axios";
import { toast } from "react-toastify";

function MyHistoryPage() {
  const {
    state: { start3, loading, wesabiUser, myHistories },
    dispatch,
  } = useContext(Store);

  const id = wesabiUser?.id;

  useEffect(() => {
    async function getCustomerRequestData() {
      console.log(id);
      dispatch({ type: "START_FETCHING", payload: true });
      try {
        let startingPoint = start3 > -1 ? start3 : 0;
        const { data } = await axios.post(
          `https://sellbackend.creditclan.com/parent/index.php/globalrequest/getmymerchants/${startingPoint}`,

          { user_id: id }
        );
        console.log(data.data);
        dispatch({ type: "UPDATE_MY_HISTORY", payload: data.data });
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
    getCustomerRequestData();
  }, [id, dispatch, start3]);

  const next_function = async () => {
    dispatch({ type: "INCREASE_START3", payload: start3 + 20 });
  };
  console.log(myHistories.length < 20);
  const pre_function = async () => {
    dispatch({ type: "REDUCE_START3", payload: start3 - 20 });
  };

  return (
    <>
      <main className="overflow-auto mt-5">
        <div className="max-w-7xl mx-auto py-2 sm:px-6 lg:px-8 overflow-auto">
          <div className="px-4 py-2 sm:px-0">
            <MyTableHistory />

            {!loading && myHistories.length > 0 && (
              <div className="flex justify-end  mb-2 pr-5 ">
                <button
                  onClick={pre_function}
                  className="border text-myColor font-bold py-2 px-2 mr-3 disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={start3 <= 0}
                >
                  Previous
                </button>
                <button
                  onClick={next_function}
                  className="border text-myColor font-bold  py-2 px-2  disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={myHistories.length < 20}
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

export default MyHistoryPage;
