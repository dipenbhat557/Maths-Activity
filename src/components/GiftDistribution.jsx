import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GiftDistribution = () => {
  const navigate = useNavigate();
  const numStudents = useSelector((state) => state.numStudents);
  const numGifts = useSelector((state) => state.numGifts);
  const exclusions = useSelector((state) => state.exclusions);
  const giftNames = useSelector((state) => state.giftNames);

  let finalGifts = [];

  const calculateTotalWays = () => {
    if (numStudents === 0) {
      return 0;
    }

    let exclusionBoard = Array.from({ length: numStudents }, () =>
      Array.from({ length: numGifts }, () => false)
    );

    exclusions?.forEach((exclusion, studentIndex) => {
      exclusion?.forEach((giftIndex) => {
        // Make sure to check if giftIndex is within the range of numGifts
        if (giftIndex >= 0 && giftIndex < numGifts) {
          exclusionBoard[studentIndex][giftIndex] = true;
        }
      });
    });

    console.log("Exclusion Board: ", exclusionBoard);

    let validGifts = Array.from({ length: numStudents }, () => []);

    for (let i = 0; i < numStudents; i++) {
      for (let j = 0; j < numGifts; j++) {
        if (!exclusionBoard[i][j]) {
          validGifts[i].push(giftNames[j]);
        }
      }
    }

    console.log("The list of valid gifts : ", validGifts);

    let totalWays = 0;

    const generateCombinations = (currentIndex, currentCombination) => {
      if (currentIndex === numStudents - 1) {
        finalGifts.push([...currentCombination]);
        return;
      }

      console.log("Current index is : ", currentIndex);

      for (const gift of validGifts[currentIndex]) {
        currentCombination.push(gift);
        generateCombinations(currentIndex + 1, currentCombination);
        currentCombination.pop();
      }
    };

    generateCombinations(0, []);

    console.log("All Possible Combinations: ", finalGifts);

    totalWays = finalGifts?.length;

    return totalWays;
  };

  const totalWays = calculateTotalWays();

  return (
    <div>
      <p className="my-10 text-[28px] font-semibold text-slate-800 w-full text-center">
        Gift Distribution
      </p>
      <p className="text-slate-800 font-medium text-[18px] m-4">
        Total Possible Combinations are :
      </p>
      {finalGifts.map((gift, index) => {
        return (
          <li className="m-4" key={index}>
            {gift.map((item, index) => {
              return `${gift[index]} `;
            })}
          </li>
        );
      })}
      <div className="flex w-full justify-center">
        <p className="text-[22px] font-medium text-slate-800 my-3">
          Total No of Ways:{" "}
        </p>
        <p className="font-semibold text-[24px] text-black my-3 ml-3">
          {totalWays}
        </p>
      </div>
      <div className="flex w-full justify-center mt-5">
        <button
          className="bg-slate-700 text-white rounded-md p-2 px-4"
          onClick={() => navigate("/")}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default GiftDistribution;
