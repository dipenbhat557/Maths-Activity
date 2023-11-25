import React from "react";
import { useSelector } from "react-redux";

const GiftDistribution = () => {
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
      <h1>Gift Distribution</h1>
      <p>Total Possible Combinations are : </p>
      {finalGifts.map((gift, index) => {
        return (
          <li key={index}>
            {gift.map((item, index) => {
              return `${gift[index]} `;
            })}
          </li>
        );
      })}
      <p>Total No of Ways: {totalWays}</p>
    </div>
  );
};

export default GiftDistribution;
