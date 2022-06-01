
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
  const { title, description, image } = data;
  const f = new FormData();
  f.append("title", title);
  f.append("description", description);
  if (image) {
    f.append("image", image);
  }
  const response = await fetch(`/api/estates/${id}`, {
    method: "PATCH",
    body: f,
  });
  const estateData = await response.json();
  dispatch(addEstate(estateData))
  return { ...estateData}
};

export const createEstate = (address, title, nightlyRate, type_id, description, ownerId) =>
	async (dispatch) => {
		const f = new FormData();
    f.append('address', address);
    f.append('title', title);
    f.append('nightly_rate', nightlyRate);
    f.append('type_id', type_id);
    f.append('description', description);
    f.append('owner_id', ownerId);
    
    const response = await fetch(`/api/estates/new`, {
			method: "POST",
      body: f,

			// headers: { "Content-Type": "application/json" },
			// body: JSON.stringify({
			// 	address,
			// 	title,
			// 	nightly_rate: nightlyRate,
			// 	type_id,
			// 	description,
			// 	owner_id: ownerId
			// }),
		});

		if (response.ok) {
			const estate = await response.json();
			dispatch(addEstate(estate));
			return estate;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
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
