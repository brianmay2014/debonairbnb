const ADD_RESULTS = "searchResults/addResults";

const addResults = (results) => {
  return {
    type: ADD_RESULTS,
    payload: results,
  };
};

// const loadAllResults = () => {
//   return {
//     type: LOAD_RESULTS

//   }
// }

export const createResults = (data) => async (dispatch) => {
  dispatch(addResults(data));
};

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RESULTS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
