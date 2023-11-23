// reducer.js
const initialState = {
  numStudents: 0,
  numGifts: 0,
  giftNames: [],
  exclusions: [], // Added exclusions state
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NUM_STUDENTS":
      return { ...state, numStudents: action.payload };
    case "SET_NUM_GIFTS":
      return { ...state, numGifts: action.payload };
    case "SET_GIFT_NAMES":
      return { ...state, giftNames: action.payload };
    case "SET_EXCLUSIONS":
      return { ...state, exclusions: action.payload }; // Handle exclusions
    default:
      return state;
  }
};

export default rootReducer;
