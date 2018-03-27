import { combineReducers } from 'redux';
import status from './status';
import tasks from './tasks';


export default combineReducers({
  status,
  tasks,
});
