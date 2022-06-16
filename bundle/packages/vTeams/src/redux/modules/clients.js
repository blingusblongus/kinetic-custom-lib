export const clients = (
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
    case 'SET_CLIENTS':
      return { ...action.payload };
    default:
      return state;
  }
};
