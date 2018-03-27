import { GET_ALL_STATUS_SUCCESS } from '../actions/constants';

const status = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_STATUS_SUCCESS:
      return action.status;
    default:
      return state;
  }
};

export default status;
