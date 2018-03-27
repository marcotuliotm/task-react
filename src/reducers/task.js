import {
  GET_ALL_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from './../actions/constants';


const tasks = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_TASKS_SUCCESS:
      return action.tasks;
    case CREATE_TASK_SUCCESS:
      return [
        ...state,
        action.task,
      ];
    case EDIT_TASK_SUCCESS:
      return state.map(p => task(p, action));
    case DELETE_TASK_SUCCESS:
      return [
        ...state.filter(task => task.id !== action.id),
      ];
    default:
      return state;
  }
};

const task = (state = {}, action) => {
  switch (action.type) {
    case EDIT_TASK_SUCCESS:
      if (state.id !== action.task.id) {
        return state;
      }
      return {
        ...action.task,
      };
    default:
      return state;
  }
};


export default tasks;
