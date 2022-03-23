export const formResponses = (state = {}, action) => {
  switch (action.type) {
    case 'FORM_UPDATE':
      return { ...state, [action.payload.name]: action.payload.response };
    default:
      return state;
  }
};
