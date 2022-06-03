import { all } from 'redux-saga/effects';

// import { watchSample } from './sagas/sample';
import { watchTickets } from './sagas/tickets';
import { watchWorkLogs } from './sagas/workLogs';
import { watchOrganization } from './sagas/organization';
import { watchSettings } from './sagas/settings';

export default function*() {
  yield all([
    watchTickets(),
    watchWorkLogs(),
    watchOrganization(),
    watchSettings(),
  ]);
}
