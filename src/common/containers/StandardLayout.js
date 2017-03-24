const React = require('react');
const { AppBar, Layout, NavDrawer, Panel, ProgressBar, Snackbar } = require('react-toolbox');
const theme = require('./StandardLayout.css');
const {getMessage} = require('../utils/MessageUtil');
const {connect} = require('react-redux');
const {AppActions} = require('../actions');

class StandardLayout extends React.Component {

  state = {
    showNav: false
  };

  handleToggle = () => {
    this.setState({showNav: !this.state.showNav});
  };

  render() {
    const {loading, showError, error, handleErrorDismiss, children} = this.props;
    const {showNav} = this.state;

    return (
      <Layout>
        <NavDrawer fixed active={showNav} onOverlayClick={ this.handleToggle }>
        </NavDrawer>
        <Panel>
          <AppBar leftIcon="menu" onLeftIconClick={this.handleToggle}>
            {getMessage('app.title')}
          </AppBar>
          <div className={theme.body}>
            {children}
            { loading && <ProgressBar multicolor mode='indeterminate' type='circular' theme={theme} /> }
          </div>
        </Panel>
        <Snackbar
          active={showError}
          action={getMessage('label.dismiss')}
          label={error && error.message}
          onClick={handleErrorDismiss}
          onTimeout={handleErrorDismiss}
          type='cancel'
        />
      </Layout>
    );
  }
}

function mapStateToProps(state) {
    return {
      ...state.app
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
      handleErrorDismiss() {
          dispatch(AppActions.setFlag({showError: false}));
      }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(StandardLayout);
