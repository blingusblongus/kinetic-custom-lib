import { all } from 'redux-saga/effects';

// import { watchSample } from './sagas/sample';
import { watchTickets } from './sagas/tickets';
import { watchWorkLogs } from './sagas/workLogs';
import { watchOrganization } from './sagas/organization';
import { watchSettings } from './sagas/settings';
import { watchClients } from './sagas/clients';

export default function*() {
  yield all([
    watchTickets(),
    watchWorkLogs(),
    watchOrganization(),
    watchClients(),
    // watchSettings(),
  ]);
}
