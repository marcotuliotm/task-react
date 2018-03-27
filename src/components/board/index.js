import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Task from '../task';
import TaskCreate from '../taskCreate';
import { TaskAction } from '../../actions/task';


class Board extends React.Component {
state = {
  editStatus: false,
  editTask: false,
}

onEditTask = (editTask) => {
  this.setState({ editTask });
}

onStop = (e, task) => {
  let editStatus = false;
  if (e.layerX <= 450 && task.status === 'COMPLETE') {
    editStatus = true;
    task.status = 'NEW'; // eslint-disable-line
  } else if (e.layerX >= 350 && task.status === 'NEW') {
    editStatus = true;
    task.status = 'COMPLETE'; // eslint-disable-line
  }
  if (editStatus) {
    this.setState({ editStatus });
    this.props.editTaskDips(task.id, task);
  }
}

setPosition = (status) => {
  if (!this.state.editStatus) {
    return null;
  }
  this.setState({ editStatus: false });
  if (status === 'NEW') {
    return { x: 0, y: 0 };
  }
  return { x: 405, y: 0 };
}

setPositionDefault = (status) => {
  if (status === 'NEW') {
    return { x: 0, y: 0 };
  }
  return { x: 405, y: 0 };
}


render() {
  const {
    tasks,
    save,
    onCloseSave,
  } = this.props;


  return (
    <div>
      {save ? (
        <TaskCreate onCancel={() => onCloseSave()} />
      ) : (
        <div>
          <ul className="list-group">
            <li className="list-group-item ">
              <div style={{ width: '100%' }} className="btn-group" role="group">
                <button

                  style={{ width: '50%' }}
                  type="button"
                  className="btn btn-danger"

                >
                  NEW
                </button>
                <button

                  type="button"
                  className="btn btn-success"
                  style={{ width: '50%' }}
                >
                 COMPLETE
                </button>
              </div>
            </li>
          </ul>

          <div
            className="box"
            style={{
            height: '800px', width: '100%', position: 'relative', overflow: 'auto', padding: '0', background: 'linear-gradient(90deg, red 50%, green 50%)',
          }}
          >
            <div style={{ height: '100%', width: '100%', padding: '10px' }}>

              {tasks.map(task => (
                <Draggable
                  allowAnyClick={false}
                  bounds="parent"
                  disabled={this.state.editTask}
                  onStop={e => this.onStop(e, task)}
                  key={task.id}
                  position={this.setPosition(task.status)}
                  defaultPosition={this.setPositionDefault(task.status)}
                >
                  <div
                    style={{
                    width: '320px',
                  }}
                    className="box"
                  >
                    <Task
                      onEditTask={this.onEditTask}
                      task={task}
                    />
                  </div>
                </Draggable>
             ))}

            </div>
          </div>

        </div>
        )}

    </div>
  );
}
}

Board.propTypes = {
  tasks: PropTypes.array,
  save: PropTypes.bool.isRequired,
  onCloseSave: PropTypes.func.isRequired,
  editTaskDips: PropTypes.func.isRequired,
};

Board.defaultProps = {
  tasks: [],
};

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    editTaskDips: (id, data) => dispatch(TaskAction.editTask(id, data)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);
