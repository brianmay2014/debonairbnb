const ADD_CRITIQUE = "critiques/addCritique";
const REMOVE_CRITIQUE = "critiques/removeCritique";
const LOAD_CRITIQUES = "critiques/loadCritiques";
const CLEAR_CRITIQUES = "critiques/clearCritiques";

const addCritique = (critique) => {
  return {
    type: ADD_CRITIQUE,
    payload: critique,
  };
};

const removeCritique = (critique) => {
  return {
    type: REMOVE_CRITIQUE,
    payload: critique,
  };
};

const loadCritiques = (critiques) => {
  return {
    type: LOAD_CRITIQUES,
    payload: critiques,
  };
};

export const makeCritique = (critique) => async (dispatch) => {
  const estateId  = critique.estate_id;
  console.log(critique)
  const form = new FormData();
  form.append("estate_id", estateId)
  form.append("user_id", critique.user_id)
  form.append("rating", critique.rating)
  form.append("comment", critique.comment)
  const response = await fetch(
    `/api/estates/${estateId}/critiques`,
    {method: "POST", body: form}
  );
  if (response.ok) {
    const critiqueData = await response.json();
    dispatch(loadCritiques(critiqueData.critiques));
    return { ...critiqueData.critiques };
  }
};

export const deleteCritique = (critique) => async (dispatch) => {
  const {id} = critique;
  const response = await fetch(`/api/critiques/${id}}`, "DELETE");
  if (response.ok) {
    dispatch(removeCritique(critique));
  }
};

export const genCritiques = (estate) => async (dispatch) => {
  // doing it this way in case we want more types of responses here later ...
  const { id } = estate;
  const [critiquesResponse] = await Promise.all([fetch(`/api/estates/${id}/critiques`)]);
  if (critiquesResponse.ok) {
    const [critiques] = await Promise.all([critiquesResponse.json()]);
    console.log(critiques)
    dispatch(loadCritiques(critiques.critiques))
    return critiques.critiques;
  }
};

const critiqueReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CRITIQUE:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_CRITIQUE:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD_CRITIQUES:
      const critiqueData = {};
      for (let critique of action.payload) {
        critiqueData[critique.id] = critique;
      }
      return { ...critiqueData };
    case CLEAR_CRITIQUES:
        return {}
    default:
      return state;
  }
};

export default critiqueReducer;
