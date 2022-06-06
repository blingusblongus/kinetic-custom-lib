import { reducer as app } from './modules/app';
//import sampleReducer from './modules/sample';
import { formResponses as values } from './modules/formResponses';
import { tickets } from './modules/tickets';
import { workLogs } from './modules/workLogs';
import { organization } from './modules/organization';
import { settings } from './modules/settings';

export default {
  app,
  values,
  tickets,
  workLogs,
  organization,
  // settings,
};
