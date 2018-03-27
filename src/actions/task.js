import { TaskAPI } from '../api/TaskAPI';
import {
  GET_ALL_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from './constants';


const getAllTasksSuccess = posts => ({
  type: GET_ALL_TASKS_SUCCESS,
  posts,
});


const deleteTaskSuccess = id => ({
  type: DELETE_TASK_SUCCESS,
  id,
});


const editTaskSuccess = post => ({
  type: EDIT_TASK_SUCCESS,
  post,
});


const createTaskSuccess = post => ({
  type: CREATE_TASK_SUCCESS,
  post,
});

export class TaskAction {
  static getAllTasks = () => (dispatch) => {
    TaskAPI.loadTasks().then(({ data }) => {
      dispatch(getAllTasksSuccess(data));
    }).catch(err => err);
  };
  static getAllTasksByCategory = category => (dispatch) => {
    TaskAPI.loadTasksByCategory(category).then(({ data }) => {
      dispatch(getAllTasksSuccess(data));
    }).catch(err => err);
  };
  static deleteTask = id => (dispatch) => {
    TaskAPI.deleteTask(id).then(({ data }) => {
      dispatch(deleteTaskSuccess(id));
    }).catch(err => err);
  };

  static editTask = (id, post) => (dispatch) => {
    TaskAPI.editTask(id, post).then(({ data }) => {
      dispatch(editTaskSuccess(data));
    }).catch(err => err);
  };
  static saveTask = post => (dispatch) => {
    TaskAPI.saveTask(post).then(({ data }) => {
      dispatch(createTaskSuccess(data));
    }).catch(err => err);
  };
}

export default TaskAction;

