
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

export const editEstate = (estate, image) => async (dispatch) => {
  // console.log(estate, image);
  const { id, address, title, nightly_rate, type_id, description, owner_id } = estate;
  // console.log(estate['owner_id']);
  const f = new FormData();
  f.append("title", title);
  f.append("description", description);
  f.append("address", address);
  f.append("nightly_rate", nightly_rate);
  f.append("type_id", type_id);
  f.append("owner_id", owner_id);
  if (image) {
    // console.log(image);
    f.append("image", image);
  }
  const response = await fetch(`/api/users/${estate.owner_id}/estates/${id}`, {
    method: "PATCH",
    body: f,
  });
  const estateData = await response.json();
  // console.log('*-/*-/*/-*/-*/-*/-*/--*/*-/*-/*-//*-*-/*-/*-/*-/');
  // console.log(estateData)
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


    const response = await fetch(`/api/users/${ownerId}/estates`, {
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

    const estateData = await response.json();
		// console.log(estateData);
		if (response.ok) {
			dispatch(addEstate(estateData));
			return estateData;
		} else {
			return estateData;
		}
		// if (response.ok) {
		// 	const estate = await response.json();
		// 	dispatch(addEstate(estate));
		// 	return estate;
		// } else if (response.status < 500) {
		// 	const data = await response.json();
		// 	if (data.errors) {
		// 		return data.errors;
		// 	}
		// } else {
		// 	return ["An error occurred. Please try again."];
		// }
	};

export const deleteEstate = (estate) => async (dispatch) => {
  const { id } = estate;
  // console.log('inside the thunk');
  // console.log('estateowner', estate.owner_id);
  // console.log("estateid", estate.id);
  const response = await fetch(`/api/users/${estate.owner_id}/estates/${estate.id}/`, {
    method: "DELETE",
    body: JSON.stringify({ estate_id: estate.id })
  });
  if (response.ok) {
    dispatch(removeEstate(estate));
  }
};

export const deleteEstateImage = (estateImage) => async (dispatch) => {
  const { id, estate_id } = estateImage;
  // console.log(id, estate_id);
  // console.log(`/api/estates/${estate_id}/images/${id}`);
  const response = await fetch(`/api/estates/${estate_id}/images/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const estates = await response.json();
    dispatch(genEstates());
  }
};

export const genEstates = () => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const [estatesResponse] = await Promise.all([
    fetch("/api/estates/"),
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
