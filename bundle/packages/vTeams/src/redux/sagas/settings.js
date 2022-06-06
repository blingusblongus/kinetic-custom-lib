import { getPaginated } from '../../lib/utils';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchSettings(action) {
  try {
    console.log('fetching settigns');
    let response = yield getPaginated(action.payload);
    let settings = {
      settings: JSON.parse(response[0].values['Settings']),
      settingsId: response[0].id,
    };
    yield put({ type: 'SET_SETTINGS', payload: settings });
  } catch (error) {
    console.error(error);
  }
}

export function* watchSettings() {
  yield takeLatest('FETCH_SETTINGS', fetchSettings);
}
