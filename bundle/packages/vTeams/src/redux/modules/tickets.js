export const tickets = (state = [], action) => {
  switch (action.type) {
    case 'SET_TICKETS':
      return [...action.payload];
    default:
      return state;
  }
};
