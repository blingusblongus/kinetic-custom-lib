import { searchSubmissions } from '@kineticdata/react';
import { put, takeLatest } from 'redux-saga/effects';
import { getPaginated } from '../../lib/utils';

function* fetchTickets(action) {
  try {
    let response;
    switch (action.type) {
      case 'FETCH_TICKETS':
        response = yield searchSubmissions(action.payload);
        break;
      case 'FETCH_TICKETS_ALL':
        response = yield getPaginated(action.payload);
        break;
    }
    yield put({ type: 'SET_TICKETS', payload: response.submissions });
  } catch (error) {
    console.error(error);
  }
}

export function* watchTickets() {
  yield takeLatest('FETCH_TICKETS', fetchTickets);
  yield takeLatest('FETCH_TICKETS_ALL', fetchTickets);
}
