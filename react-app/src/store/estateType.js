const LOAD_TYPES = "estateType/loadTypes"

const loadEstateTypes = (types) => {
  return {
    type: LOAD_TYPES,
    payload: types,
  };
};

export const genEstateTypes = () => async (dispatch) => {
  console.log("hello");
  const [estateTypesResponse] = await Promise.all([fetch("/api/estates/types")]);
  const [estateTypes] = await Promise.all([estateTypesResponse.json()]);
  if (estateTypesResponse.ok) {
    dispatch(loadEstateTypes(estateTypes.estate_types));
    return estateTypes
  }
};

const estateTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TYPES:
      const estateTypes = {};
      for (let type of action.payload) {
        estateTypes[type.id] = type;
      }
      return { ...estateTypes };
    default:
      return state;
  }
};

export default estateTypeReducer;
