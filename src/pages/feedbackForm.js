import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Store } from "../store";
import axios from "axios";
function FeedBackForm() {
  let [isLoading, setIsLoading] = useState(false);
  const [feedbackType, setFeedBackType] = useState("type 1");
  const [feedback, setFeedBack] = useState("");
  let [submitingText, setSubmitingText] = useState("");
  let { id } = useParams();
  let navigate = useNavigate();
  const {
    state: { wesabiUser },
  } = useContext(Store);

  const handleSelectedChange = (event) => {
    setFeedBackType(event.target.value);
  };

  const handleSubmit = (evt) => {
    setIsLoading(true);
    setSubmitingText("Submitting...");
    evt.preventDefault();
    console.log(JSON.parse(wesabiUser)?.id);
    const data = {
      id,
      user_id: JSON.parse(wesabiUser)?.id,
      feedback_type: feedbackType,
      feedback_comments: feedback,
    };
    console.log(data);
    axios
      .post(
        "https://sellbackend.creditclan.com/parent/index.php/globalrequest/provide_feedback",
        data
      )
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setSubmitingText("Submitted");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/unSkill");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full flex justify-center">
            {isLoading ? (
              <h2 className="text-center text-green-500">{submitingText}</h2>
            ) : (
              <h2 className="text-center mb-5">FILL IN THESE FORM </h2>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Feedback Type
            </label>
            <select
              onChange={handleSelectedChange}
              className="appearance-none block  w-full  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="type 1">type 1</option>
              <option value="type 2">type 2</option>
              <option value="type 3">type 3</option>
              <option value="type 4">type 4</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
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
    </>
  );
}

export default FeedBackForm;
