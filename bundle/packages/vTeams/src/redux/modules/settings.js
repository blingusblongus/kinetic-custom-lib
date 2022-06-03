export const settings = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
