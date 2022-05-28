const ADD_RESULTS = "searchResults/addResults";
const LOAD_RESULTS = "searchResults/getResults"

const addResults = (results) => {
  return {
    type: ADD_RESULTS,
    payload: results,
  };
};

// const loadResults = (results) => {
//   return {
//     type: LOAD_RESULTS,
//     payload: results,
//   }
// }

export const createResults = (data) => async (dispatch) => {
  dispatch(addResults(data));
};

// export const loadAllResults = (data) => async (dispatch) => {
//   dispatch(loadResults(data))
// }

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RESULTS:
      return {
        ...action.payload
      }
    case LOAD_RESULTS:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};

export default searchReducer;
