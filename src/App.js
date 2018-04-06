import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './components/styles.css';
import MainListContainer from './components/containers/mainList';


// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <MainListContainer />
        </Container>
      </div>
    );
  }
}

export default App;
