// HomePage.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNumStudents, setNumGifts, setGiftNames } from "../actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numStudents, setNumStudentsLocal] = useState(0);
  const [numGifts, setNumGiftsLocal] = useState(0);
  const [enterNames, setEnterNames] = useState(false);
  const [giftNames, setGiftNamesLocal] = useState([]);

  const handleNext = () => {
    dispatch(setNumStudents(numStudents));
    dispatch(setNumGifts(numGifts));
    dispatch(setGiftNames(giftNames));
    navigate("/exclusion");
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="w-full text-center text-slate-600 font-semibold text-[38px] my-10">
        Welcome to Our Tool Based Activity (Gift Distribution)
      </p>
      <p className="w-full text-center text-slate-600 font-semibold text-[28px] ">
        Please enter the data below to continue :
      </p>
      <div className="w-full  font-medium flex m-4">
        <label className="text-slate-800">Number of Students:</label>
        <input
          className="border-2 border-black rounded-md text-center ml-3"
          type="number"
          value={numStudents}
          onChange={(e) => setNumStudentsLocal(e.target.value)}
        />
      </div>
      <div className="w-full font-medium text-slate-800 flex m-4">
        <label>Number of Gifts:</label>
        <input
          className="border-2 border-black rounded-md text-center ml-3"
          type="number"
          value={numGifts}
          onChange={(e) => setNumGiftsLocal(e.target.value)}
        />
      </div>
      <button
        className="bg-slate-500 p-1 w-[30%] m-4 text-white rounded-md hover:bg-slate-300"
        onClick={() => setEnterNames(true)}
      >
        Set Names of Gifts
      </button>

      {enterNames && (
        <div>
          <label className="ml-4 font-semibold text-slate-800 text-[18px]">
            Gift Names:
          </label>
          {Array.from({ length: numGifts }, (_, index) => (
            <div
              className="gap-3 w-full flex items-center flex-col "
              key={index}
            >
              <input
                className="border-2 w-[35%] text-center p-1 border-slate-800 m-3 rounded-md"
                type="text"
                value={giftNames[index] || ""}
                onChange={(e) => {
                  const updatedGiftNames = [...giftNames];
                  updatedGiftNames[index] = e.target.value;
                  setGiftNamesLocal(updatedGiftNames);
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center items-center w-full mb-5">
        <button
          className="bg-green-400 hover:bg-green-500 p-1 w-[15%] rounded-md text-white "
          onClick={handleNext}
        >
          Continue &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default HomePage;
