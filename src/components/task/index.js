import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import { TaskAction } from '../../actions/task';


const Input = styled.input`
  position: relative;
  font-size: 14px;
  height: auto;
  padding: 7px;
  margin-top: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`;

const DivButtons = styled.div`
  position: relative;
  right: 20px;
  bottom: 0;
  margin: 10px;
  float: right;
`;

class Task extends React.Component {
  state = {
    title: '',
    description: '',
    edit: false,

  }

  onEdit = (e) => {
    e.preventDefault();
    const taskEdit = {
      ...this.props.task,
      title: this.state.title,
      description: this.state.description,
    };
    this.props.editTaskDips(this.props.task.id, taskEdit);
    this.setState({ edit: false });
    this.props.onEditTask(false);
  }


  setEdit = () => {
    const {
      title, description,
    } = this.props.task;
    this.setState({ title, description, edit: true });
    this.props.onEditTask(true);
  }


  cancelEdit = () => {
    this.setState({ edit: false });
    this.props.onEditTask(false);
  }


  render() {
    const {
      status,
      title, description,
      id,
    } = this.props.task;
    const {
      deleteTaskDisp,
    } = this.props;


    const text = `Status: ${status}`;

    return (
      <div className="card border-secondary mb-3" >
        <div className="card-header">
          <Typography variant="title" color="inherit" noWrap>{text}</Typography>
        </div>
        <div className="card-body text-secondary">
          {this.state.edit ? (
            <form className="form-horizontal" onSubmit={this.onEdit}>
              <div className="form-group">
                <label htmlFor="inputTitle">
                  Title
                </label>
                <Input
                  required
                  value={this.state.title}
                  onChange={e =>
                    this.setState({
                      title: e.target.value,
                    })
                  }
                  type="text"
                  className="form-control"
                  id="inputTitle"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputBody">
                Description
                </label>
                <Input
                  required
                  value={this.state.description}
                  onChange={e =>
                    this.setState({
                      description: e.target.value,
                    })
                  }
                  type="text"
                  className="form-control"
                  id="inputBody"
                />
              </div>
              <div className="form-group">
                <DivButtons>
                  <button
                    className="btn btn-secondary"
                    style={{ marginLeft: '20px' }}
                    onClick={this.cancelEdit}
                  >
                    Cancel
                  </button>

                  <button className="btn btn-primary" >
                    Save
                  </button>
                </DivButtons>
              </div>
            </form>
          ) : (
            <div>
              <div>

                <h5 className="card-title">{title}</h5>

                <p className="card-text">{description}</p>


                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-secondary" onClick={this.setEdit}>Edit  <EditIcon /></button>
                  <button type="button" className="btn btn-secondary" onClick={() => deleteTaskDisp(id)}>Delete <DeleteIcon /></button>
                </div>

              </div>

            </div>
            )}

        </div>
      </div>
    );
  }
}

Task.propTypes = {
  deleteTaskDisp: PropTypes.func.isRequired,
  editTaskDips: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

function mapStateToProps({ tasks }) {
  return {
    tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTaskDisp: data => dispatch(TaskAction.deleteTask(data)),
    editTaskDips: (id, data) => dispatch(TaskAction.editTask(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
