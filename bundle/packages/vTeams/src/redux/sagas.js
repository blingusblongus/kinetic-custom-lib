import { all } from 'redux-saga/effects';

// import { watchSample } from './sagas/sample';
import { watchTickets } from './sagas/tickets';

export default function*() {
  yield all([watchTickets()]);
}
