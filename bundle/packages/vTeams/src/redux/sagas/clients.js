import { searchSubmissions } from '@kineticdata/react';
import { put, takeLatest } from 'redux-saga/effects';
import { getPaginated } from '../../lib/utils';

function* fetchClients(action) {
  try {
    let response = yield searchSubmissions(action.payload);
    let payload = response;
    yield put({ type: 'SET_CLIENTS', payload });
  } catch (error) {
    console.error(error);
  }
}

export function* watchClients() {
  yield takeLatest('FETCH_CLIENTS', fetchClients);
}
