import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabNavigator from '../../../navigation/TabNavigator';

import { initSocket } from '../../../redux/ducks/chat/rooms';

class Main extends Component {
  componentWillMount() {
    this.props.initSocket();
  }

  render() {
    return <TabNavigator/>;
  }
}

export default connect(
  null,
  {
    initSocket
  }
)(Main);