import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import TabNavigator from '../../../navigation/TabNavigator';

import { initSocket } from '../../../redux/ducks/chat/rooms';

class Main extends Component {
  constructor (props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentWillMount() {
    this.props.initSocket();

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress () {
    const { dispatch, nav } = this.props;
    dispatch(NavigationActions.back());
    return nav !== this.props.nav;
  }

  render() {
    return <TabNavigator/>;
  }
}

export default connect(
  (state) => ({ 
    nav: state.nav 
  }),
  {
    initSocket
  }
)(Main);