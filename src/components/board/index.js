import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddIcon from 'material-ui-icons/Add';
import DateIcon from 'material-ui-icons/Update';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
// import Task from '../task';
import TaskCreate from '../taskCreate';


class Board extends React.Component {
state = {
  save: false,
}


render() {
  const {
    tasks,
  } = this.props;
  let tasksIn = [];
  // if (category !== null) {
  //   tasksIn = tasks.filter(pos => pos.category === category);
  // } else {
  tasksIn = tasks;
  // }
  return (
    <div>
      {this.state.save ? (
        <TaskCreate onCancel={() => this.setState({ save: false })} />
      ) : (
        <div>
          <ul className="list-group">
            <li className="list-group-item active">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.setState({ save: true })}
                >
                  New Task  <AddIcon />
                </button>


              </div>
            </li>

          </ul>

          {/* {tasksIn.map(task => (
            <div key={task.id}>
              <Task
                task={task}
              />
            </div>
        ))} */}
        </div>
        )}

    </div>
  );
}
}

Board.propTypes = {
  // category: PropTypes.string,
  tasks: PropTypes.array,
  // getSortByDateAscDisp: PropTypes.func.isRequired,
  // getSortByVoteAscDisp: PropTypes.func.isRequired,
  // getSortByDateDescDisp: PropTypes.func.isRequired,
  // getSortByVoteDescDisp: PropTypes.func.isRequired,
};

Board.defaultProps = {
  tasks: [],
  // category: null,
};

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    // getSortByDateAscDisp: data => dispatch(SortAction.getSortByDateAsc(data)),
    // getSortByVoteAscDisp: data => dispatch(SortAction.getSortByVoteAsc(data)),
    // getSortByDateDescDisp: data => dispatch(SortAction.getSortByDateDesc(data)),
    // getSortByVoteDescDisp: data => dispatch(SortAction.getSortByVoteDesc(data)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);
