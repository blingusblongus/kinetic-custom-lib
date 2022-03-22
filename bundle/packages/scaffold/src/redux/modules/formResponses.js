export const formResponses = (state = {}, action) => {
  switch (action.type) {
    case 'FORM_UPDATE':
      return { ...state, [action.payload.formKey]: action.payload.response };
    default:
      return state;
  }
};
