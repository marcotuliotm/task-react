import { TaskAPI } from '../api/TaskAPI';
import { GET_ALL_STATUS_SUCCESS } from './constants';


const getAllStatusSuccess = status => ({
  type: GET_ALL_STATUS_SUCCESS,
  status,
});

export class StatusAction {
  static getAllStatus = () => (dispatch) => {
    TaskAPI.loadStatus().then(({ data }) => {
      dispatch(getAllStatusSuccess(data));
    }).catch(err => err);
  };
}

export default StatusAction;
