import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setExclusions } from "../actions"; // Import the action if needed

const ExclusionDataEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const numStudents = useSelector((state) => state.numStudents);
  const giftNames = useSelector((state) => state.giftNames);
  const numGifts = useSelector((state) => state.numGifts);
  const [exclusions, setExclusionsLocal] = useState(
    Array.from({ length: numStudents }, () => [])
  );

  const handleExclusionChange = (studentIndex, gift, isChecked) => {
    const updatedExclusions = [...exclusions];
    const studentExclusions = updatedExclusions[studentIndex] || [];
    // console.log("The gift is ", gift);
    if (isChecked) {
      studentExclusions.push(gift);
    } else {
      const indexToRemove = studentExclusions.indexOf(gift);
      if (indexToRemove !== -1) {
        studentExclusions.splice(indexToRemove, 1);
      }
    }
    updatedExclusions[studentIndex] = studentExclusions;
    setExclusionsLocal(updatedExclusions);
  };

  const handleNext = () => {
    // Save exclusions to Redux state or perform other actions
    dispatch(setExclusions(exclusions)); // Dispatch an action if needed
    navigate("/gift"); // Use navigate for navigation
  };

  return (
    <div>
      <h1>Exclusion Data Entry</h1>
      {Array.from({ length: numStudents }, (_, studentIndex) => (
        <div key={studentIndex}>
          <h3>{`Student ${studentIndex + 1}`}</h3>
          {Array.from({ length: numGifts }, (_, giftIndex) => (
            <div key={giftIndex}>
              <input
                type="checkbox"
                id={`student${studentIndex + 1}_gift${giftIndex + 1}`}
                onChange={(e) =>
                  handleExclusionChange(
                    studentIndex,
                    giftNames[giftIndex],
                    e.target.checked
                  )
                }
              />
              <label
                htmlFor={`student${studentIndex + 1}_gift${giftIndex + 1}`}
              >
                {`Exclude Gift ${giftNames[giftIndex]} for Student ${
                  studentIndex + 1
                }`}
              </label>
            </div>
          ))}
        </div>
      ))}

      <br />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ExclusionDataEntry;
