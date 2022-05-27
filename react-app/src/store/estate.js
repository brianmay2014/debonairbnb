
const ADD_ESTATE = "estates/addEstate";
const REMOVE_ESTATE = "estates/removeEstate";
const LOAD_ESTATES = "estates/loadEstates";
const UPDATE_ESTATE = "estates/updateEstate";

const addEstate = (estate) => {
  return {
    type: ADD_ESTATE,
    payload: estate,
  };
};

const removeEstate = (estate) => {
  return {
    type: REMOVE_ESTATE,
    payload: estate,
  };
};

const loadEstates = (estates) => {
  return {
    type: LOAD_ESTATES,
    payload: estates,
  };
};

// const updateEstate = (estate) => {
//   return {
//     type: UPDATE_ESTATE,
//     payload: estate,
//   };
// };

export const editEstate = (estate, data) => async (dispatch) => {
  const { id } = estate;
  const { title, description, file } = data;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  if (file) {
    formData.append("image", file);
  }
  const response = await fetch(`/api/estates/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const estateData = await response.json();
  dispatch(addEstate(estateData))
  return { ...estateData}
};

export const deleteEstate = (estate) => async (dispatch) => {
  const { id } = estate;
  const response = await fetch(`/api/estates/${id}}`, "DELETE");
  if (response.ok) {
    dispatch(removeEstate(estate));
  }
};

export const genEstates = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [estatesResponse] = await Promise.all([
    fetch("/api/estates"),
  ]);
  const [estates] = await Promise.all([
    estatesResponse.json(),
  ]);
  console.log(estates);
  if (estatesResponse.ok) {
    dispatch(loadEstates(estates.estates))
    return estates;
  }
};

const estateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ESTATE:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_ESTATE:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD_ESTATES:
      const estateData = {};
      for (let estate of action.payload) {
        estateData[estate.id] = estate;
      }
      return { ...estateData };
    default:
      return state;
  }
}

export default estateReducer;
