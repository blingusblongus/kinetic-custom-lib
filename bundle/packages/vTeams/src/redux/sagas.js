import { all } from 'redux-saga/effects';

// import { watchSample } from './sagas/sample';
import { watchTickets } from './sagas/tickets';
import { watchWorkLogs } from './sagas/workLogs';

export default function*() {
  yield all([watchTickets(), watchWorkLogs()]);
}
