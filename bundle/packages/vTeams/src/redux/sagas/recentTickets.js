import { searchSubmissions } from '@kineticdata/react';

// maybe not necessary?
function* fetchRecentTickets(action) {
  try {
    let response = yield getPaginated(action.payload);

    yield put({ type: 'SET_RECENT_TICKETS' });
  } catch (error) {
    console.error(error);
  }
}

export function* watchRecentTickets() {
  yield takeLatest('FETCH_RECENT_TICKETS', fetchRecentTickets);
}
