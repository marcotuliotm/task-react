import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from 'material-ui-icons/Menu';
import withRoot from './withRoot';
import { StatusAction } from './actions/status';
import { TaskAction } from './actions/task';
import Board from './components/board';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    'min-width': '680px',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    backgroundImage: 'linear-gradient(175deg,#80bfe8,#5886c1)',
    [theme.breakpoints.up('md')]: {
      color: '#fff',
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    backgroundImage: 'linear-gradient(175deg,#80bfe8,#5886c1)',
    color: '#fff',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 45,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 45,
    },
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    save: false,
  };

  componentWillMount() {
    this.props.fetchStatus();
    this.props.fetchAllTasks();
  }


  onCloseSave= () => {
    this.setState({ save: false });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };


  render() {
    const {
      classes,
    } = this.props;

    const drawer = (
      <div />
    );


    return (
      <div>
        <div className="container">
          <div className={classes.root}>
            <div className={classes.appFrame}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.navIconHide}
                  >
                    <MenuIcon />
                  </IconButton>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.setState({ save: true })}
                  >
                  New Task  <AddIcon />
                  </button>
                </Toolbar>
              </AppBar>

              <Hidden smDown implementation="css">
                <Drawer
                  variant="permanent"
                  open
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <main className={classes.content}>
                <Route
                  exact
                  path="/"
                  render={({ match }) => (
                    <div>
                      <Board onCloseSave={this.onCloseSave} save={this.state.save} />
                    </div>
                  )}
                />


              </main>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchStatus: PropTypes.func.isRequired,
  fetchAllTasks: PropTypes.func.isRequired,
};

function mapStateToProps({ status, tasks }) {
  return {
    status,
    tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStatus: data => dispatch(StatusAction.getAllStatus(data)),
    fetchAllTasks: data => dispatch(TaskAction.getAllTasks(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRoot(withStyles(styles, { withTheme: true })(ResponsiveDrawer)));
