export const tickets = (
  state = {
    submissions: [],
    messages: [],
    nextPageToken: null,
    count: null,
    countPageToken: null,
  },
  action,
) => {
  switch (action.type) {
    case 'SET_TICKETS':
      return { ...action.payload };
    default:
      return state;
  }
};
