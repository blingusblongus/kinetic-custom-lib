import { put, takeLatest } from 'redux-saga/effects';
import { getPaginated } from '../../lib/utils';

function* fetchWorkLogs(action) {
  try {
    let response = yield getPaginated(action.payload);
    yield put({ type: 'SET_WORKLOGS', payload: response });
  } catch (error) {
    console.error(error);
  }
}

export function* watchWorkLogs() {
  yield takeLatest('FETCH_WORKLOGS', fetchWorkLogs);
}
