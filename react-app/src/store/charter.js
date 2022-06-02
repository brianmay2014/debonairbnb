import { ValidationError } from "../utils/validationError";

const ADD_CHARTER = "charters/addCharter";
const REMOVE_CHARTER = "charters/removeCharter";
const LOAD_CHARTERS = "charters/loadCharters";
const UPDATE_CHARTER = "charters/updateCharter";
const DELETE_CHARTER = "charters/deleteCharter"

const addCharter = (charter) => {
  return {
    type: ADD_CHARTER,
    payload: charter,
  };
};

const removeCharter = (charter) => {
  return {
    type: REMOVE_CHARTER,
    payload: charter,
  };
};

const loadCharters = (charters) => {
  return {
    type: LOAD_CHARTERS,
    payload: charters,
  };
};

const updateCharter = (charter) => {
  return {
    type: UPDATE_CHARTER,
    payload: charter,
  };
};



export const addOneCharter = (charterTest) => async (dispatch) => {
  const { sessionUserId, estateId, guestNum, startDate, endDate } = charterTest;
  // console.log(charterTest, 'CREATE CHARTER DATA ===============')

  const f = new FormData();

  f.append("user_id", sessionUserId);
  f.append("estate_id", estateId);
  f.append("guest_num", guestNum);
  f.append("start_date", startDate);
  f.append("end_date", endDate);


  try {
    const response = await fetch(`/api/charters/`, {
      method: "POST",
      body: f,
    });


    if (!response.ok) {
      let error;
      if (response.status === 401) {
        error = await response.json()

        throw new ValidationError(error.errors, response.statusText)
      } else {
        let errorJSON;
        error = await response.text();
        try {
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }
    const charterData = await response.json();

    dispatch(addCharter(charterData));
    return { ...charterData };

  } catch (error) {

    throw error;
  }
}

export const editCharter = (data) => async (dispatch) => {

  const { id, userId, estateId, guestNum, startDate, endDate } = data;
// console.log(data, '======================data')

const f = new FormData();

f.append("user_id", userId);
f.append("estate_id", estateId);
f.append("guest_num", guestNum);
f.append("start_date", startDate);
f.append("end_date", endDate);
f.append("charter_id", id)

  const [response] = await Promise.all([fetch(`/api/charters/${id}`, {
    method: "PATCH",
    body: f,
  })]);
  const charterData = await response.json();
  dispatch(addCharter(charterData));
  return { ...charterData };
};

export const deleteCharter = (charter) => async (dispatch) => {
  const { id } = charter;

  const [response] = await Promise.all([fetch(`/api/charters/${id}`, {method: "DELETE"})]);

  console.log(response.ok, 'HEEEEERE')
  if (response.ok) {
    const charterResponse = await response.json();
    dispatch(removeCharter(charterResponse))
  }
};

export const genCharters = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [chartersResponse] = await Promise.all([fetch("/api/charters/")]);
  const [charters] = await Promise.all([chartersResponse.json()]);

  if (chartersResponse.ok) {
    dispatch(loadCharters(charters.charters));
    return charters;
  }
};

const charterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHARTER:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_CHARTER:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD_CHARTERS:
      const charterData = {};
      for (let charter of action.payload) {
        charterData[charter.id] = charter;
      }
      return { ...charterData };
    default:
      return state;
  }
};

export default charterReducer;
