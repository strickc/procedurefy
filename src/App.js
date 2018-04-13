import React, { Component } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './components/styles.css';
import MainListContainer from './components/containers/mainList';
import ItemMenu from './components/itemMenu';
import TopMenu from './components/topMenu';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <TopMenu />
        <Segment>
          {/* <Sidebar.Pushable as={Segment}> */}
          <ItemMenu />
          {/* <Sidebar.Pusher> */}
          <Container>
            {/* style={{ height: '100vh', overflowY: 'auto' }} */}
            <MainListContainer />
          </Container>
          {/* </Sidebar.Pusher> */}
          {/* </Sidebar.Pushable> */}
        </Segment>
      </div>
    );
  }
}

export default App;
