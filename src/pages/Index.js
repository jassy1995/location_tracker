import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
          <div className="px-4 pb-2 pt-2 sm:px-0 mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}
export default Index;
