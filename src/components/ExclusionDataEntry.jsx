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
      <p className=" w-full text-center text-slate-800 font-semibold text-[38px] my-10">
        Enter the data of gifts to be excluded :
      </p>
      {Array.from({ length: numStudents }, (_, studentIndex) => (
        <div className="m-5" key={studentIndex}>
          <p className="text-slate-800 text-[18px] font-semibold mb-2">{`Student ${
            studentIndex + 1
          }`}</p>
          {Array.from({ length: numGifts }, (_, giftIndex) => (
            <div key={giftIndex}>
              <input
                className="text-slate-800 mb-2"
                type="checkbox"
                id={`student${studentIndex + 1}_gift${giftIndex + 1}`}
                onChange={(e) =>
                  handleExclusionChange(
                    studentIndex,
                    giftIndex,
                    e.target.checked
                  )
                }
              />
              <label
                className="ml-2"
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

      <div className="w-full justify-center flex items-center">
        <button
          className="text-white font-medium bg-green-300 p-1 px-3 hover:bg-green-500 rounded-md"
          onClick={handleNext}
        >
          Continue &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default ExclusionDataEntry;
