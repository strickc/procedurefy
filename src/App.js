import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './components/styles.css';
import MainListContainer from './components/containers/mainList';
import ItemMenu from './components/itemMenu';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Sidebar.Pushable as={Segment}> */}
        <ItemMenu />
        {/* <Sidebar.Pusher> */}
        <Container>
          {/* style={{ height: '100vh', overflowY: 'auto' }} */}
          <MainListContainer />
        </Container>
        {/* </Sidebar.Pusher> */}
        {/* </Sidebar.Pushable> */}
      </div>
    );
  }
}

export default App;
