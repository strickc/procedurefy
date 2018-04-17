import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './components/styles.css';
import MainList from './components/containers/mainList';
import DataEntry from './components/data/dataMenu';
import TopMenu from './components/topMenu';
import { Views } from './state/actions';

const curView = (view) => {
  switch (view) {
    case Views.PROCEDURE:
      return <MainList />;
    case Views.DATA:
      return <DataEntry />;
    default:
      break;
  }
  return null;
};

// eslint-disable-next-line react/prefer-stateless-function
class AppView extends Component {
  render() {
    return (
      <div className="App">
        <TopMenu />
        <Container>{curView(this.props.view)}</Container>
      </div>
    );
  }
}
AppView.propTypes = {
  view: PropTypes.string.isRequired,
};

const App = connect(state => ({
  view: state.view,
}))(AppView);

export default App;
