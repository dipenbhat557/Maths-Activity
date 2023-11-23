import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const GiftDistribution = () => {
  const numStudents = useSelector((state) => state.numStudents);
  const numGifts = useSelector((state) => state.numGifts);
  const exclusions = useSelector((state) => state.exclusions);

  useEffect(() => {
    console.log("Number of students : ", numStudents);
    console.log("Number of gifts : ", numGifts);
    console.log("Exclusions : ", exclusions);
  }, [numStudents, numGifts, exclusions]);

  // Function to calculate rook polynomial for a given board
  const calculateRookPolynomial = (board) => {
    console.log("board while calculating rook : ", board);
    const rows = board?.length;
    const columns = board[0]?.length;
    const rookPolynomial = Array.from({ length: rows + 1 }, () => 0);

    for (let i = 0; i <= rows; i++) {
      rookPolynomial[i] = 1;
      for (let j = 0; j < columns; j++) {
        rookPolynomial[i] *= i - j > 0 ? i - j : 0;
      }
    }

    return rookPolynomial;
  };

  // Function to calculate total ways using inclusion-exclusion
  const calculateTotalWays = () => {
    // If there are no students, return 0
    if (numStudents === 0) {
      return 0;
    }

    let exclusionBoard = Array.from({ length: numGifts }, () =>
      Array(numStudents).fill(false)
    );

    console.log("exclusions from the function : ", exclusions);
    console.log("The excllusion board before calling is : ", exclusionBoard);

    // Mark the forbidden places
    exclusions.forEach((exclusion, studentIndex) => {
      exclusion.forEach((excludedGiftIndex) => {
        if (exclusionBoard[excludedGiftIndex - 1]) {
          exclusionBoard[excludedGiftIndex - 1][studentIndex] = true;
        }
      });
    });
    console.log("The exclusion board is : ", exclusionBoard);
    // Calculate rook polynomial for the exclusion board
    const rookPolynomial = calculateRookPolynomial(exclusionBoard);
    console.log("The rook polynomial is : ", rookPolynomial);

    // Calculate total ways using inclusion-exclusion principle
    let totalWays = 0;

    for (let i = 0; i <= numStudents; i++) {
      totalWays += rookPolynomial[i] * Math.pow(-1, numStudents - i);
    }

    return totalWays;
  };

  // Calculate total ways
  const totalWays = calculateTotalWays();

  return (
    <div>
      <h1>Gift Distribution</h1>
      <p>Total Ways: {totalWays}</p>
    </div>
  );
};

export default GiftDistribution;
