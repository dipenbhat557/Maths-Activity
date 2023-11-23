// actions.js
export const setNumStudents = (numStudents) => ({
  type: "SET_NUM_STUDENTS",
  payload: numStudents,
});

export const setNumGifts = (numGifts) => ({
  type: "SET_NUM_GIFTS",
  payload: numGifts,
});

export const setGiftNames = (giftNames) => ({
  type: "SET_GIFT_NAMES",
  payload: giftNames,
});

export const setExclusions = (exclusions) => ({
  type: "SET_EXCLUSIONS",
  payload: exclusions,
});
