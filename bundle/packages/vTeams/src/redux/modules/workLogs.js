export const workLogs = (state = [], action) => {
  switch (action.type) {
    case 'SET_WORKLOGS':
      return [...action.payload];
    default:
      return state;
  }
};
