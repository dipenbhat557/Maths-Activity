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
    <div>
      <h1>Home Page</h1>
      <div>
        <label>Number of Students:</label>
        <input
          type="number"
          value={numStudents}
          onChange={(e) => setNumStudentsLocal(e.target.value)}
        />
      </div>
      <div>
        <label>Number of Gifts:</label>
        <input
          type="number"
          value={numGifts}
          onChange={(e) => setNumGiftsLocal(e.target.value)}
        />
      </div>
      <button onClick={() => setEnterNames(true)}>Set Names </button>
      <br />
      <br />

      {enterNames && (
        <div>
          <label>Gift Names:</label>
          {Array.from({ length: numGifts }, (_, index) => (
            <div key={index}>
              <br />
              <input
                type="text"
                value={giftNames[index] || ""}
                onChange={(e) => {
                  const updatedGiftNames = [...giftNames];
                  updatedGiftNames[index] = e.target.value;
                  setGiftNamesLocal(updatedGiftNames);
                }}
              />
              <br />
            </div>
          ))}
        </div>
      )}

      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default HomePage;
