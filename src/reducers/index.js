import { combineReducers } from 'redux';
import status from './status';
import tasks from './task';


export default combineReducers({
  status,
  tasks,
});
