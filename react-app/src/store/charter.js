const ADD_CHARTER = "charters/addCharter";
const REMOVE_CHARTER = "charters/removeCharter";
const LOAD_CHARTERS = "charters/loadCharters";
const UPDATE_CHARTER = "charters/updateCharter";

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

export const addOneCharter = (charter) => async (dispatch) => {
  const {userId, estateId, guestNum, startDate, endDate} = charter
  function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
 }
// console.log(getMonthFromString(), '==================')
  const response = await fetch(`/api/charters`, {
    method: "POST",
    body: charter
  })
  console.log(response, '===========')
  const charterData = await response.json()
  dispatch(addCharter(charterData))
  return {...charterData}
}

export const editCharter = (charter, data) => async (dispatch) => {
  const { id } = charter;
  const { userId, estateId, guestNum, startDate, endDate} = data;

  const response = await fetch(`/api/charters/${id}`, {
    method: "PATCH",
    body: data,
  });
  const charterData = await response.json();
  dispatch(addCharter(charterData))
  return { ...charterData}
};

export const deleteCharter = (charter) => async (dispatch) => {
  const { id } = charter;
  const response = await fetch(`/api/charters/${id}}`, "DELETE");
  if (response.ok) {
    dispatch(removeCharter(charter));
  }
};

export const genCharters = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [chartersResponse] = await Promise.all([
    fetch("/api/charters"),
  ]);
  const [charters] = await Promise.all([
    chartersResponse.json(),
  ]);
  if (chartersResponse.ok) {
    dispatch(loadCharters(charters.charters))
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
}

export default charterReducer;
