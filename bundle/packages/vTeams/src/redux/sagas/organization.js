import { put, takeLatest } from 'redux-saga/effects';
import { searchSubmissions } from '@kineticdata/react';

function* fetchOrganization(action) {
  try {
    let response = yield searchSubmissions(action.payload);
    yield put({
      type: 'SET_ORGANIZATION',
      payload: response.submissions[0].values,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* watchOrganization() {
  yield takeLatest('FETCH_ORGANIZATION', fetchOrganization);
}
