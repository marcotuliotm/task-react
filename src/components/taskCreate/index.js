import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

class CreateTask extends React.Component {
  state = {
    title: '',
    description: '',
  }
  onSave = (e) => {
    e.preventDefault();

    const taskSave = {
      title: this.state.title,
      description: this.state.description,
      status: this.props.status[1],
    };
    this.props.saveTaskDisp(taskSave);
    this.props.onCancel();
  }


  cancelSave = () => {
    this.props.onCancel();
  }


  render() {
    const {
      title,
      description,
    } = this.state;


    return (
      <div className="card border-secondary mb-3" >
        <div className="card-header">New Task</div>
        <div className="card-body text-secondary">

          <form className="form-horizontal" onSubmit={this.onSave}>
            <div className="form-group">
              <label htmlFor="inputTitle">
                Tittle
              </label>
              <Input
                required
                value={title}
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
                value={description}
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
                  onClick={this.cancelSave}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" >
                  Save
                </button>
              </DivButtons>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateTask.propTypes = {
  onCancel: PropTypes.func.isRequired,
  saveTaskDisp: PropTypes.func.isRequired,
  status: PropTypes.array.isRequired,
};

function mapStateToProps({ status, tasks }) {
  return {
    status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveTaskDisp: data => dispatch(TaskAction.saveTask(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
