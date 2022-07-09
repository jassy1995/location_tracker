import React, { useContext } from "react";
import { CSVLink } from "react-csv";
import { Store } from "../store";

const fileName = "marketer-report";

const Downloader = () => {
  const {
    state: { downloads },
  } = useContext(Store);

  const headers = [
    { label: "s/n", key: "id" },
    { label: "store", key: "name" },
    { label: "Phone", key: "phone" },
    { label: "marketer name", key: "telemarketername" },
    { label: "feedback type", key: "feedback_type" },
    { label: "feedback comments", key: "feedback_comments" },
    { label: "opinion", key: "opinion" },
    { label: "date", key: "feedback_date" },
  ];

  return (
    <div className="container">
      <button
        className="font-bold text-white bg-myColor py-1 px-2 rounded-full  font-mono disabled:opacity-75 disabled:cursor-not-allowed"
        disabled={!downloads?.length}
      >
        <CSVLink
          headers={headers}
          data={downloads}
          filename={fileName}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          Download
        </CSVLink>
      </button>
    </div>
  );
};

export default Downloader;
