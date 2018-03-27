import { TaskAPI } from '../api/TaskAPI';
import {
  GET_ALL_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from './constants';


const getAllTasksSuccess = tasks => ({
  type: GET_ALL_TASKS_SUCCESS,
  tasks,
});


const deleteTaskSuccess = id => ({
  type: DELETE_TASK_SUCCESS,
  id,
});


const editTaskSuccess = (task, version) => ({
  type: EDIT_TASK_SUCCESS,
  task,
  version,
});


const createTaskSuccess = (id, task) => ({
  type: CREATE_TASK_SUCCESS,
  task,
  id,
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

  static editTask = (id, task) => (dispatch) => {
    TaskAPI.editTask(id, task).then(({ data }) => {
      dispatch(editTaskSuccess(task, data));
    }).catch(err => err);
  };
  static saveTask = task => (dispatch) => {
    TaskAPI.saveTask(task).then(({ data }) => {
      dispatch(createTaskSuccess(data, task));
    }).catch(err => err);
  };
}

export default TaskAction;

