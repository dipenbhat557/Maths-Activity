import React from "react";
import { useSelector } from "react-redux";

const GiftDistribution = () => {
  const numStudents = useSelector((state) => state.numStudents);
  const numGifts = useSelector((state) => state.numGifts);
  const exclusions = useSelector((state) => state.exclusions);

  const calculateRookPolynomial = (board) => {
    const rows = board.length;
    const columns = board[0].length;
    const rookPolynomial = Array.from({ length: rows + 1 }, () => 0);

    for (let subset = 0; subset < 1 << rows; subset++) {
      let rowCount = 0;
      let validSubset = true;

      for (let i = 0; i < rows; i++) {
        if (subset & (1 << i)) {
          rowCount++;
        }
      }

      for (let j = 0; j < columns; j++) {
        let hasRook = false;
        for (let i = 0; i < rows; i++) {
          if (subset & (1 << i) && board[i][j]) {
            hasRook = true;
            break;
          }
        }

        if (
          hasRook ||
          board.some((row, rowIndex) => subset & (1 << rowIndex) && row[j])
        ) {
          validSubset = false;
          break;
        }
      }

      if (validSubset) {
        rookPolynomial[rowCount] += rowCount % 2 === 0 ? 1 : -1;
      }
    }

    return rookPolynomial;
  };

  const calculateTotalWays = () => {
    if (numStudents === 0) {
      return 0;
    }

    let exclusionBoard = Array.from({ length: numGifts }, () =>
      Array.from({ length: numStudents }, () => false)
    );

    exclusions.forEach((exclusion, studentIndex) => {
      exclusion.forEach((giftIndex) => {
        // Make sure to check if giftIndex is within the range of numGifts
        if (giftIndex >= 0 && giftIndex < numGifts) {
          exclusionBoard[giftIndex][studentIndex] = true;
        }
      });
    });

    console.log("Exclusion Board: ", exclusionBoard);

    const rookPolynomial = calculateRookPolynomial(exclusionBoard);

    console.log("Rook Polynomial: ", rookPolynomial);

    let totalWays = 0;
    for (let i = 0; i <= numStudents; i++) {
      totalWays += rookPolynomial[i] * Math.pow(-1, numStudents - i);
    }

    return totalWays;
  };

  const totalWays = calculateTotalWays();

  return (
    <div>
      <h1>Gift Distribution</h1>
      <p>Total Ways: {totalWays}</p>
    </div>
  );
};

export default GiftDistribution;
