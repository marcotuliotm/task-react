import axios from 'axios';

const configure = {
  headers: {
    Authorization: 'some-auth-token',
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf8',
  },
};


const URI_API = 'https://springtasktm.herokuapp.com';


export class TaskAPI {
  static loadTasks = () => axios.get(`${URI_API}/tasks`, configure);
  static loadStatus = () => axios.get(`${URI_API}/tasks/status`, configure);
  static deleteTask = id => axios.delete(`${URI_API}/tasks/${id}`, configure);
  static editTask = (id, task) => axios.put(`${URI_API}/tasks/${id}`, task, configure);
  static saveTask = task => axios.post(`${URI_API}/tasks`, task, configure);
}


export default TaskAPI;
